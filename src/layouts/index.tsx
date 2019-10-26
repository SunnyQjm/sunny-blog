import React from 'react';
import './index.scss'
import {
  NavBarComponent
} from '../components';

const menu = [
  {
    icon: 'home',
    value: '首页',
    url: '/'
  },
  {
    icon: 'fire',
    value: '关于',
    url: '/about'
  },
  {
    icon: 'tags',
    value: '标签',
    url: '/tags'
  }
];

const BasicLayout: React.FC = props => {
  return (
    <div className='page_layout'>
      <div className='page_layout__header'>
        <NavBarComponent title='建明 | Ming.J' menu={menu}/>
      </div>
      <div className='page_layout__content'>
        {props.children}
      </div>
      <div className='page_layout__footer'>
        footer
      </div>
    </div>
  );
};

export default BasicLayout;
