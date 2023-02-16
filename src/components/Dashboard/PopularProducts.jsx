import React from 'react';
import {Link} from "react-router-dom";
import {ArrowRightOutlined, LoadingOutlined, StopOutlined, SyncOutlined} from "@ant-design/icons";
import {Button, Card, List, Spin, Tooltip, Typography, Avatar} from "antd";
import {useQuery} from "react-query";
import {getPopularProducts} from "../../api/dashboardApi";

const { Text } = Typography;

const PopularProducts = () => {
  const SpinIcon = (
    <LoadingOutlined
      style={{
        fontSize: 16,
      }}
      spin
    />
  );

  // 가격표시 정규식
  function makeComma(str) {
    str = String(str);

    return str.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }

  const {
    isLoading,
    error,
    data: popularProducts
  } = useQuery('getPopularProducts', getPopularProducts);

  return (
    <Card
      title={<Link to="#">인기상품 <ArrowRightOutlined /></Link>}
      headStyle={{ paddingInline: '16px' }}
      bodyStyle={{ padding: '0' }}
      loading={isLoading}
    >
      <List
        itemLayout="vertical"
        size="small"
      >
        {popularProducts && popularProducts.map((popItem) => (
          <List.Item
            key={popItem.productNumber}
            extra={
              <img
                width={94}
                alt={popItem.productName}
                src={`${popItem.productImageLarge}`}
                style={{ borderRadius: '8px' }}
              />
            }
          >
            <List.Item.Meta
              title={<Link to="#" style={{ fontSize: '13px' }}>{popItem.productName}</Link>}
              description={`${makeComma(popItem.price)} 원`}
            />
          </List.Item>
        ))}
      </List>
    </Card>
  )
}
export default PopularProducts;