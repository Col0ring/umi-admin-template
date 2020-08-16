import React from 'react';
import {
  KeepAlive,
  IRouteComponentProps,
  withActivation,
  withAliveScope,
  AliveController,
} from 'umi';

const initialState = {
  mounted: false,
};
type State = Readonly<typeof initialState>;
type Props = IRouteComponentProps & AliveController;

class KeepAliveWrapper extends React.Component<Props, State> {
  state = initialState;
  constructor(props: Props) {
    super(props);
    const { getCachingNodes, route } = this.props;
    const displayPath = route.externalPath || route.redirect || route.path;
    const hasCache = getCachingNodes().find(
      item =>
        item.name === (route.keepAlive && route.keepAlive.name) ||
        item.name === displayPath,
    );
    if (hasCache) {
      this.state = {
        mounted: true,
      };
    }
  }

  componentDidMount() {
    this.setState({
      mounted: true,
    });
  }

  render() {
    const { children, route, location } = this.props;
    const { pathname, search } = location;
    const keepAliveProps = route.keepAlive;
    const displayPath = route.externalPath || route.redirect || route.path;
    return (
      <KeepAlive
        saveScrollPosition="screen"
        name={displayPath}
        {...keepAliveProps}
        id={keepAliveProps && keepAliveProps.id ? pathname + search : undefined}
      >
        {this.state.mounted ? children : <></>}
      </KeepAlive>
    );
  }
}

export default withAliveScope(withActivation(KeepAliveWrapper));
