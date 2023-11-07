import { Outlet } from "react-router-dom";
import Container from "./Container";
import Navbar from "./Navbar";

const Layout = () => {
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
