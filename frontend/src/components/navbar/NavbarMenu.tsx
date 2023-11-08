import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { sessionGet } from "../../utils/session";

const NavbarMenu = () => {
  const user = sessionGet("user");

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = "/login";
    console.log("tes");
  };
  return (
    <div className="flex relative items-center justify-center w-full">
      <div className="rounded-xl overflow-hidden relative text-center py-4 px-8 group items-center flex flex-col hover:shadow-2xl transition-all duration-500 shadow-xl">
        <Avatar size={45} icon={<UserOutlined />} />
        <div className="group-hover:pb-10 transition-all duration-500 delay-200">
          <h3 className="font-semibold text-black">
            {user?.company ? user?.company : user?.name}
          </h3>
          <p className="text-gray-700 text-sm -mt-3">@{user?.role}</p>
        </div>
        <div className="transition-all duration-500 delay-100 group-hover:bottom-0 -bottom-full absolute w-full bg-[#363062]">
          <p
            className="font-bold cursor-pointer text-white"
            onClick={handleLogout}
          >
            Logout
          </p>
        </div>
      </div>
    </div>
  );
};

export default NavbarMenu;
