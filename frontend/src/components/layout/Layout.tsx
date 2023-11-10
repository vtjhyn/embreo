import { Suspense, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Container from "./Container";
import Navbar from "../navbar";
import { sessionGet } from "../../utils/session";
import { Spin } from "antd";

const Layout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!sessionGet("token")) {
      navigate("/login", {
        replace: true,
      });
    }
  }, [sessionGet("token")]);
  return (
    <div className="relative bg-slate-200">
      <Navbar />
      <Container>
        <Suspense fallback={<Spin />}>
          <Outlet />
        </Suspense>
      </Container>
    </div>
  );
};

export default Layout;
