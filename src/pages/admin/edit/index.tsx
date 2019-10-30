import React, {ChangeEvent} from "react";
import './index.scss'
import {Input, Button} from "antd";
import MdEditor from "for-editor";
import withRouter from 'umi/withRouter';
import {connect} from 'dva';
import {
  EditableTagGroupComponent
} from '../../../components';
import {RouterTypes} from "umi";

interface EditPostPageProps extends RouterTypes {
  dispatch: any,
  loading: boolean
}

interface EditPostPageState {
  content: string,
  title: string,
  tags: string[],
}

/**
 * 博客发表页面
 */
class EditPostPage extends React.Component<EditPostPageProps, EditPostPageState> {
  static defaultProps = {
    loading: false
  };
  constructor(props: EditPostPageProps) {
    super(props);
    this.state = {
      content: '',
      title: '',
      tags: [],
    };
    this.handleMarkdownChange = this.handleMarkdownChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleTagsChange = this.handleTagsChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleMarkdownChange(content: string) {
    this.setState({
      content
    })
  }

  handleTitleChange(e: any) {
    this.setState({
      title: e.target.value
    });
  }

  handleTagsChange(tags: string[]) {
    this.setState({
      tags
    })
  }

  handleSubmit() {
    this.props.dispatch({
      type: 'admin/createPost',
      data: this.state
    });
  }

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    const {
      content,
      title
    } = this.state;
    const {
      loading
    } = this.props;
    return (
      <div className='admin-edit-page'>
        <div className='admin-edit-page__operators'>
          <Button type='primary' onClick={this.handleSubmit} loading={loading}>发表</Button>
        </div>
        <Input placeholder='在此输入文章标题' className='admin-edit-page__title-input' value={title}
               onChange={this.handleTitleChange}/>
        <EditableTagGroupComponent onTagsChange={this.handleTagsChange}/>
        <MdEditor value={content} onChange={this.handleMarkdownChange}/>
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    loading: state.loading.effects['admin/createPost']
  };
}

export default connect(mapStateToProps)(withRouter(EditPostPage))
