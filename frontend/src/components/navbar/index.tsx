import { Avatar, Dropdown } from "antd";
import { UserOutlined } from "@ant-design/icons";
import NavbarMenu from "./NavbarMenu";

const Navbar = () => {
  return (
    <div className="fixed w-full flex justify-end items-center h-[50px] text-white bg-[#363062]">
      <div className="px-12">
        <Dropdown overlay={NavbarMenu}>
          <Avatar size={34} icon={<UserOutlined />} />
        </Dropdown>
      </div>
    </div>
  );
};

export default Navbar;
