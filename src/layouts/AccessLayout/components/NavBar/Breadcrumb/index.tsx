import React, { memo } from 'react';
import { Link, useRouteMatch, matchPath } from 'umi';
import classnames from 'classnames';
import { compile } from 'path-to-regexp';
import { Breadcrumb } from 'antd';
import TotalIcons from '../../TotalIcons';
import { urlReg } from '@/utils/validators';
import { LayoutState } from '@/interfaces/layouts';
import styles from './index.less';

interface BreadcrumbContent {
  icon?: string;
  name?: string;
}

const BreadcrumbContent: React.FC<BreadcrumbContent> = ({ icon, name }) => {
  return (
    <>
      {icon && <TotalIcons style={{ marginRight: 5 }} name={icon} />}
      {name}
    </>
  );
};

export interface BreadCrumbsProps {
  breadcrumbs: LayoutState['breadcrumbs'];
  pathname: string;
}

const Breadcrumbs: React.FC<BreadCrumbsProps> = ({ breadcrumbs, pathname }) => {
  const len = breadcrumbs.length;
  const last = len ? breadcrumbs[breadcrumbs.length - 1] : null;
  const match = last ? useRouteMatch([last.displayPath, pathname]) : null;

  return (
    <Breadcrumb className={styles.breadcrumbs}>
      {breadcrumbs.map((breadcrumb, index) => {
        let breadcrumbPath =
          breadcrumb.breadcrumbPath || breadcrumb.displayPath;
        // 判断是否能够进行参数补全
        if (match && breadcrumbPath && Object.keys(match.params).length !== 0) {
          breadcrumbPath = compile(breadcrumbPath)(match.params);
        }
        const breadcrumbName = breadcrumb.breadcrumbName || breadcrumb.name;

        const isMathPath = matchPath(pathname, {
          path: breadcrumbPath,
          exact: true,
        });

        const isExternalPath = urlReg.test(breadcrumbPath);

        const itemClassName = classnames(styles.breadcrumbItem, {
          [styles.notAllowed]: breadcrumbPath === pathname,
          [styles.active]: index === len - 1,
        });

        const renderItem = () => {
          // 外链
          if (isExternalPath) {
            return (
              <a href={breadcrumbPath} target="_blank" rel="noopener">
                <BreadcrumbContent
                  icon={breadcrumb.icon}
                  name={breadcrumbName}
                />
              </a>
            );
          }

          // 当前路由
          if (isMathPath || index === len - 1) {
            return (
              <span>
                <BreadcrumbContent
                  icon={breadcrumb.icon}
                  name={breadcrumbName}
                />
              </span>
            );
          }

          // 可跳转路由
          return (
            <Link replace to={breadcrumbPath}>
              <BreadcrumbContent icon={breadcrumb.icon} name={breadcrumbName} />
            </Link>
          );
        };

        return breadcrumb.hideInBreadcrumb || !breadcrumbName ? null : (
          <Breadcrumb.Item key={breadcrumbPath}>
            <span className={itemClassName}>{renderItem()}</span>
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default memo(Breadcrumbs);
