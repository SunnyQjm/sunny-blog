import React from "react";
import './index.scss';
import {Post} from "@/data/post";

interface PostItemComponentProps {
  post: Post
}

interface PostItemComponentState {

}

/**
 * 博客item
 */
class PostItemComponent extends React.Component<PostItemComponentProps, PostItemComponentState> {
  static defaultProps = {
    post: {}
  };

  constructor(props: PostItemComponentProps) {
    super(props);
  }

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    const {
      post
    } = this.props;
    return (
      <div className='post-item-component'>
        <h1 className='post-item-component__title'>
          <a href="#">{post.title}</a>
        </h1>
        <p className='post-item-component__content'>
          {post.content}
        </p>
      </div>
    );
  }
}

export default PostItemComponent;
