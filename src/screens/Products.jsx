import React, { useState, useEffect } from 'react';
import { useQuery } from "react-query";
import { useAuthState } from "../atoms/auth";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../api/productsApi";
import noImage from "../assets/no-image.png";
import { Table } from "antd";

const columns = [
  {
    key: 'productImages',
    title: '상픔 이미지',
    dataIndex: 'productImages',
    render: (t, r) => {
      return (
        <img src={r.productImages} alt="" style={{ width: 160 }} />
      )
    }
  },
  {
    key: 'productName',
    title: '상품명',
    dataIndex: 'productName',
  },
  {
    key: 'productNumber',
    title: '상품 URL',
    dataIndex: 'productNumber',
  },
];

const Products = () => {
  const navigate = useNavigate();
  const [authState, setAuthState] = useAuthState();
  const [loading, setLoading] = useState(false);

  const onErrorImg = (e) => {
    e.target.src = noImage;
  }

  const {
    isLoading,
    onError,
    error,
    data: products
  } = useQuery('getProducts', getProducts);
  console.log(`PRODUCTS::: ${products}`);

  useEffect(() => {
    if(!authState.loggedIn) {
      navigate('/login');
    }

  }, [authState.loggedIn]);

  return (
    <div>
      <h1>Products</h1>
      <div>
        {isLoading && <div>Loading....</div>}
        {error && error.message}

        <Table
          columns={columns}
          dataSource={products}
          rowKey={(render)=> render.id}
          loading={loading}
          pagination={{
            pageSize: 10,
          }}
        />

        {/*{products && products.map((product) => (*/}
        {/*  <li key={product.productNumber}>*/}
        {/*    <a*/}
        {/*      href={`https://admin.sellerhub.co.kr/shop/goods/goods_view.php?goodsno=${product.productNumber}`}*/}
        {/*      target="_blank"*/}
        {/*      rel="noreferrer"*/}
        {/*    >*/}
        {/*      <img src={product.productImages} onError={onErrorImg} alt="" style={{ width: 160 }} /><br />{product.productName}*/}
        {/*    </a>*/}
        {/*  </li>*/}
        {/*))*/}
        {/*}*/}
      </div>
    </div>
  );
};

export default Products;
