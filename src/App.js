import React, { Component } from 'react';

import JSONEditorInput from './JSONEditorInput';
import JSONEditorOutput from './JSONEditorOutput';

import './App.css';


const json = {
  'array': [1, 2, 3],
  'boolean': true,
  'null': null,
  'number': 4,
  'object': {'a': 'b', 'c': 'd'},
  'string': 'Hello World'
};

var errorLen = 0;

class App extends Component {
  state = {
    text: JSON.stringify(json, null, 2),
  };

  render() {
    return (
      <div className="app">
        <h1 className='title'>JSON <span>Parser </span>Online</h1>
        
        <div className="contents">
          <div className="code">
            <JSONEditorInput
                text={this.state.text}
                mode={'code'}
                indentation={4}
                onValidationError={
                  function (errors) {
                    console.error('onValidationError :',  errors.length);
                    errorLen = errors.length;
                  }
                }
                onChangeText={this.onChangeText}
            />
          </div>
          <div className="menu">
            <div className='btnUpdate' onClick={this.updateJsonParseData}>
              <button><img src='/assets/img/3.png' /></button>
            </div>
          </div>
          <div className="tree">
            <JSONEditorOutput
                text={this.state.text}
                mode={'view'}
                indentation={4}
            />
          </div>
        </div>
      </div>
    );
  }

  onChangeText = (text) => {
    this.state.text = text;
  };

  updateJsonParseData = () => {
    var update_data = this.state.text;
    if (errorLen == 0) {
      console.log(errorLen);
      if (!isNaN(update_data)) {
        this.setState({ text: JSON.stringify({}, null, 2)});
      }
      this.setState({ json: update_data });
    }
  }
}

export default App;
