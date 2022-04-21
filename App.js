/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import type {Node} from 'react';
import BackgroundTimer from 'react-native-background-timer';

const appId = '6260bf62e680b10001b1911f';
import MopSDK from 'react-native-mopsdk';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  Button,
  View,
  Platform,
  NativeModules,
  Alert,
  NativeEventEmitter,
} from 'react-native';

import ScanScreen from './scanner.js';

let isInited = false;

const openApplet = () => {
  MopSDK.openApplet({appId});
};

const getCurrentApplet = callback => {
  let time = 0;
  BackgroundTimer.runBackgroundTimer(() => {
    if (time === 0) {
      console.log('getCurrentApplet call');
      MopSDK.currentApplet().then(res => {
        console.log('currentApplet', res);
        callback(JSON.stringify(res));
      });
      time++;
    }
  }, 10000);
};

const closeApplet = () => {
  let time = 0;
  BackgroundTimer.runBackgroundTimer(() => {
    if (time === 0) {
      console.log('closeApplet call');
      MopSDK.closeApplet(appId, true);
      time++;
    }
  }, 10000);
};

const closeAllApplets = () => {
  let time = 0;
  BackgroundTimer.runBackgroundTimer(() => {
    if (time === 0) {
      Alert.alert('closeAllApplets call');
      MopSDK.closeAllApplets();
      time++;
    }
  }, 10000);
};

const qrcodeOpenApplet = qrcode => {
  console.warn('当前扫码', qrcode);

  console.log('qrcodeOpenApplet call');
  MopSDK.qrcodeOpenApplet(qrcode);
};

const clearApplets = () => {
  console.log('clearApplets call');
  MopSDK.clearApplets();
};

const registerAppletHandler = () => {
  const handler = {
    forwardApplet(params) {
      console.log('forwardApplet call', params);
      return [];
    },
    getUserInfo(params) {
      console.log('getUserInfo call', params);
      return {
        name: 'jimmy',
        nickName: 'jimmy 123',
        avatarUrl:
          'https://img9.doubanio.com/view/subject/s/public/s34197964.jpg',
      };
    },
    getCustomMenus(params) {
      console.log('getCustomMenus call');
      let list = [
        {
          menuId: 'menuid1',
          image: 'image',
          title: 'title',
          type: 'type',
          foo: 'foo',
        },
        {
          menuId: 'menuid2',
          image: 'image',
          title: 'title',
          type: 'type',
          foo: 'foo',
        },
        {
          menuId: 'menuid2',
          image: 'image',
          title: 'title',
          type: 'type',
          foo: 'foo',
        },
        {
          menuId: 'menuid4',
          image: 'image',
          title: 'title',
          type: 'type',
          foo: 'foo',
        },
      ];
      return list;
    },
    onCustomMenuClick(params) {
      console.log('onCustomMenuClick', params);
    },
    appletDidOpen(params) {
      console.log('appletDidOpen', params);
      return params;
    },
  };
  MopSDK.registerAppletHandler(handler);
};

const addWebExtentionApi = () => {
  console.log('addWebExtentionApi call');
  const rnWebCustomAPI = params => {
    console.warn('webview 自定义api rnWebCustomAPI call', params);
    return {
      errMsg: 'rnWebCustomAPI:ok',
      data: 'customAPI',
    };
  };
  MopSDK.addWebExtentionApi('rnWebCustomAPI', rnWebCustomAPI);
};

const registerExtensionApi = () => {
  console.log('registerExtensionApi call');
  const rnCustomAPI = params => {
    console.warn('自定义 api rn rnCustomAPI call', params);
    return {
      errMsg: 'rnCustomAPI:ok',
      data: 'webCustomAPI',
    };
  };
  MopSDK.registerExtensionApi('rnCustomAPI', rnCustomAPI);
};

