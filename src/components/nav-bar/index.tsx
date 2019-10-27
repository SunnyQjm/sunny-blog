import React from "react";
import './index.scss';
import Link from 'umi/link';
import {
  Icon
} from 'antd';
import RouterTypes from "umi/routerTypes";
import withRouter from 'umi/withRouter';


interface NavBarComponentProps extends RouterTypes{
  title: string,
  menu: {
    url: string,
    icon: string,
    value: string,
  }[],
}

interface NavBarComponentState {

}

class NavBarComponent extends React.Component<NavBarComponentProps, NavBarComponentState> {
  static defaultProps = {
    title: 'Website title',
    menu: []
  };

  constructor(props: NavBarComponentProps) {
    super(props);
  }

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    const {
      title,
      menu,
      location
    } = this.props;
    const menus = menu.map(item => {
      return (
        <Link to={item.url} className={`nav-bar-component__menu-item ${(location && location.pathname == item.url) ? 'nav-bar-component__menu-item--active' : ''}`} key={item.url + item.value}>
          <Icon type={item.icon} theme='filled' style={{marginRight: '5px'}}/>
          {item.value}
        </Link>
      )
    });
    return (
      <div className='nav-bar-component'>
        <div className='nav-bar-component__wrapper'>
          <span className='nav-bar-component__title'>
          {title}
        </span>

          <div className='nav-bar-component__menu'>
            {menus}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(NavBarComponent);
