import React, { Component } from 'react'; // 这两个模块必须引入
import Coffee from 'assets/images/coffee.png';
import Flower from '../assets/images/flower.jpeg';

let name = 'Alan';

export default class Hello extends Component {
  render() {
    return (
      <div>
        {name}
        <img src={Coffee} />
        <img src={Flower} style={{ height: '60px' }} />
      </div>
    );
  }
}
