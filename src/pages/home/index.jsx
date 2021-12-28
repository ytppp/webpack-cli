import React, { useEffect } from 'react';
import Flower from 'assets/images/flower.jpeg';
import { DatePicker } from 'antd';
import './index.scss';

export default function Home() {
  useEffect(() => {
    console.log('Home');
  }, []);
  return (
    <div className="home">
      <DatePicker />
      <p>首页</p>
      <div className="bg"></div>
      <img src={Flower} style={{ height: 180 }} />
    </div>
  );
}
