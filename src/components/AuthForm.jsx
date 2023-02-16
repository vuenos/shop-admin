import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { Button, Form, Input, Spin } from "antd";
import { LockOutlined, UserOutlined, LoadingOutlined } from '@ant-design/icons';
import PropTypes from "prop-types";

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);

const AuthForm = ({ submit, label, spin, disabled }) => {
  AuthForm.propTypes = {
    submit: PropTypes.func,
    label: PropTypes.string,
    spin: PropTypes.bool,
    disabled: PropTypes.bool
  }
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});

  const [forms, setForms] = useState({
    m_id: "",
    password: "",
  });

  const handleChangeId = (e) => {
    console.log(e.target.value)
    setForms({
      m_id: e.target.value,
    })
  }

  const handleChangePass = (e) => {
    setForms({
      password: e.target.value
    })
  }

  // const loginHandler = (e) => {
  //   e.preventDefault();
  //   submit(form);
  //   console.log('USERDATA:::', form)
  // };

  useEffect(() => {
    forceUpdate({});
  }, []);
  const onFinish = (values) => {
    submit(values);
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Helmet>
        <title>로그인 | 셀러허브 어드민</title>
      </Helmet>
      <Form
        form={form}
        name="normal_login"
        className="login-form"
        labelCol={{
          span: 0,
        }}
        wrapperCol={{
          span: 24,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="m_id"
          id="m_id"
          value={form.m_id}
          onChange={handleChangeId}
          rules={[
            {
              required: true,
              message: '사업자번호를 입력해 주세요!',
            },
          ]}
        >
          <Input size="large" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="아이디는 사업자번호를 입력해 주세요." />
        </Form.Item>

        <Form.Item
          name="password"
          id="password"
          value={form.password}
          onChange={handleChangePass}
          rules={[
            {
              required: true,
              message: '비밀번호를 입력해 주세요!',
            },
          ]}
        >
          <Input.Password size="large" prefix={<LockOutlined className="site-form-item-icon" />} placeholder="비밀번호를 입력해 주세요." />
        </Form.Item>

        {/*<Form.Item*/}
        {/*  name="remember"*/}
        {/*  valuePropName="checked"*/}
        {/*  wrapperCol={{*/}
        {/*    offset: 8,*/}
        {/*    span: 16,*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <Checkbox>Remember me</Checkbox>*/}
        {/*</Form.Item>*/}

        <Form.Item
          shouldUpdate
          wrapperCol={{
            offset: 0,
            span: 24,
          }}
        >
          {spin && spin
            ? <Button
              size="large"
              block
              type="default"
              disabled
            >
              <Spin indicator={antIcon} />
            </Button>
            :
              <Button
                size="large"
                block
                type="primary"
                htmlType="submit"
                className="login-form-button"
                disabled={
                  !form.isFieldsTouched(true) ||
                  !!form.getFieldsError().filter(({ errors }) => errors.length).length
                }
              >
                {label}
              </Button>
          }
        </Form.Item>
      </Form>



    </>
  )
}
export default AuthForm;