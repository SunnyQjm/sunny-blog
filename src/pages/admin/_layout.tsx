import React from "react";
import './layout.scss'
import {
  Layout,
  Menu,
  Icon,
  Avatar,
  Dropdown
} from 'antd';

const {SubMenu} = Menu;
const {Header, Content, Footer, Sider} = Layout;

interface AdminLayoutProps {

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
  }


  onCollapse(collapsed: boolean) {
    console.log(collapsed);
    this.setState({collapsed});
  };

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    const {
      collapsed
    } = this.state;
    const menu = (
      <Menu>
        <Menu.Item>退出登录</Menu.Item>
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
          <div className="logo"/>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
            <Menu.Item key="1">
              <Icon type="user"/>
              <span className="nav-text">nav 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera"/>
              <span className="nav-text">nav 2</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload"/>
              <span className="nav-text">nav 3</span>
            </Menu.Item>
            <Menu.Item key="4">
              <Icon type="user"/>
              <span className="nav-text">nav 4</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{marginLeft: collapsed ? 80 : 200}}>
          <Header
            className='admin-layout__header'
            // style={{width: collapsed ? 'calc(100% - 80px)' : 'calc(100% - 200px)'}}
          >
            <Dropdown overlay={menu}>
              <a>
                <Avatar
                  className='admin-layout__header_avatar'
                  src='https://avatars2.githubusercontent.com/u/29176413?s=400&u=f78127887499acf06545f9cbe298ce388201dfed&v=4'
                />
                <span className='admin-layout__header_username'>SunnyQjm</span>
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

export default AdminLayout
