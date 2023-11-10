import { Input, Button, Form } from "antd";

export interface FieldType {
  username: string;
  password: string;
  type?: string;
}

interface LoginFormProps {
  onFinish: (data: FieldType) => void;
  isLoading: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onFinish, isLoading }) => {
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item className="flex justify-center">
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          loading={isLoading}
          className="border border-white shadow shadow-white"
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
