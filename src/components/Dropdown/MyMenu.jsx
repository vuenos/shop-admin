import React, { useEffect } from 'react';
import { Button, Dropdown, Space, theme } from "antd";
import PropTypes from "prop-types";
import { useAuthState } from "../../atoms/auth";
import { useUsersState } from "../../atoms/users";
import { usersAtom } from "../../atoms/users";
import { useUserActions } from "../../api/userApi";
import { useRecoilValue } from "recoil";

const { useToken } = theme;

const MyMenu = ({children, logoutHandler}) => {
  MyMenu.propTypes = {
    children: PropTypes.any,
    logoutHandler: PropTypes.func
  }

  const userInfo = useRecoilValue(usersAtom);
  const [authState, setAuthState] = useAuthState();
  const [userState, setUserState] = useUsersState();
  const userActions = useUserActions();

  const items = [
    {
      key: '1',
      label: (
        <p>{userState && userState.m_id}</p>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          2nd menu item
        </a>
      ),
      disabled: false,
    },
    {
      key: '3',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
          3rd menu item (disabled)
        </a>
      ),
      disabled: true,
    },
  ];

  const setUserInfo = async () => {
    try {
      const userInfo = await userActions.getUserInfo();
      setAuthState({loggedIn: true});
      setUserState(userInfo);
      console.log('USERINFO::', userInfo);
      console.log('MY_AUTH_STATE', authState.loggedIn)
    } catch (error) {
      // TODO: get user info error
    }
  }

  const { token } = useToken();
  const contentStyle = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };
  const menuStyle = {
    boxShadow: 'none',
  };

  useEffect(() => {
    setUserInfo();
  }, []);


  return (
    <Dropdown
      menu={{
        items,
      }}
      trigger={['click']}
      dropdownRender={(menu) => (
        <div style={contentStyle}>
          {React.cloneElement(menu, {
            style: menuStyle,
          })}
          <Space
            style={{
              padding: 8,
            }}
          >
            <Button danger onClick={logoutHandler}>Log out</Button>
          </Space>
        </div>
      )}
    >
      {children}
    </Dropdown>
  )
}
export default MyMenu;