const callJS = () => {
  if (Platform.OS !== 'android') {
    let time = 0;
    BackgroundTimer.runBackgroundTimer(() => {
      if (time === 0) {
        console.warn('ios calljs 执行');
        MopSDK.callJS(appId, 'app2jsFunction', {
          data: 100,
        })
          .then(res => {
            Alert.alert('calljs 调用成功');
            console.warn('calljs 调用成功', res);
          })
          .catch(res => {
            Alert.alert('calljs 失败');
            console.warn('calljs 调用失败', res);
          });
        time++;
      }
    }, 10000);
  } else {
    MopSDK.callJS(appId, 'app2jsFunction', {
      data: 100,
    })
      .then(res => {
        console.warn('calljs 调用成功', res);
      })
      .catch(res => {
        console.warn('calljs 调用失败', res);
      });
  }
};

const sendCustomEvent = () => {
  console.warn('sendCustomEvent call');
  MopSDK.sendCustomEvent(appId, {
    evenatName: 'hello-world',
    foo: 'test',
  });
};

const finishRunningApplet = () => {
  Alert.alert('finishRunningApplet');
  console.warn('结束运行的小程序');
  MopSDK.finishRunningApplet(appId, true);
};

const setActivityTransitionAnim = () => {
  if (Platform.OS !== 'android') {
    console.warn('仅安卓支持');
    return;
  }
  console.log('setActivityTransitionAnim call');
  MopSDK.setActivityTransitionAnim('SlideFromBottomToTopAnim');
};
const App: () => Node = () => {
  const [isShowScaner, setIsShowScaner] = useState(false);
  const [qrcode, setQrcode] = useState('');
  const [appInfo, setAppInfo] = useState('');
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    if (!isInited) {
      const eventEmitter = new NativeEventEmitter(NativeModules.FINMopSDK);
      MopSDK.initialize({
        appkey:
          'Ev7QHvml1UcW98Y1GaLfRz34ReffbDESaTXbCoFyKhEm0a3gam0elOOOdZ6Twpa3HkBzlvOwJ2cyhOrMVWuuGw==',
        secret: '16f2d2700453ae51',
        apiServer: 'https://api.finclip.com',
        apiPrefix: '/api/v1/mop/',
        nativeEventEmitter: eventEmitter,
        finMopSDK: NativeModules.FINMopSDK,
      })
        .then(res => {
          isInited = true;
          Alert.alert('初始化成功');
        })
        .catch(error => {
          Alert.alert('初始化失败');
        });
    }
  });

  const handleSetIsShowScaner = status => {
    setIsShowScaner(status);
  };

  const handleQRCodeResult = str => {
    setQrcode(str);
    qrcodeOpenApplet(str);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <ScanScreen
          isShowScaner={isShowScaner}
          handler={handleSetIsShowScaner}
          getQRCodeResult={handleQRCodeResult}
        />
        <View>
          <Text style={styles.mainTitle}> React Native SDK Demo</Text>
          <Text style={styles.subTitle}>打开小程序</Text>
          <Button title="打开小程序" onPress={openApplet} />

          <Button
            title="查看小程序当前信息"
            onPress={() => {
              getCurrentApplet(setAppInfo);
            }}
          />
          <Text style={styles.padding}>小程序当前信息为: {appInfo}</Text>
          <Button
            title="扫码打开小程序"
            onPress={() => {
              setIsShowScaner(!isShowScaner);
            }}
          />
        </View>
        <View>
          <Text style={styles.subTitle}>关闭/结束</Text>
          <Button title="关闭小程序" onPress={closeApplet} />
          <Button title="关闭所有小程序" onPress={closeAllApplets} />
          <Button title="清除缓存小程序" onPress={clearApplets} />
          <Button title="结束小程序" onPress={finishRunningApplet} />
        </View>
        <View>
          <Text style={styles.subTitle}>注册 API</Text>
          <Button title="注册小程序事件处理" onPress={registerAppletHandler} />
          <Button title="注册小程序扩展 api" onPress={registerExtensionApi} />
          <Button title="注册 webview 扩展 api" onPress={addWebExtentionApi} />
        </View>
        <View>
          <Text style={styles.subTitle}>其他</Text>
          <Button title="原生调用 webview 中的 js 方法" onPress={callJS} />
          <Button title="原生发送事件给小程序" onPress={sendCustomEvent} />
          <Button
            title="设置小程序切换动画（仅安卓）"
            onPress={setActivityTransitionAnim}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 60,
  },
  padding: {
    padding: 20,
  },
  subTitle: {
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
});

export default App;
