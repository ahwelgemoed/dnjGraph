import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Text,
  KeyboardAvoidingView
} from 'react-native';

import CNEditor, {
  CNToolbar,
  // getInitialObject , CNRichTextEditor, // old editor
  getDefaultStyles
} from 'react-native-cn-richtext-editor';

const defaultStyles = getDefaultStyles();

class TextDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTag: 'body',
      selectedStyles: []
    };

    this.editor = null;
  }

  onStyleKeyPress = toolType => {
    this.editor.applyToolbar(toolType);
  };

  onSelectedTagChanged = tag => {
    this.setState({
      selectedTag: tag
    });
  };

  onSelectedStyleChanged = styles => {
    this.setState({
      selectedStyles: styles
    });
  };

  render() {
    return (
      <View
        style={{ flex: 1, width: 900 }}
        onTouchStart={() => {
          this.editor && this.editor.blur();
        }}
      >
        <View style={styles.main} onTouchStart={e => e.stopPropagation()}>
          <CNEditor
            ref={input => (this.editor = input)}
            onSelectedTagChanged={this.onSelectedTagChanged}
            onSelectedStyleChanged={this.onSelectedStyleChanged}
            style={{ backgroundColor: '#fff' }}
            styleList={defaultStyles}
            initialHtml={`   
                          <h1>HTML Ipsum Presents</h1>
                            <p><strong>Pellentesque habitant morbi tristique</strong> senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. <em>Aenean ultricies mi vitae est.</em> Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, <code>commodo vitae</code>, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. <a href="#">Donec non enim</a> in turpis pulvinar facilisis. Ut felis.</p>
                            `}
          />
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  main: {
    flex: 1,
    marginTop: 10,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 1,
    alignItems: 'stretch'
  },
  toolbarButton: {
    fontSize: 20,
    width: 28,
    height: 28,
    textAlign: 'center'
  },
  italicButton: {
    fontStyle: 'italic'
  },
  boldButton: {
    fontWeight: 'bold'
  },
  underlineButton: {
    textDecorationLine: 'underline'
  },
  lineThroughButton: {
    textDecorationLine: 'line-through'
  }
});

export default TextDisplay;
