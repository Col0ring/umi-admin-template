import React, { FC, useEffect } from 'react';
import { Modal, Form, Input } from 'antd';
import { SingleUserType } from '../interface';
interface UserModalProps {
  visible?: boolean;
  onCancel?: () => void;
  onFinish?: (values: any) => void;
  data?: SingleUserType | null;
}
const UserModal: FC<UserModalProps> = ({
  visible,
  onCancel,
  data,
  onFinish,
}) => {
  const [form] = Form.useForm();
  useEffect(() => {
    if (visible) {
      form.setFieldsValue(data!);
    } else {
      form.resetFields();
    }
  }, [form, data, visible]);

  const onSubmit = () => {
    form.submit();
  };

  return (
    <Modal
      forceRender
      title="UserModal"
      onCancel={onCancel}
      visible={visible}
      onOk={onSubmit}
    >
      <Form onFinish={onFinish} form={form} name="basic">
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>
        <Form.Item label="Create Time" name="create_time">
          <Input />
        </Form.Item>
        <Form.Item label="Status" name="status">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

UserModal.defaultProps = {
  visible: false,
};

export default UserModal;
