import React from "react";
import './index.scss'
import {
  PostItemComponent
} from '../components';

interface IndexPageProps {

}

interface IndexPageState {

}

class IndexPage extends React.Component<IndexPageProps, IndexPageState> {
  constructor(props: IndexPageProps) {
    super(props);
  }

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    const post = {
      id: 1,
      title: 'Uva- 489 - Hangman Judge',
      content: '刽子手游戏（Hangman Judge, UVa 489）原题地址：Uva489 刽子手游戏其实是一款猜单词游戏，如图4-1所示。游戏规则是这样的：计算机想一个单词让你猜，你每次可以猜一个字母。如果单词里有那个字母，所有该字母会显示出来；如果没有那个字母，则计算机会在一幅“刽子手”画上填一笔。这 ...',
      createdAt: 0,
      updatedAt: 1
    };
    return (
      <div className='index-page'>
        <div className='index-page__person-card'>

        </div>
        <div className='index-page__post-content-wrapper'>
          <PostItemComponent
            post={post}
          />
          <PostItemComponent
            post={post}
          />
          <PostItemComponent
            post={post}
          />
        </div>
      </div>
    );
  }
}

export default IndexPage
