import React from "react";
// @ts-ignore
import Lowlight from 'react-lowlight';
import shallowCompare from 'react-addons-shallow-compare';
// @ts-ignore
import js from 'highlight.js/lib/languages/javascript';
// @ts-ignore
import python from 'highlight.js/lib/languages/python';
// @ts-ignore
import ts from 'highlight.js/lib/languages/typescript';
// @ts-ignore
import bash from 'highlight.js/lib/languages/bash';
// @ts-ignore
import cpp from 'highlight.js/lib/languages/cpp';
// @ts-ignore
import java from 'highlight.js/lib/languages/java';



import './index.scss';

Lowlight.registerLanguage('js', js);
Lowlight.registerLanguage('python', python);
Lowlight.registerLanguage('ts', ts);
Lowlight.registerLanguage('bash', bash);
Lowlight.registerLanguage('cpp', cpp);
Lowlight.registerLanguage('java', java);

interface CodeRenderComponentProps {
  value: string,
  language: string,
  inline: boolean
}

interface CodeRenderComponentState {

}

class CodeRenderComponent extends React.Component<CodeRenderComponentProps, CodeRenderComponentState> {
  constructor(props: CodeRenderComponentProps) {
    super(props);
  }

  shouldComponentUpdate(nextProps: Readonly<CodeRenderComponentProps>, nextState: Readonly<CodeRenderComponentState>, nextContext: any): boolean {
    return shallowCompare(this, nextProps, nextState);
  }

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    console.log('aaa');
    console.log(this.props);
    return (
        <Lowlight
            language={this.props.language || 'java'}
            value={this.props.value}
            inline={this.props.inline}
        />
    );
  }
}

export default CodeRenderComponent;
