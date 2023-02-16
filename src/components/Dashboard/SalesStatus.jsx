import React from 'react';
import {Button, Card, Col, List, Spin, Tooltip, Typography} from "antd";
import {ArrowRightOutlined, LoadingOutlined, StopOutlined, SyncOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {useQuery} from "react-query";
import {getSalesStatus} from "../../api/dashboardApi";

const { Text } = Typography;

const SalesStatus = () => {

  const SpinIcon = (
    <LoadingOutlined
      style={{
        fontSize: 16,
      }}
      spin
    />
  );

  const {
    isLoading,
    error,
    refetch,
    data: salesStatus
  } = useQuery('getSalesStatus', getSalesStatus);

  return (
    <Card
      title={<Link to="#">주문/배송 <ArrowRightOutlined /></Link>}
      extra={
        <>
          <Tooltip title="새로고침">
            <Button shape="circle" size="small" onClick={refetch} icon={<SyncOutlined />}  style={{ marginRight: '8px' }} loading={isLoading} />
          </Tooltip>
          <Text type="secondary">(단위: 건)</Text>
        </>
      }
      headStyle={{ paddingInline: '16px' }}
      bodyStyle={{ padding: '0' }}
    >
      <List
        size="small"
      >
        <List.Item>
          <List.Item.Meta
            description="입금확인"
          />
          {isLoading && <Spin indicator={SpinIcon} size="small" />}

          {salesStatus ?
            <Link to="">{salesStatus && salesStatus.istep1}</Link>
            :
            error && <StopOutlined />
          }
        </List.Item>
        <List.Item>
          <List.Item.Meta
            description="배송 준비중"
          />
          {isLoading && <Spin indicator={SpinIcon} size="small" />}
          {salesStatus ?
            <Link to="">{salesStatus && salesStatus.istep2}</Link>
            :
            error && <StopOutlined />
          }
        </List.Item>
        <List.Item>
          <List.Item.Meta
            description="배송 중"
          />
          {isLoading && <Spin indicator={SpinIcon} size="small" />}
          {salesStatus ?
            <Link to="">{salesStatus && salesStatus.istep3}</Link>
            :
            error && <StopOutlined />
          }
        </List.Item>
        <List.Item>
          <List.Item.Meta
            description="배송 완료"
          />
          {isLoading && <Spin indicator={SpinIcon} size="small" />}
          {salesStatus ?
            <Link to="">{salesStatus && salesStatus.istep4}</Link>
            :
            error && <StopOutlined />
          }
        </List.Item>
        <List.Item>
          <List.Item.Meta
            description="구매 확정"
          />

          {isLoading && <Spin indicator={SpinIcon} size="small" />}
          {salesStatus ?
            <Link to="">{salesStatus && salesStatus.istep5}</Link>
            :
            error && <StopOutlined />
          }
        </List.Item>
      </List>
    </Card>
  )
}
export default SalesStatus;