import React, {FormEvent} from "react";
import './index.scss'
import {Form, Icon, Input, Button, Checkbox} from 'antd';
import { connect } from 'dva';
import {DispatchProps} from "@/data/interface/dva.interface";

interface LoginPageProps extends DispatchProps{
  form: any,
  loading: boolean
}

interface LoginPageState {
}

/**
 * 登录页面
 */
class LoginPage extends React.Component<LoginPageProps, LoginPageState> {
  constructor(props: LoginPageProps) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e: FormEvent) {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: object) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.dispatch({
          type: 'admin/login',
          data: values
        })
      }
    });
  };


  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    const {getFieldDecorator} = this.props.form;
    const {
      loading
    } = this.props;
    return (
      <div className='login-page'>
        <span className='login-page__title'>
          {'建明 | Ming.J'}
        </span>
        <span className='login-page__description'>每一个不曾起舞的日子都是对生命的辜负!</span>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{required: true, message: '请输入用户名!'}],
            })(
              <Input
                prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                placeholder="用户名"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{required: true, message: '请输入密码!'}],
            })(
              <Input
                prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                type="password"
                placeholder="密码"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>记住密码</Checkbox>)}
            <a className="login-form-forgot" href="">
              忘记密码
            </a>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={loading}
            >
              登录
            </Button>
            Or <a href="">现在注册</a>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    loading: state.loading.effects['admin/login']
  };
}

const WrappedNormalLoginForm = Form.create({name: 'normal_login'})(LoginPage);
export default connect(mapStateToProps)(WrappedNormalLoginForm)
