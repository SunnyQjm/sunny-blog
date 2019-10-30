import React from "react";
import './index.scss'

interface EditPostPageProps {

}

interface EditPostPageState {

}

/**
 * 博客发表页面
 */
class EditPostPage extends React.Component<EditPostPageProps, EditPostPageState> {
  constructor(props: EditPostPageProps) {
    super(props);
  }

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    return (
      <div>
        EditPost Page
      </div>
    );
  }
}

export default EditPostPage
