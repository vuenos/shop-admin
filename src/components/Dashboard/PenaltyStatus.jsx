import React from 'react';
import {Button, Card, List, Spin, Tooltip, Typography} from "antd";
import {ArrowRightOutlined, LoadingOutlined, StopOutlined, SyncOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {useQuery} from "react-query";
import {getPenaltyStatus} from "../../api/dashboardApi";

const { Text } =Typography;

const PenaltyStatus = () => {
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
    data: penaltyStatus
  } = useQuery('getPenaltyStatus', getPenaltyStatus);

  return (
    <Card
      title={<Link to="#">패널티 <ArrowRightOutlined /></Link>}
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
            description="가송장"
          />
          {isLoading && <Spin indicator={SpinIcon} size="small" />}

          {penaltyStatus ?
            penaltyStatus && penaltyStatus.paneltyFakeInvoiceCount
            :
            error && <StopOutlined />
          }
        </List.Item>
        <List.Item>
          <List.Item.Meta
            description="발송지연"
          />
          {isLoading && <Spin indicator={SpinIcon} size="small" />}
          {penaltyStatus ?
            penaltyStatus && penaltyStatus.penaltyDelayCount
            :
            error && <StopOutlined />
          }
        </List.Item>
        <List.Item>
          <List.Item.Meta
            description="품절취소"
          />
          {isLoading && <Spin indicator={SpinIcon} size="small" />}
          {penaltyStatus ?
            penaltyStatus && penaltyStatus.penaltyRunoutCount
            :
            error && <StopOutlined />
          }
        </List.Item>
        <List.Item>
          <List.Item.Meta
            description="총 패널티"
          />
          {isLoading && <Spin indicator={SpinIcon} size="small" />}
          {penaltyStatus ?
            penaltyStatus && penaltyStatus.penaltyTotalCount
            :
            error && <StopOutlined />
          }
        </List.Item>
        <List.Item>
          <List.Item.Meta
            description="총 금액"
          />
          {isLoading && <Spin indicator={SpinIcon} size="small" />}
          {penaltyStatus ?
            <>
              {penaltyStatus && penaltyStatus.penaltyTotalAmount}
              <Text strong>원</Text>
            </>
            :
            error && <StopOutlined />
          }
        </List.Item>
      </List>
    </Card>
  )
}
export default PenaltyStatus;