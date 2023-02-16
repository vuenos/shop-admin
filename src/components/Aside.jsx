import React, { useState, useEffect } from 'react';
import { asideItems } from "./MenuItems";
import { Layout, Menu, theme, Typography } from "antd";
import { useLocation, Link } from "react-router-dom"
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from "@ant-design/icons";
import PropTypes from "prop-types";
import { useAuthState } from "../atoms/auth";

const { Sider } = Layout;
const { Title, Paragraph } = Typography;

const rootSubmenuKeys = ['settings:0', 'goods:0', 'order:0'];

const Aside = ({ changeLayoutMargin }) => {
  Aside.propTypes = {
    changeLayoutMargin: PropTypes.any,
  }

  let isLocation = useLocation();

  const [authState, setAuthState] = useAuthState();

  const [openKeys, setOpenKeys] = useState(['']);
  const [defaultKeys, setDefaultKeys] = useState(['']);
  const onOpenChange = (keys) => {
    const latestOpenKeys = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKeys) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKeys ? [latestOpenKeys] : [])
    }
  }

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const getOpenKeys = () => {
    switch (isLocation.pathname) {
      case '/dashboard':
        setOpenKeys(['dashboard']);
        setDefaultKeys(['dashboard']);
        break;
      // 기본관리
      case '/settings/plan':
        setDefaultKeys(['settings:1:0']);
        break;
      case '/settings/staff':
        setDefaultKeys(['settings:1:1']);
        break;
      // 상품
      case '/goods/list':
        setDefaultKeys(['goods:1:0']);
        break;
      case '/goods/approve':
        setDefaultKeys(['goods:1:1']);
        break;
      // 주문
      case '/order/list':
        setDefaultKeys(['order:1:0']);
        break;
      default:
        break;
    }
  }

  function getKey() {
    return ((isLocation.pathname).includes('/settings')) ? setOpenKeys(['settings:0'])
      : ((isLocation.pathname).includes('/goods')) ? setOpenKeys(['goods:0'])
      : ((isLocation.pathname).includes('/order')) ? setOpenKeys(['order:0'])
      : null;
  }

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem("auth"));
    if (data){
      setAuthState({loggedIn: true, ...data})
    }
  }, []);

  useEffect(() => {
    getKey();
    getOpenKeys();
    console.log('%c OPENKEYS_PATH', 'color: yellow', isLocation.pathname);
  }, [isLocation.pathname]);

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={220}
      style={{
        overflow: 'auto',
        height: '100vh',
        borderRight: '1px solid rgba(5,5,5,.06)',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        background: colorBgContainer
      }}
    >
      <Typography style={{ textAlign: 'center', paddingTop: 16 }}>
        <Title>
          <Link to="/">
            <img src={`${process.env.PUBLIC_URL}/assets/images/sh-logo-b@3x.png`} width="120" alt="Sellerhub" />
          </Link>
        </Title>
        <Paragraph>
          셀러어드민
        </Paragraph>
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: 'trigger',
          onClick: () => {
            setCollapsed(!collapsed);
            changeLayoutMargin(80);
          },
        })}
      </Typography>

      <Menu
        theme="light"
        mode="inline"
        selectedKeys={defaultKeys}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        items={asideItems}
        style={{ fontSize: '13px', borderRight: 0 }}
      />
    </Sider>
  )
}
export default Aside;