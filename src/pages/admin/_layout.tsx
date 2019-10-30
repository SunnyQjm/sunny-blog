import React from "react";
import './layout.scss'
import {
  Layout,
  Menu,
  Icon,
  Avatar,
  Dropdown
} from 'antd';
import RouterTypes from "umi/routerTypes";
import withRouter from 'umi/withRouter';
import {SelectParam} from "antd/es/menu";
import router from 'umi/router';
import { connect } from 'dva';
import {User} from "@/data/user";

const {Header, Content, Footer, Sider} = Layout;

interface AdminLayoutProps extends RouterTypes {
  user: User,
  dispatch: any,
}

interface AdminLayoutState {
  collapsed: boolean
}


/**
 * 管理页面layout
 */
class AdminLayout extends React.Component<AdminLayoutProps, AdminLayoutState> {
  constructor(props: AdminLayoutProps) {
    super(props);
    this.state = {
      collapsed: false,
    };
    this.onCollapse = this.onCollapse.bind(this);
    this.onMenuSelected = this.onMenuSelected.bind(this);
  }


  onCollapse(collapsed: boolean) {
    this.setState({collapsed});
  };

  onMenuSelected(param: SelectParam) {
    console.log(param);
    router.replace(param.key);
  }

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    const {
      collapsed
    } = this.state;
    const {
      user
    } = this.props;
    const menu = (
      <Menu>
        <Menu.Item onClick={() => {
          this.props.dispatch({
            'type': 'admin/logout'
          });
          router.replace('/login');
        }}>退出登录</Menu.Item>
      </Menu>
    );
    return (
      <Layout className='admin-layout'>
        <Sider
          breakpoint="lg"
          // collapsedWidth="0"
          collapsible={true}
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
          className='admin-layout__slider'
        >
          <div className="admin-layout__slider_logo">
            <span className='admin-layout__slider__title'>
                {'建明 | Ming.J'}
              </span>
          </div>
          <Menu theme="dark" mode="inline" selectedKeys={[this.props.location.pathname]} onSelect={this.onMenuSelected}>
            <Menu.Item key="/admin/edit">
              <Icon type="edit"/>
              <span className="nav-text">写博客</span>
            </Menu.Item>
            <Menu.Item key="/admin/post-manager">
              <Icon type="unordered-list"/>
              <span className="nav-text">博客管理</span>
            </Menu.Item>
            <Menu.Item key="/admin/comment-manager">
              <Icon type="message"/>
              <span className="nav-text">评论管理</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{marginLeft: collapsed ? 80 : 200}}>
          <Header
            className='admin-layout__header'
          >
            <Dropdown overlay={menu}>
              <a>
                <Avatar
                  className='admin-layout__header_avatar'
                  src={(user && user.avatar) ? user.avatar : ''}
                />
                <span className='admin-layout__header_username'>{user && user.username}</span>
              </a>
            </Dropdown>
          </Header>
          <Content className='admin-layout__content'>
            <div style={{padding: 24, background: '#fff', minHeight: 360}}>{this.props.children}</div>
          </Content>
          <Footer className='admin-layout__footer'>Sunny Blog ©2019 Created by SunnyQjm</Footer>
        </Layout>
      </Layout>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    user: state.admin.user
  };
}

export default connect(mapStateToProps)(withRouter(AdminLayout));
