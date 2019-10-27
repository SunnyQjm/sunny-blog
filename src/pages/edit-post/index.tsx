import React from "react";
import MdEditor from "for-editor";
import {
  Input
} from 'antd';
import './index.scss'

interface EditPostPageProps {

}

interface EditPostPageState {
  value: string,
}

/**
 * 编辑和发布博文的界面
 */
class EditPostPage extends React.Component<EditPostPageProps, EditPostPageState> {
  constructor(props: EditPostPageProps) {
    super(props);
    this.state = {
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value: string) {
    this.setState({
      value
    })
  }

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    const {
      value
    } = this.state;
    return (
      <div className='edit-post-page'>
        <Input placeholder='在此输入文章标题' className='edit-post-page__title-input'/>
        <MdEditor value={value} onChange={this.handleChange}/>
      </div>
    );
  }
}

export default EditPostPage
