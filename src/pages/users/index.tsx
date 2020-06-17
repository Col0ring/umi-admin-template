/*
 * @Author: Col0ring
 * @Date: 2020-06-08 17:15:59
 * @LastEditTime: 2020-06-11 16:40:32
 * @LastEditors: Col0ring
 * @FilePath: /src/pages/users/index.tsx
 */

import React, { useState } from 'react';
import { Table, Space, Popconfirm, Button } from 'antd';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { connect, ConnectRC, Loading, UserState } from 'umi';
import UserModal from './componenrts/UserModal';
import { SingleUserType } from './interface';
interface PageProps {
  users: UserState;
  listLoading: boolean;
}

const UserListPage: ConnectRC<PageProps> = ({
  users,
  dispatch,
  listLoading,
}) => {
  const [userModalVisible, setUserModalVisible] = useState(false);
  const [record, setRecord] = useState<SingleUserType | null>(null);
  const columns: ProColumns<SingleUserType>[] = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Create_Time',
      dataIndex: 'create_time',
      key: 'create_time',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => {
        return (
          <Space size="middle">
            <a onClick={() => onEdit(record)}> Edit</a>
            <Popconfirm
              title="Are you sure delete this task?"
              onConfirm={() => onConfirm(record)}
              okText="Yes"
              cancelText="No"
            >
              <a href="#">Delete</a>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  const handleAddRecord = () => {
    setUserModalVisible(true);
    setRecord(null);
  };
  const handleModalCancel = () => {
    setUserModalVisible(false);
  };

  const onEdit = (record: SingleUserType) => {
    setUserModalVisible(true);
    setRecord(record);
  };
  const onFinish = async (values: any) => {
    if (record) {
      const id = record.id;
      await dispatch!({
        type: 'users/edit',
        payload: {
          id,
          values,
        },
      });
    } else {
      await dispatch!({
        type: 'users/add',
        payload: {
          values,
        },
      });
    }
    setUserModalVisible(false);
  };
  const onConfirm = (record: SingleUserType) => {
    const id = record.id;
    dispatch!({
      type: 'users/del',
      payload: {
        id,
      },
    });
  };

  return (
    <>
      <Button type="primary" onClick={handleAddRecord}>
        Add
      </Button>
      <ProTable
        search={false}
        pagination={false}
        columns={columns}
        dataSource={users.data}
        rowKey="id"
        loading={listLoading}
      />
      <UserModal
        visible={userModalVisible}
        onCancel={handleModalCancel}
        data={record}
        onFinish={onFinish}
      />
    </>
  );
};

const mapStateToProps = ({
  users,
  loading,
}: PageProps & { loading: Loading }) => {
  return {
    users,
    listLoading: loading.effects['users/getRemote']!,
  };
};

export default connect(mapStateToProps)(UserListPage);
