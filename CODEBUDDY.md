# CODEBUDDY.md

This file provides essential context for Terminal Assistant Agent to operate effectively in this FinClip React Native demo repository.

## Project Overview

This is a React Native demo application showcasing FinClip (凡泰极客) mini-program integration. FinClip allows running WeChat-like mini-programs inside React Native applications using their SDK.

## Common Development Commands

### Build & Run
```bash
# Start Metro bundler
npm start

# Run on iOS
npm run ios

# Run on Android  
npm run android

# Run tests
npm test

# Lint code
npm run lint
```

### Platform-specific builds
- iOS: Use Xcode project at `ios/rnSDKDemo.xcodeproj/`
- Android: Use Gradle project in `android/` directory

## Architecture & Key Components

### Core Structure
- **App.js**: Main application component containing FinClip SDK initialization and demo UI
- **scanner.js**: QR code scanner component for opening mini-programs via QR codes
- **react-native-mopsdk**: Core FinClip SDK dependency

### FinClip SDK Integration Pattern

The app demonstrates a complete FinClip integration:

1. **SDK Initialization** (App.js:265-305):
   - Uses `FinStoreConfig` with API keys and server configuration
   - Configures language, user ID, debug mode via `Config` class
   - Sets UI customization via `UIConfig`
   - Initializes with `MopSDK.initSDK()`

2. **Mini-program Lifecycle Management**:
   - `openApplet()`: Opens specific mini-program by appletId
   - `closeApplet()`, `closeAllApplets()`: Close operations  
   - `clearApplets()`: Cache management
   - `finishRunningApplet()`: Force termination

3. **Custom API Registration**:
   - `registerAppletHandler()`: Handles mini-program events (forward, getUserInfo, custom menus)
   - `registerExtensionApi()`: Adds native APIs callable from mini-programs
   - `addWebExtentionApi()`: Adds WebView-specific APIs

4. **Communication Patterns**:
   - Native → Mini-program: `callJS()`, `sendCustomEvent()`
   - Mini-program → Native: Via registered handlers and extension APIs

### Key Configuration Values
- **API Server**: `https://api.finclip.com`
- **API Prefix**: `/api/v1/mop/`
- **Demo App ID**: `6260bf62e680b10001b1911f`
- **Demo Applet ID**: `5f17f457297b540001e06ebb`

### Dependencies Architecture
- **react-native-mopsdk**: FinClip SDK (v2.0.17)
- **react-native-camera**: Camera access for QR scanning
- **react-native-qrcode-scanner**: QR code scanning functionality
- **react-native-background-timer**: Background task management
- **react-native-permissions**: Permission handling

## Development Notes

### SDK Credentials
The demo includes hardcoded API keys and secrets for testing. In production:
- Obtain credentials from [FinClip platform](https://finclip.com)
- Register your app package name in FinClip console
- Replace demo credentials in initialization code

### Mini-program Testing
- Use provided demo mini-program IDs for testing
- QR code format: `https://api.finclip.com/api/v1/mop/runtime/applet/[encoded-applet-info]`
- Test both direct opening and QR code scanning workflows

### Platform Differences
- Some features are Android-only (e.g., `setActivityTransitionAnim`)
- iOS and Android have different native module integration patterns
- Background timer behavior varies between platforms

### Event Handling
The app uses React Native's `NativeEventEmitter` to handle SDK events. Key event types include mini-program lifecycle events and custom events from mini-programs.