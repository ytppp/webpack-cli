import 'assets/css/style.css';
import 'assets/css/blue.scss';
import React from 'react';
import { render } from 'react-dom';
import HelloReact from 'components/react-hello'; // 可省略.js后缀名

render(<HelloReact />, document.getElementById('root'));
