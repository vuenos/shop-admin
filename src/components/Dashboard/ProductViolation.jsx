import React, { useState } from 'react';
import {Link} from "react-router-dom";
import {ArrowRightOutlined, LoadingOutlined, StopOutlined, SyncOutlined} from "@ant-design/icons";
import {Button, Card, List, Spin, Tooltip, Typography, Tag} from "antd";
import { useQuery } from "react-query";
import {getProductViolation} from "../../api/dashboardApi";

const { Text } = Typography;

const ProductViolation = () => {

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
    data: productViolation
  } = useQuery('getProductViolation', getProductViolation);

  return (
    <Card
      title={<Link to="#">상품정보위반 <ArrowRightOutlined /></Link>}
      extra={
        <>
          <Tooltip title="새로고침">
            <Button shape="circle" size="small" onClick={refetch} icon={<SyncOutlined />}  style={{ marginRight: '8px' }} loading={isLoading} />
          </Tooltip>
          <Text type="secondary">({productViolation && productViolation.pagination.total} 건)</Text>
        </>
      }
      headStyle={{ paddingInline: '16px' }}
      bodyStyle={{ padding: '0' }}
    >
      <List
        size="small"
      >
        {productViolation && productViolation.data.map((item) => (
          <List.Item key={item.violationId}>
            <List.Item.Meta
              description={
                <>
                  <Tag color="processing">{item.productNumber}</Tag>
                  {item.violation.violationType}
                </>
              }
              style={{ fontSize: '12px' }}
            />
            {isLoading && <Spin indicator={SpinIcon} size="small" />}
            <Text>{item.status === 'request' ? <Tag color="red">판매중지</Tag> :  <Tag color="green">판매시작</Tag>}</Text>
          </List.Item>
        ))}
      </List>
    </Card>
  )
}
export default ProductViolation;