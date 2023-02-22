import React, {Component, createRef} from 'react';
import {Alert, BackHandler, Button, Platform} from 'react-native';

import {Config, DocumentView, RNPdftron} from 'react-native-pdftron';

export default class App extends Component {
  constructor(props) {
    super(props);

    RNPdftron.initialize('Insert commercial license key here after purchase');
    RNPdftron.enableJavaScript(true);

    this.documentRef = createRef();
    this.sign = this.sign.bind(this);
  }

  onLeadingNavButtonPressed = () => {
    console.log('leading nav button pressed');
    if (Platform.OS === 'ios') {
      Alert.alert(
        'App',
        'onLeadingNavButtonPressed',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: true},
      );
    } else {
      BackHandler.exitApp();
    }
  };

  sign = () => {
    this.documentRef.current?.setToolMode(
      Config.Tools.annotationCreateSignature,
    );
  };

  onToolChanged = ({tool, previousTool}) => {
    console.log({
      tool,
      previousTool,
    });
  };

  render() {
    const path =
      'https://pdftron.s3.amazonaws.com/downloads/pl/PDFTRON_mobile_about.pdf';

    return (
      <>
        <Button title="Sign a signature" onPress={this.sign} />
        <DocumentView
          ref={this.documentRef}
          document={path}
          showLeadingNavButton={true}
          leadingNavButtonIcon={
            Platform.OS === 'ios'
              ? 'ic_close_black_24px.png'
              : 'ic_arrow_back_white_24dp'
          }
          onLeadingNavButtonPressed={this.onLeadingNavButtonPressed}
          onToolChanged={this.onToolChanged}
          bottomToolbarEnabled={false}
          hideTopToolbars={true}
        />
      </>
    );
  }
}
