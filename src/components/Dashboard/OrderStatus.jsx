import React from 'react';
import {Link} from "react-router-dom";
import { useQuery } from "react-query";
import {ArrowRightOutlined, LoadingOutlined, StopOutlined, SyncOutlined} from "@ant-design/icons";
import {Button, Card, List, Spin, Tooltip, Typography} from "antd";
import {getOrderStatus} from "../../api/dashboardApi";

const { Text } = Typography;
const OrderStatus = () => {
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
    orderStatus
  } = useQuery('getOrderStatus', getOrderStatus);

  return (
    <Card
      title={<Link to="#">매출현황 <ArrowRightOutlined /></Link>}
      extra={
        <>
          <Tooltip title="새로고침">
            <Button shape="circle" size="small" onClick={refetch} icon={<SyncOutlined />}  style={{ marginRight: '8px' }} loading={isLoading} />
          </Tooltip>
          <Text type="secondary">(매월 1일 ~ 매월 말일)</Text>
        </>
      }
      headStyle={{ paddingInline: '16px' }}
      bodyStyle={{ padding: '0' }}
    >

    </Card>
  )
}
export default OrderStatus;