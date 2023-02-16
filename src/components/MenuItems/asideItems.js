import React  from 'react';
import {
  RiShoppingBagFill,
  RiListCheck2,
  RiExchangeDollarLine,
  RiStoreFill,
  RiEqualizerLine
} from "react-icons/ri";
import {
  HomeFilled,
} from "@ant-design/icons";
import { Link } from "react-router-dom"

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const asideItems = [
  getItem(<Link to="/dashboard">대시보드</Link>, 'dashboard', <HomeFilled />),

  getItem('기본관리', 'settings:0', <RiEqualizerLine />, [
    getItem('기본관리', 'settings:1', null,
      [
        getItem(<Link to="/settings/plan">플랜 선택 / 결제수단 등록</Link>, 'settings:1:0'),
        getItem(<Link to="/settings/staff">담당자 정보 설정</Link>, 'settings:1:1'),
        getItem(<Link to="/settings/info">입점사 상세정보 관리</Link>, 'settings:1:2'),
        getItem(<Link to="/settings/delivery">배송정책 설정</Link>, 'settings:1:3'),
      ],
      'group'
    ),
    getItem('기타관리', 'settings:2', null,
      [
        getItem(<Link to="/settings/plan">휴무일정 등록</Link>, 'settings:2:0'),
        getItem(<Link to="/example">셀러허브 이용후기</Link>, 'settings:2:1'),
        getItem(<Link to="/settings/tutorial">셀러허브 이용가이드</Link>, 'settings:2:2'),
      ],
      'group'
    )
  ]),

  getItem('상품', 'goods:0', <RiShoppingBagFill size={16} />, [
    getItem('상품관리', 'goods:1', null,
      [
        getItem(<Link to="/goods/list">상품리스트</Link>, 'goods:1:0'),
        getItem(<Link to="/goods/approve">상품승인관리</Link>, 'goods:1:1'),
        getItem(<Link to="/goods/violation">상품정보위반</Link>, 'goods:1:2'),
        getItem(<Link to="/goods/register">상품등록</Link>, 'goods:1:3'),
      ],
      'group'
    ),
      getItem('상품일괄관리', 'goods:2', null,
        [
          getItem(<Link to="/goods/fast/outofstock">빠른 품절처리</Link>, 'goods:2:0'),
          getItem(<Link to="/goods/fast/stock">빠른 재고수정</Link>, 'goods:2:1'),
          getItem(<Link to="/goods/fast/price">빠른 가격수정</Link>, 'goods:2:2'),
        ],
        'group'
      ),
      getItem('데이터관리', 'goods:3', null,
      [
        getItem(<Link to="/goods/all/update">상픔일괄 업데이트</Link>, 'goods:3:0'),
        getItem(<Link to="/goods/all/report">상품정보고시 일괄 업데이트</Link>, 'goods:3:1'),
        getItem(<Link to="/goods/all/download">등록상품 DB다운로드</Link>, 'goods:3:2'),
      ],
      'group'
    )
  ]),

  getItem('주문', 'order:0', <RiListCheck2 />, [
    getItem('주문관리', 'order:1', null,
      [
        getItem(<Link to="/order/list">주문리스트</Link>, 'order:1:0'),
        getItem(<Link to="/order/fullfillment">주문리스트(풀필먼트)</Link>, 'order:1:1'),
        getItem(<Link to="/order/cancel">주문취소리스트</Link>, 'order:1:2'),
        getItem(<Link to="/order/return">반품접수/완료 리스트</Link>, 'order:1:3'),
      ],
      'group'
    )
  ]),
  getItem(<Link to="/example">빠른정산</Link>, 'lnb:4', <RiExchangeDollarLine />),
  getItem(<Link to="/example">도매픽</Link>, 'lnb:5', <RiStoreFill />),
];

export { asideItems }