import mockjs from "mockjs";

export default {
  'GET /api/img': mockjs.mock({
    'list|10': [{ src: '@image' }],
  }),
  'GET /api/post/1': {
    data: {
      id: 1,
      title: 'Uva- 489 - Hangman Judge',
      content: '刽子手游戏（Hangman Judge, UVa 489）原题地址：Uva489 刽子手游戏其实是一款猜单词游戏，如图4-1所示。游戏规则是这样的：计算机想一个单词让你猜，你每次可以猜一个字母。如果单词里有那个字母，所有该字母会显示出来；如果没有那个字母，则计算机会在一幅“刽子手”画上填一笔。这 ...',
      createdAt: 0,
      updatedAt: 1
    }
  }
};
