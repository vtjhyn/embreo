import { Avatar, Dropdown } from "antd";
import { UserOutlined } from "@ant-design/icons";
import NavbarMenu from "./NavbarMenu";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="fixed w-full flex justify-between items-center h-[50px] text-white bg-[#363062]">
      <div className="px-12 cursor-pointer" onClick={() => navigate("/")}>
        HOME
      </div>
      <div className="px-12">
        <Dropdown overlay={NavbarMenu}>
          <Avatar size={34} icon={<UserOutlined />} />
        </Dropdown>
      </div>
    </div>
  );
};

export default Navbar;
