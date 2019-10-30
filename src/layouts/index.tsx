import React from "react";
import withRouter from 'umi/withRouter';
import './index.scss'
import {
  NavBarComponent
} from '../components';
import RouterTypes from "umi/routerTypes";
import {LocalStorageKeys, LocalStorageManager} from "@/manager/storage.manager";
import { connect } from 'dva';

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


interface BasicLayoutProps extends RouterTypes {
  dispatch: any
}

interface BasicLayoutState {

}

class BasicLayout extends React.Component<BasicLayoutProps, BasicLayoutState> {
  constructor(props: BasicLayoutProps) {
    super(props);
  }

  componentDidMount(): void {
    console.log('global layout mount');
    this.props.dispatch({
      type: 'admin/init'
    });
  }

  componentDidUpdate(prevProps: any) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    if (this.props.location.pathname.startsWith('/admin') || this.props.location.pathname.startsWith('/login')) {
      return (
        <div>
          {this.props.children}
        </div>
      );
    }
    return (
      <div className='page_layout'>
        <div className='page_layout__header'>
          <NavBarComponent title='建明 | Ming.J' menu={menu}/>
        </div>
        <div className='page_layout__content'>
          {this.props.children}
        </div>
        <div className='page_layout__footer'>
          <div className='page_layout__footer-wrapper'>
            <div>© 2018 – 2019 建明 | Ming.J</div>
            {/*<div>Powered by Hexo v3.8.0 | Theme – NexT.Mist v7.1.0</div>*/}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  return state;
}

export default connect(mapStateToProps)(withRouter(BasicLayout));
