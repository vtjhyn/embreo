import React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-full h-screen">{children}</div>;
};

export default Container;
