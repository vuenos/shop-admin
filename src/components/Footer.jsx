import React from 'react';
import { Layout } from "antd";

const { Footer } = Layout;

const FooterComponent = () => {
  return (
    <Footer
      style={{
        textAlign: 'center',
      }}
    >
      Copyright&copy; Sellerhub
    </Footer>
  );
};

export default FooterComponent;
