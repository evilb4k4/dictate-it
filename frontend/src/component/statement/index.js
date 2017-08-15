import React from 'react';
import {connect} from 'react-redux';
import * as util from '../../lib/util';
import AceEditor from 'react-ace';
import 'brace/mode/text';
import 'brace/theme/github';

export class Statement extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      content: props.content,
    };
  }

  componentWillReceiveProps(props){
    this.setState({content: props.content});
  }

  shouldComponentUpdate(nextProps){
    if(nextProps.content == this.state.content)
      return false;
    return true;
  }

  render(){
    return (
      <AceEditor
        mode='text'
        theme='github'
        width='100%'
        onChange={this.props.handleChange}
        editorProps={{$blockScrolling: true}}
        setOptions={{
          wrap: true,
          maxLines: Infinity,
          autoScrollEditorIntoView: true,
          wrapBehavioursEnabled: true,
          indentedSoftWrap: false,
          behavioursEnabled: false,
          showGutter: false,
          showLineNumbers: false,
          fontSize: 15
        }}

        value={this.state.content}
      />
    );
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = (getState, dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Statement);
