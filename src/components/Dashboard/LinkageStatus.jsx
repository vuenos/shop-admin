import React from 'react';
import {Link} from "react-router-dom";
import {ArrowRightOutlined, StopOutlined, SyncOutlined} from "@ant-design/icons";
import {Button, Card, Spin, Tooltip, Progress, Space, Typography} from "antd";
import { useQuery } from "react-query";
import { getLinkageStatus } from "../../api/dashboardApi";

const { Text } = Typography;

const LinkageStatus = () => {
  const {
    isLoading,
    data: linkageStatus,
  } = useQuery('getLinkageStatus', getLinkageStatus)

  return (
    <Card
      title={<Link to="#">상품 연동현황 <ArrowRightOutlined /></Link>
      }
      extra={<Text type="secondary">(성공률)</Text>}
      headStyle={{ paddingInline: '16px' }}
      bodyStyle={{ textAlign: 'center' }}
    >
      <Space direction="horizontal" align="start">
        <Space direction="vertical" align="center">
          <Progress
            type="circle"
            width={80}
            percent={linkageStatus && linkageStatus.total_ratio}
            format={(percent) => `${percent}%`}
            strokeColor={{
              '0%': '#108ee9',
              '100%': '#87d068',
            }}
          />
          <Text strong>연동</Text>
        </Space>

        <Space direction="vertical" align="center">
          <Progress
            type="circle"
            width={80}
            percent={linkageStatus && linkageStatus.on_sale_ratio}
            format={(percent) => `${percent}%`}
            strokeColor={{
              '0%': '#108ee9',
              '100%': '#87d068',
            }}
          />
          <Text strong>판매중 상품</Text>
        </Space>

        <Space direction="vertical" align="center">
          <Progress
            type="circle"
            width={80}
            percent={linkageStatus && linkageStatus.off_sale_ratio}
            format={(percent) => `${percent}%`}
            strokeColor={{
              '0%': '#108ee9',
              '100%': '#cc0000',
            }}
          />
          <Text strong>품절 상품</Text>
        </Space>
      </Space>
    </Card>
  )
}
export default LinkageStatus;