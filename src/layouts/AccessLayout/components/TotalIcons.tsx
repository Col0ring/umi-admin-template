import React from 'react';
import * as AllIcons from '@ant-design/icons';
import { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon';

export interface TotalIconsProps extends AntdIconProps {
  name: string;
}

const TotalIcons: React.FC<TotalIconsProps> = ({
  className,
  name,
  ...rest
}) => {
  return name
    ? React.createElement((AllIcons as AnyObject)[name], {
        ...rest,
      })
    : null;
};

export default TotalIcons;
