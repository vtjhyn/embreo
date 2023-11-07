import React from "react";
import { ConfigProvider } from "antd";


const AntConfig = ({children}: {children : React.ReactNode}) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: "#435585",
          },
          Table: {
            headerBg: '#435585',
            rowHoverBg: '#dae0f0',
          },
          Tabs: {
            cardPaddingLG: '0 0 0 0',
          }
        },
        token: {
          colorPrimaryHover: "#363062",
          colorPrimaryActive: "#363062",
          colorError: "#7d0000",
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default AntConfig;
