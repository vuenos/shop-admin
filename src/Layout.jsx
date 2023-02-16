import React, { useState, useEffect } from 'react';
import { Outlet } from "react-router-dom";
import { Aside, FooterComponent, HeaderComponent } from "./components";
import {Layout, theme} from "antd";
import BreadcrumbComponent from "./components/Breadcrumb";

const { Content } = Layout;

const LayoutProvider = () => {
  const [layoutMargin, setLayoutMargin] = useState(220);
  const changeLayoutMargin = (value) => {
    return (value !== layoutMargin) ? setLayoutMargin(value) : setLayoutMargin(220);
  }
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    setLayoutMargin(220);
  }, []);


  return (
    <Layout hasSider style={{ minHeight: '100vh' }}>
      <Aside changeLayoutMargin={changeLayoutMargin} />

      <Layout className="site-layout" style={{ marginLeft: layoutMargin }}>
        <HeaderComponent />
        <BreadcrumbComponent />
        <Content
          style={{
            margin: '0 16px',
            overflow: 'initial',
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <div
            style={{
              padding: 16,
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <FooterComponent />
      </Layout>
    </Layout>
  );
};

export default LayoutProvider;
