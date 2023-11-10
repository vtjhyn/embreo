import React from "react";
import { ConfigProvider } from "antd";

const AntConfig = ({ children }: { children: React.ReactNode }) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: "#818FB4",
          },
          Table: {
            headerBg: "#435585",
            headerColor: "#ffff",
            rowHoverBg: "#dae0f0",
          },
        },
        token: {
          colorPrimaryHover: "#435585",
          colorPrimaryActive: "#435585",
          colorError: "#7d0000",
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default AntConfig;
