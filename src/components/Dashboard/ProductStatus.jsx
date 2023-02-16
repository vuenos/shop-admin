import React, { useState } from 'react';
import {Link} from "react-router-dom";
import {ArrowRightOutlined, LoadingOutlined, StopOutlined, SyncOutlined, SearchOutlined, InfoCircleOutlined} from "@ant-design/icons";
import {Button, Card, List, Spin, Tooltip, Typography, Modal} from "antd";
import { useQuery } from "react-query";
import { getProductState } from "../../api/dashboardApi";

const { Text } = Typography;

const ProductStatus = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const SpinIcon = (
    <LoadingOutlined
      style={{
        fontSize: 16,
      }}
      spin
    />
  );

  const runoutInfoModal = () => {
    Modal.info({
      title: '품절 상세내역',
      content: (
        <List size="small" bordered>
          <List.Item>
            <List.Item.Meta
              description="비노출 상품"
             />
            <Text>{productState.invisibleRunout}</Text>
          </List.Item>
          <List.Item>
            <List.Item.Meta
              description="노출 상품"
            />
            <Text>{productState.visibleRunout}</Text>
          </List.Item>
        </List>
      ),
      onOk() {},
    });
  }

  const {
    isLoading,
    error,
    refetch,
    data: productState
  } = useQuery('getProductState', getProductState)
  
  return (
    <Card
      title={<Link to="#">취소/교환/반품 <ArrowRightOutlined /></Link>}
      extra={
        <>
          <Tooltip title="새로고침">
            <Button
              shape="circle"
              size="small"
              onClick={refetch}
              icon={<SyncOutlined />}
              style={{ marginRight: '8px' }}
              loading={isLoading}
            />
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
            description="승인 전"
          />
          {isLoading && <Spin indicator={SpinIcon} size="small" />}
          {productState ?
            <Link to="">{productState && productState.beforeApproved}</Link>
            :
            error && <StopOutlined />
          }
        </List.Item>
        <List.Item>
          <List.Item.Meta
            description="승인 요청"
          />
          {isLoading && <Spin indicator={SpinIcon} size="small" />}
          {productState ?
            <Link to="">{productState && (productState.approvingRequested)}</Link>
            :
            error && <StopOutlined />
          }
        </List.Item>
        <List.Item>
          <List.Item.Meta
            description="승인 완료"
          />
          {isLoading && <Spin indicator={SpinIcon} size="small" />}
          {productState ?
            <Link to="">{productState && productState.approved}</Link>
            :
            error && <StopOutlined />
          }
        </List.Item>
        <List.Item>
          <List.Item.Meta
            description="판매 중"
          />
          {isLoading && <Spin indicator={SpinIcon} size="small" />}
          {productState ?
            <Link to="">{productState && productState.onSale}</Link>
            :
            error && <StopOutlined />
          }
        </List.Item>
        <List.Item>
          <List.Item.Meta
            description="승인 반려"
          />
          {isLoading && <Spin indicator={SpinIcon} size="small" />}
          {productState ?
            <Link to="">{productState && productState.approvingRejected}</Link>
            :
            error && <StopOutlined />
          }
        </List.Item>
        <List.Item>
          <List.Item.Meta
            description={
              <>
                <Text type="secondary">품절</Text>
                <Button size="small" type="text" shape="circle" icon={<InfoCircleOutlined />} onClick={runoutInfoModal} style={{ marginLeft: '8px' }} />
              </>
            }
          />
          {isLoading && <Spin indicator={SpinIcon} size="small" />}
          {productState ?
            <Link to="">{productState && productState.runout}</Link>
            :
            error && <StopOutlined />
          }
        </List.Item>
      </List>
    </Card>
  )
}
export default ProductStatus;