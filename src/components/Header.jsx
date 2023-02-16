import React from 'react';
import { useAuthState } from "../atoms/auth";
import { useNavigate, Link } from "react-router-dom";
import { DownloadOutlined, QuestionCircleFilled, BellFilled } from "@ant-design/icons"
import { Layout, Menu, Row, Col, Space, theme, Button } from "antd";
import {
  RiTruckLine,
  RiDownloadCloud2Line,
  RiCalendarCheckLine,
  RiExchangeDollarLine,
  RiStoreFill,
  RiAccountPinCircleFill
} from "react-icons/ri";
import { MyMenu } from "../components/Dropdown"
import apiClient from "../services/api";

const  { Header } = Layout;

function getItem(label, key, icon) {
  return {
    label,
    key,
    icon
  }
}
const gnbItems = [
  getItem(<Link to="/example">풀필먼트</Link>, 'gnb:1', <RiTruckLine size={16} />),
  getItem(<Link to="/example">개별연동</Link>, 'gnb:2', <RiDownloadCloud2Line size={16} />),
  getItem(<Link to="/example">행사신청</Link>, 'gnb:3', <RiCalendarCheckLine />),
  getItem(<Link to="/example">빠른정산</Link>, 'gnb:4', <RiExchangeDollarLine />),
  getItem(<Link to="/example">도매픽</Link>, 'gnb:5', <RiStoreFill />),
];

const HeaderComponent = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();
  const [authState, setAuthState] = useAuthState();

  const logoutHandler = () => {
    // apiClient.post('/logout').then(response => {
    //   if (response.status === 204) {
    //     setAuthState({ loggedIn: false, m_id: "", password: "" });
    //     sessionStorage.setItem('auth', false);
    //     navigate('/login');
    //   }
    // })
    localStorage.removeItem('auth');
    setAuthState({ loggedIn: false, m_id: "", password: "" });
    navigate('/login');
    console.log(authState);
  };

  // useEffect(() => {
  //   if(!authState.loggedIn) {
  //     navigate('/login')
  //   }
  //   console.log('LOGGEDIN', authState.loggedIn)
  // }, [authState.loggedIn])

  // const activeStyle = ({isActive}) => (isActive ? "activated" : "");

  return (
    <Header className="header" style={{ paddingInline: '0', background: colorBgContainer, }}>
      <Row align="middle">
        <Col flex="auto">
          <Menu theme="light" mode="horizontal" defaultSelectedKeys={['']} items={gnbItems} />
        </Col>
        <Col align="right" flex="40%">
            <Space size="small" align="center" style={{ paddingInlineEnd: '16px' }}>
              <Button icon={<DownloadOutlined size="18" />}>상품 가져오기</Button>
              <Button icon={<DownloadOutlined size="18" />} />
              <Button icon={<QuestionCircleFilled />} />
              <Button icon={<BellFilled />} />
              <MyMenu logoutHandler={logoutHandler}>
                <Button
                  shape="circle"
                  icon={
                    <RiAccountPinCircleFill size="32" style={{ verticalAlign: 'middle', marginTop: '-4px' }} />}
                  style={{ padding: '0 0', border: 0, boxShadow: 'none' }}
                />
              </MyMenu>
            </Space>
        </Col>
      </Row>
    </Header>
  );
};

export default HeaderComponent;
