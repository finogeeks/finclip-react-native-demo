import React, {Component} from 'react';

import {StyleSheet, ScrollView, SafeAreaView, Button, View} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

class ScanScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkPermission: true,
    };
  }
  onSuccess = e => {
    this.props.getQRCodeResult(e.data);
    this.props.handler(false);
  };

  render() {
    return this.props.isShowScaner ? (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <QRCodeScanner
            onRead={this.onSuccess}
            flashMode={RNCamera.Constants.FlashMode.auto}
            checkAndroid6Permissions={this.state.checkPermission}
            bottomContent={
              <View style={styles.marginTop}>
                <Button
                  title="退出扫码"
                  onPress={() => {
                    this.props.handler(false);
                  }}
                />
              </View>
            }
          />
        </ScrollView>
      </SafeAreaView>
    ) : null;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    // position: 'absolute',
    width: '100%',
    height: '100%',
    // top: 0,
    // left: 0,
    // zIndex: 10,
    justifyContent: 'center',
  },
  marginTop: {
    marginTop: 30,
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});

export default ScanScreen;
