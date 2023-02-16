import React, { useState, useEffect } from 'react';
import { useAuthState } from "../atoms/auth";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Row, Col, Card, Typography, List, Spin, Button, Tooltip } from "antd";
import {
  SalesStatus,
  ExchangeStatus,
  PenaltyStatus,
  PopularProducts,
  LinkageStatus,
  ProductStatus,
  ProductViolation,
  OrderStatus
} from "../components/Dashboard";

const { Title } = Typography;
const Home = () => {
  const navigate = useNavigate();
  const [authState, setAuthState] = useAuthState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(!authState.loggedIn) {
      navigate('/login')
    }
    console.log('LOGGEDIN', authState.loggedIn)
  }, [authState.loggedIn]);
    return (
      <div>
        <Helmet>
          <title>대시보드 | 셀러허브 어드민</title>
        </Helmet>
        {authState.loggedIn
          ?
          <div>
            <Title level={2}>Dashboard</Title>

            <div>
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <SalesStatus />
                </Col>

                <Col span={8}>
                  <ExchangeStatus />
                </Col>

                <Col span={8}>
                  <PenaltyStatus />
                </Col>

                <Col span={8}>
                  <ProductStatus />
                </Col>

                <Col span={8}>
                  <PopularProducts />
                </Col>

                <Col span={8}>
                  <LinkageStatus />
                </Col>

                <Col span={8}>
                  <ProductViolation />
                </Col>

                <Col span={24}>
                  <OrderStatus />
                </Col>
              </Row>
            </div>
          </div>
          :
          <div>
            <p>Please log in</p>
          </div>
        }
      </div>
    );

};

export default Home;
