import React, { memo } from 'react';
import { Link, useSelector, useLocation, useRouteMatch, matchPath } from 'umi';
import * as Icons from '@ant-design/icons';
import classnames from 'classnames';
import styles from './index.less';
import { Breadcrumb, Space } from 'antd';
import { compile } from 'path-to-regexp';
import { urlReg } from '@/utils/validators';
const BreadCrumbs: React.FC = () => {
  const { pathname } = useLocation();
  const { breadCrumbs } = useSelector(state => ({
    breadCrumbs: state.app.breadCrumbs,
  }));
  const match = useRouteMatch([
    breadCrumbs[breadCrumbs.length - 1]?.displayPath,
    pathname,
  ]);

  return (
    <Breadcrumb className={styles.breadcrumbs}>
      {breadCrumbs.map((breadcrumb, index) => {
        let displayPath = breadcrumb.breadcrumbPath || breadcrumb.displayPath;
        if (match && Object.keys(match.params).length !== 0 && displayPath) {
          displayPath = compile(displayPath)(match.params);
        }
        const breadcrumbName = breadcrumb.breadcrumbName || breadcrumb.name;
        const classname = classnames(styles.breadcrumbItem, {
          [styles.notAllowed]: displayPath === pathname,
          [styles.active]: index === breadCrumbs.length - 1,
        });
        const Icon =
          typeof breadcrumb.icon === 'string'
            ? React.createElement((Icons as AnyObject)[breadcrumb.icon])
            : null;
        return breadcrumb.hideInBreadcrumb || !breadcrumbName ? null : (
          <Breadcrumb.Item key={displayPath}>
            <span className={classname}>
              {index !== breadCrumbs.length - 1 &&
              !matchPath(pathname, { path: displayPath, exact: true }) ? (
                urlReg.test(displayPath) ? (
                  <a href={displayPath} target="_blank" rel="noopener">
                    <Space>
                      {Icon}
                      {breadcrumbName}
                    </Space>
                  </a>
                ) : (
                  <Link replace to={displayPath}>
                    <Space>
                      {Icon}
                      {breadcrumbName}
                    </Space>
                  </Link>
                )
              ) : (
                <span>
                  <Space>
                    {Icon}
                    {breadcrumbName}
                  </Space>
                </span>
              )}
            </span>
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default memo(BreadCrumbs);
