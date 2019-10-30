import React from "react";
import './index.scss'

interface PostManagerPageProps {

}

interface PostManagerPageState {

}

/**
 * 博文管理页面
 */
class PostManagerPage extends React.Component<PostManagerPageProps, PostManagerPageState> {
  constructor(props: PostManagerPageProps) {
    super(props);
  }

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    return (
      <div>
        PostManager Page
      </div>
    );
  }
}

export default PostManagerPage
