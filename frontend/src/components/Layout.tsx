import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Container from "./Container";
import Navbar from "./Navbar";
import { sessionGet } from "../utils/session";

const Layout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!sessionGet('token')) {
      navigate("/login", {
        replace: true,
      });
    }
  }, [sessionGet('token')]);
  return (
    <div>
      <Navbar />
      <Container>
        <div className="mt-[84px]">
          <Outlet />
        </div>
      </Container>
    </div>
  );
};

export default Layout;
