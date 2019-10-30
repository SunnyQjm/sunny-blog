import React from "react";
import {
  Tag, Input, Icon
} from 'antd';
import {TweenOneGroup} from 'rc-tween-one';
import './index.scss';

interface EditableTagGroupComponentProps {
  onTagsChange: (tags: string[]) => void
}

interface EditableTagGroupComponentState {
  tags: string[],
  inputVisible: boolean,
  inputValue: string
}

/**
 * 可编辑，带动画的标签组
 */
class EditableTagGroupComponent extends React.Component<EditableTagGroupComponentProps, EditableTagGroupComponentState> {
  static defaultProps = {
    onTagsChange: () => {
    }
  };

  constructor(props: EditableTagGroupComponentProps) {
    super(props);
    this.state = {
      tags: [],
      inputVisible: false,
      inputValue: ''
    };
    this.handleClose = this.handleClose.bind(this);
    this.showInput = this.showInput.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputConfirm = this.handleInputConfirm.bind(this);
    this.saveInputRef = this.saveInputRef.bind(this);
    this.forMap = this.forMap.bind(this);
  }

  input?: Input;

  /**
   * 处理标签移除
   * @param removeTag
   */
  handleClose(removeTag: string) {
    const tags = this.state.tags.filter(tag => tag !== removeTag);
    this.props.onTagsChange && this.props.onTagsChange(tags);
    this.setState({tags});
  }

  showInput() {
    this.setState({
      inputVisible: true
    }, () => this.input && this.input.focus());
  }

  handleInputChange(e: any) {
    this.setState({inputValue: e.target.value})
  }

  handleInputConfirm() {
    const {inputValue} = this.state;
    let {tags} = this.state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    this.props.onTagsChange && this.props.onTagsChange(tags);
    this.setState({
      tags,
      inputValue: '',
      inputVisible: false
    })
  }

  saveInputRef(input: Input) {
    this.input = input;
  }

  forMap(tag: string) {
    const tagElem = (
      <Tag
        closable
        onClose={(e: any) => {
          e.preventDefault();
          this.handleClose(tag);
        }}
      >
        {tag}
      </Tag>
    );
    return (
      <span key={tag} style={{display: 'inline-block'}}>
        {tagElem}
      </span>
    );
  }

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    const {tags, inputVisible, inputValue} = this.state;
    const tagChild = tags.map(this.forMap);
    return (
      <div>
        <div style={{marginBottom: 16}}>
          <TweenOneGroup
            enter={{
              scale: 0.8,
              opacity: 0,
              type: 'from',
              duration: 100,
              onComplete: (e: any) => {
                e.target.style = '';
              },
            }}
            leave={{opacity: 0, width: 0, scale: 0, duration: 200}}
            appear={false}
          >
            {tagChild}
            {inputVisible && (
              <Input
                ref={this.saveInputRef}
                type="text"
                size="small"
                style={{width: 78}}
                value={inputValue}
                onChange={this.handleInputChange}
                onBlur={this.handleInputConfirm}
                onPressEnter={this.handleInputConfirm}
              />
            )}
            {!inputVisible && (
              <Tag onClick={this.showInput} style={{background: '#fff', borderStyle: 'dashed'}}>
                <Icon type="plus"/> 新建标签
              </Tag>
            )}
          </TweenOneGroup>

        </div>

      </div>
    );
  }
}

export default EditableTagGroupComponent;
