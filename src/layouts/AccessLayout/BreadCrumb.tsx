import React, { memo, useEffect } from 'react';
import { Link, useSelector, useLocation, useRouteMatch } from 'umi';
import { Breadcrumb } from 'antd';
import { MenuItem } from '@/interfaces/app';
import { compile } from 'path-to-regexp';
const BreadCrumbs: React.FC = () => {
  const { pathname } = useLocation();
  const { breadCrumbs }: { breadCrumbs: MenuItem[] } = useSelector(state => ({
    breadCrumbs: state.app.breadCrumbs,
  }));
  const match = useRouteMatch([
    breadCrumbs[breadCrumbs.length - 1]?.path,
    pathname,
  ]);

  return (
    <Breadcrumb>
      {breadCrumbs.map((breadcrumb, index) => {
        let displayPath = breadcrumb.path;
        if (match && Object.keys(match.params).length !== 0 && displayPath) {
          displayPath = compile(displayPath)(match.params);
        }
        return (
          <Breadcrumb.Item key={index}>
            {index !== breadCrumbs.length - 1 ? (
              <Link to={displayPath}> {breadcrumb.name}</Link>
            ) : (
              <span>{breadcrumb.name}</span>
            )}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default memo(BreadCrumbs);
