import { useEffect } from "react";
import { Tabs, TabsProps } from "antd";
import LoginForm, { FieldType } from "../components/form/LoginForm";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../utils/hook";
import { loginUser } from "../store/slice/authSlice";
import { sessionGet } from "../utils/session";
import { useNavigate } from "react-router-dom";

const items: TabsProps["items"] = [
  {
    key: "HR",
    label: "Company HR",
    children: "Login as Company HR",
  },
  {
    key: "Vendor",
    label: "Vendor",
    children: "Login as Vendor",
  },
];

const Login = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.auth.isLoading);
  const navigate = useNavigate();
  const [mode, setMode] = useState("HR");

  useEffect(() => {
    if (sessionGet("token")) {
      navigate("/");
    }
  }, [sessionGet("token")]);

  if (sessionGet("token")) {
    return null;
  }

  const handleLogin = async (data: FieldType) => {
    data.type = mode;
    const { meta } = await dispatch(loginUser(data));
    if (meta.requestStatus === "fulfilled") {
      console.log("Login berhasil");
      navigate("/", {
        replace: true,
      });
    } else {
      console.log("<<< login failed");
    }
  };

  const onChange = (key: string) => {
    setMode(key);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-[#435585] ">
      <div className="bg-white/30 px-4 pt-6 shadow-md shadow-white/30 bg-blend-normal rounded-3xl flex flex-col gap-4">
        <div>
          <Tabs
            defaultActiveKey="HR"
            type="card"
            items={items}
            onChange={onChange}
            centered
            size="large"
            className="flex items-center text-lg font-bold"
          />
        </div>
        <LoginForm onFinish={handleLogin} isLoading={loading} />
      </div>
    </div>
  );
};

export default Login;
