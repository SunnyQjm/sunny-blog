import React from "react";
import './index.scss'

interface CommentManagerPageProps {

}

interface CommentManagerPageState {

}

/**
 * 评论管理界面
 */
class CommentManagerPage extends React.Component<CommentManagerPageProps, CommentManagerPageState> {
  constructor(props: CommentManagerPageProps) {
    super(props);
  }

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    return (
      <div>
        CommentManager Page
      </div>
    );
  }
}

export default CommentManagerPage
