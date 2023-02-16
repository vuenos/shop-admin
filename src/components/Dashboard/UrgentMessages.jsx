import React from 'react';
import {Link} from "react-router-dom";
import {ArrowRightOutlined, LoadingOutlined, StopOutlined, SyncOutlined} from "@ant-design/icons";
import {Button, Card, List, Spin, Tooltip, Typography} from "antd";
import {useQuery} from "react-query";
import {getPopularProducts} from "../../api/dashboardApi";

const { Text } = Typography;

const UrgentMessages = () => {
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
    data: popularProducts
  } = useQuery('getPopularProducts', getPopularProducts);

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

          {popularProducts ?
            <Link to="">{popularProducts && popularProducts.istep1}</Link>
            :
            error && <StopOutlined />
          }
        </List.Item>
      </List>
    </Card>
  )
}
export default UrgentMessages;