import React, { memo } from 'react';
import { Link, useSelector, useLocation, useRouteMatch } from 'umi';
import classnames from 'classnames';
import styles from './index.less';
import { Breadcrumb } from 'antd';
import { MenuItem } from '@/interfaces/app';
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
        let displayPath = breadcrumb.displayPath;
        if (match && Object.keys(match.params).length !== 0 && displayPath) {
          displayPath = compile(displayPath)(match.params);
        }
        const breadcrumbName = breadcrumb.breadcrumbName || breadcrumb.name;
        const classname = classnames(styles.breadcrumbItem, {
          [styles.notAllowed]: displayPath === pathname,
          [styles.active]: index === breadCrumbs.length - 1,
        });
        return (
          <Breadcrumb.Item key={displayPath}>
            <span className={classname}>
              {index !== breadCrumbs.length - 1 && displayPath !== pathname ? (
                urlReg.test(displayPath) ? (
                  <a href={displayPath} target="_blank" rel="noopener">
                    {breadcrumbName}
                  </a>
                ) : (
                  <Link replace to={displayPath}>
                    {breadcrumbName}
                  </Link>
                )
              ) : (
                <span>{breadcrumbName}</span>
              )}
            </span>
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default memo(BreadCrumbs);
