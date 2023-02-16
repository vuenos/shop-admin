import React, { useState } from 'react';
import AuthForm from "../components/AuthForm";
import { useAuthState } from "../atoms/auth";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/api";
import { Row, Col, Typography, message, Alert } from "antd";

function Login() {
  const navigate = useNavigate();
  const [authState, setAuthState] = useAuthState();
  const [errorAlert, setErrorAlert] = useState("");
  const [spin, setSpin] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [showError, setShowError] = useState(false);

  const errorMsg = () => {
    messageApi.open({
      type: 'error',
      content: '로그인에 실패하였습니다.',
      className: 'custom-class',
    });
  };

  const loginSubmit = async (form) => {
    setSpin(true);

    await apiClient.get(`/sanctum/csrf-cookie`);

    try {
      const { data, status } = await apiClient.post(`/shapi/v1/login`, JSON.stringify(form));
      console.log(data);
      if (status === 200) {
        setAuthState({ loggedIn: true, ...data });
        localStorage.setItem("auth", true);
        // sessionStorage.setItem("Authorization", JSON.stringify(data));
        navigate("/dashboard");
      }
    } catch (error) {
      setSpin(false);
      if (error.response && error.response.status === 422) {
        setShowError(true);
        setErrorAlert("계정정보 확인");
        errorMsg();
        console.log(error.message);
      }
      else {
        setShowError(true);
        setErrorAlert("일시적인 오류로 로그인을 할 수 없습니다. 잠시 후 다시 시도해 주십시오");
        errorMsg();
        console.error(error);
      }
    }

  };

  return (
     <Row className="Login" justify="space-around" align="middle" style={{ height: '100vh' }}>
      <Col span={8}>
        {authState.loggedIn
          ?
          <div>This page is Login page, You are logged in</div>
          :
          <>
            <Typography align="center" style={{ marginBottom: '40px' }}><img src={`${process.env.PUBLIC_URL}/assets/images/sh-logo-b@3x.png`} width="200" alt="Sellerhub" /></Typography>
            <AuthForm submit={loginSubmit} spin={spin} label="LOG IN" />
            {contextHolder}
            {showError ?
              <Alert
                message="Error"
                description={errorAlert}
                type="error"
                showIcon
                closable
              />
              : null
            }
          </>
        }
      </Col>
    </Row>
  );
}

export default Login;