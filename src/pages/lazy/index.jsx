import React, { useEffect } from 'react';
import './index.css';
import { Button } from 'antd';

export default function Lazy() {
  useEffect(() => {
    console.log('Lazy');
  }, []);
  return (
    <div className="lazy">
      Lazy
      <Button type="primary">点击+2</Button>
    </div>
  );
}
