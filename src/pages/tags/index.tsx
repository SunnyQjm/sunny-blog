import React from "react";
import './index.scss'

interface TagsPageProps {

}

interface TagsPageState {

}

class TagsPage extends React.Component<TagsPageProps, TagsPageState> {
  constructor(props: TagsPageProps) {
    super(props);
  }

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    return (
      <div>
        Tags Page
      </div>
    );
  }
}

export default TagsPage
