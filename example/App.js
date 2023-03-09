import React, {Component} from 'react';
import {Alert, BackHandler, Button, Platform, View} from 'react-native';

import {Config, DocumentView, RNPdftron} from 'react-native-pdftron';

export default class App extends Component {
  constructor(props) {
    super(props);

    RNPdftron.initialize('Insert commercial license key here after purchase');
    RNPdftron.enableJavaScript(true);

    this.documentRef = React.createRef(DocumentView);
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

  onPressFreeText = () => {
    this.documentRef.current.setToolMode(Config.Tools.annotationCreateFreeText);
  };

  render() {
    const path =
      'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';

    return (
      <>
        <View style={{marginTop: 45}}>
          <Button title="Free Text" onPress={this.onPressFreeText} />
        </View>
        <DocumentView
          ref={this.documentRef}
          document={path}
          showLeadingNavButton={true}
          hideToolbarsOnTap={false}
          hideTopAppNavBar={true}
          bottomToolbarEnabled={false}
          hideTopToolbars={true}
          leadingNavButtonIcon={
            Platform.OS === 'ios'
              ? 'ic_close_black_24px.png'
              : 'ic_arrow_back_white_24dp'
          }
          onLeadingNavButtonPressed={this.onLeadingNavButtonPressed}
        />
      </>
    );
  }
}
