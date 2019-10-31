import React from "react";
import Antd, {Divider, message, Table, Popconfirm} from 'antd';
import {connect} from 'dva';
import withRouter from 'umi/withRouter';
import './index.scss'
import RouterTypes from "umi/routerTypes";
import {Post} from "@/data/post";
import {Tag} from "@/data/tag";
import {dateFormat} from "@/utils/date.util";

interface PostManagerPageProps extends RouterTypes {
  dispatch: any,
  loading: boolean,
  posts: Post[],
  total: number,
  page: number,
  pageSize: number,
}

interface PostManagerPageState {

}


// // rowSelection object indicates the need for row selection
// const rowSelection = {
//   onChange: (selectedRowKeys: any, selectedRows: any) => {
//     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
//   },
//   getCheckboxProps: (record: any) => ({
//     disabled: record.name === 'Disabled User', // Column configuration not to be checked
//     name: record.name,
//   }),
// };


/**
 * 博文管理页面
 */
class PostManagerPage extends React.Component<PostManagerPageProps, PostManagerPageState> {
  constructor(props: PostManagerPageProps) {
    super(props);
  }

  componentDidMount(): void {
    this.props.dispatch({
      type: 'post-manager/getPosts',
      data: {
        page: 1,
        size: this.props.pageSize
      }
    });
    this.handleDelete = this.handleDelete.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  /**
   * 处理删除博文
   */
  handleDelete(postId: number) {
    message.loading(`删除: ${postId}`);
    this.props.dispatch({
      type: 'post-manager/delPost',
      data: postId
    })
  }

  handlePageChange(newPage: number, newPageSize: number) {
    this.props.dispatch({
      type: 'post-manager/getPosts',
      data: {
        page: newPage,
        size: newPageSize
      }
    })
  }

  columns = [
    {
      title: '标题',
      key: 'title',
      dataIndex: 'title',
      render: (text: any) => <a>{text}</a>,
    },
    {
      title: '内容',
      key: 'content',
      dataIndex: 'content',
      render: (content: string) => <span>
        {
          content.length > 100 ?
            content.substr(0, 100)
            :
            content
        }
      </span>
    },
    {
      title: '标签',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags: Tag[]) => (
        <span>
        {tags.map(tag => {
          let color = tag.tagName.length > 5 ? 'geekblue' : 'green';
          return (
            <Antd.Tag color={color} key={tag.id}>
              {tag.tagName}
            </Antd.Tag>
          );
        })}
      </span>
      )
    },
    {
      title: '创建时间',
      key: 'createdAt',
      dataIndex: 'createdAt',
      render: (date: string) => {
        return (
          <span>{dateFormat("YYYY-mm-dd HH:MM", new Date(date))}</span>
        )
      }
    },
    {
      title: '更新时间',
      ket: 'updatedAt',
      dataIndex: 'updatedAt',
      render: (date: string) => {
        return (
          <span>{dateFormat("YYYY-mm-dd HH:MM", new Date(date))}</span>
        )
      }
    },
    {
      title: '操作',
      key: 'action',
      render: (text: string, record: Post) => (
        <span>
          <a>预览</a>
          <Divider type="vertical"/>
          <a>编辑</a>
          <Divider type="vertical"/>
          <Popconfirm title='确认删除?' okText='确认' cancelText='取消' onConfirm={() => this.handleDelete(record.id)}>
              <a style={{color: 'red'}}>删除</a>
          </Popconfirm>
        </span>
      ),
    }
  ];

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    const {
      loading,
      posts,
      page,
      pageSize,
      total
    } = this.props;
    const data = posts.map(post => {
      return {
        ...post,
        key: post.id
      }
    });
    const pagination: any = {
      pageSize,
      total: total,
      current: page,
      onChange: this.handlePageChange
    };
    return (
      <div>
        <Table columns={this.columns} dataSource={data} useFixedHeader loading={loading} pagination={pagination}/>
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    ...state['post-manager'],
    loading: state.loading.effects['post-manager/getPosts'],
  };
}

export default connect(mapStateToProps)(withRouter(PostManagerPage))
