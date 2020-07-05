import React from 'react';
import { Divider } from 'antd';

interface IProps {
  title: string;
  className?: string;
}

const LoginHeader: React.FC<IProps> = ({ title, className }) => {
  return <Divider className={className}>{title}</Divider>;
};

export default LoginHeader;
