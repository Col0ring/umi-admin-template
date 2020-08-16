import React, { memo } from 'react';
import { Link, useLocation, useRouteMatch, matchPath } from 'umi';
import * as Icons from '@ant-design/icons';
import classnames from 'classnames';
import { compile } from 'path-to-regexp';
import { Breadcrumb, Space } from 'antd';
import { urlReg } from '@/utils/validators';
import useLayout from '@/hooks/useLayout';
import styles from './index.less';
const breadcrumbs: React.FC = () => {
  const { pathname } = useLocation();
  const { breadcrumbs } = useLayout();
  const match = useRouteMatch([
    breadcrumbs[breadcrumbs.length - 1]?.displayPath,
    pathname,
  ]);

  return (
    <Breadcrumb className={styles.breadcrumbs}>
      {breadcrumbs.map((breadcrumb, index) => {
        let displayPath = breadcrumb.breadcrumbPath || breadcrumb.displayPath;
        if (match && Object.keys(match.params).length !== 0 && displayPath) {
          displayPath = compile(displayPath)(match.params);
        }
        const breadcrumbName = breadcrumb.breadcrumbName || breadcrumb.name;
        const classname = classnames(styles.breadcrumbItem, {
          [styles.notAllowed]: displayPath === pathname,
          [styles.active]: index === breadcrumbs.length - 1,
        });
        const Icon =
          typeof breadcrumb.icon === 'string'
            ? React.createElement((Icons as AnyObject)[breadcrumb.icon])
            : null;
        return breadcrumb.hideInBreadcrumb || !breadcrumbName ? null : (
          <Breadcrumb.Item key={displayPath}>
            <span className={classname}>
              {index !== breadcrumbs.length - 1 &&
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

export default memo(breadcrumbs);
