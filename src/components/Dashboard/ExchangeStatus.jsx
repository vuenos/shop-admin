import React from 'react';
import {Button, Card, List, Spin, Tooltip, Typography} from "antd";
import {ArrowRightOutlined, LoadingOutlined, StopOutlined, SyncOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {useQuery} from "react-query";
import {getExchangeStatus} from "../../api/dashboardApi";

const { Text } = Typography;

const ExchangeStatus = () => {

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
    data: exchangeStatus
  } = useQuery('getExchangeStatus', getExchangeStatus);

  return (
    <Card
      title={<Link to="#">취소/교환/반품 <ArrowRightOutlined /></Link>}
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
            description="취소 완료"
          />
          {isLoading && <Spin indicator={SpinIcon} size="small" />}

          {exchangeStatus ?
            <Link to="">{exchangeStatus && exchangeStatus.istep45}</Link>
            :
            error && <StopOutlined />
          }
        </List.Item>
        <List.Item>
          <List.Item.Meta
            description="반품 요청"
          />
          {isLoading && <Spin indicator={SpinIcon} size="small" />}
          {exchangeStatus ?
            <Link to="">{exchangeStatus && (exchangeStatus.istep40 + exchangeStatus.istep41)}</Link>
            :
            error && <StopOutlined />
          }
        </List.Item>
        <List.Item>
          <List.Item.Meta
            description="교환 요청"
          />
          {isLoading && <Spin indicator={SpinIcon} size="small" />}
          {exchangeStatus ?
            <Link to="">{exchangeStatus && exchangeStatus.exchange1}</Link>
            :
            error && <StopOutlined />
          }
        </List.Item>
        <List.Item>
          <List.Item.Meta
            description="환불 접수"
          />
          {isLoading && <Spin indicator={SpinIcon} size="small" />}
          {exchangeStatus ?
            <Link to="">{exchangeStatus && exchangeStatus.istep42}</Link>
            :
            error && <StopOutlined />
          }
        </List.Item>
      </List>
    </Card>
  )
}
export default ExchangeStatus;