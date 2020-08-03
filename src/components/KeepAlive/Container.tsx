import React from 'react';
import {
  KeepAlive,
  IRouteComponentProps,
  withActivation,
  withAliveScope,
  AliveController,
} from 'umi';

interface State {
  mounted: boolean;
}
type Props = IRouteComponentProps & AliveController;

class Container extends React.Component<Props, State> {
  state = {
    mounted: false,
  };
  constructor(props: Props) {
    super(props);
    const {
      getCachingNodes,
      location: { pathname, search },
    } = this.props;
    const hasCache = getCachingNodes().find(
      item => item.name === pathname + search,
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

    return (
      <KeepAlive
        saveScrollPosition="screen"
        {...(route as any).keepAlive}
        id={pathname + search}
        name={pathname + search}
      >
        {this.state.mounted ? children : <></>}
      </KeepAlive>
    );
  }
}

export default withAliveScope(withActivation(Container));
