// import { useState, useEffect, useRef } from 'react';
// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View, Button, Platform } from 'react-native';
// import * as Device from 'expo-device';
// import * as Notifications from 'expo-notifications';
// import Constants from 'expo-constants';

// // This handler determines how your app handles notifications that come in while the app is foregrounded.
// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });

// // Can use this function below or use Expo's Push Notification Tool from: https://expo.dev/notifications
// async function sendPushNotification(expoPushToken: string) {
//   const message = {
//     to: expoPushToken,
//     sound: 'default',
//     title: 'Original Title',
//     body: 'And here is the body!',
//     data: { someData: 'goes here' },
//   };

//   await fetch('https://exp.host/--/api/v2/push/send', {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Accept-encoding': 'gzip, deflate',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(message),
//   });
// }

// async function registerForPushNotificationsAsync() {
//   let token;

//   if (Platform.OS === 'android') {
//     Notifications.setNotificationChannelAsync('default', {
//       name: 'default',
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: '#FF231F7C',
//     });
//   }

//   if (Device.isDevice) {
//     const { status: existingStatus } =
//       await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== 'granted') {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== 'granted') {
//       alert('Failed to get push token for push notification!');
//       return;
//     }
//     token = await Notifications.getExpoPushTokenAsync({
//       projectId: Constants.expoConfig?.extra?.eas.projectId,
//     });
//     console.log(token);
//   } else {
//     alert('Must use physical device for Push Notifications');
//   }

//   return token?.data;
// }

// function PushNotificationTest() {
//   const [expoPushToken, setExpoPushToken] = useState('');
//   const [notification, setNotification] =
//     useState<Notifications.Notification>();
//   const notificationListener = useRef<Notifications.Subscription>();
//   const responseListener = useRef<Notifications.Subscription>();

//   useEffect(() => {
//     registerForPushNotificationsAsync().then(
//       token => token && setExpoPushToken(token),
//     );

//     notificationListener.current =
//       Notifications.addNotificationReceivedListener(notification => {
//         setNotification(notification);
//       });

//     responseListener.current =
//       Notifications.addNotificationResponseReceivedListener(response => {
//         console.log(response);
//       });

//     return () => {
//       if (notificationListener.current)
//         Notifications.removeNotificationSubscription(
//           notificationListener.current,
//         );
//       if (responseListener.current)
//         Notifications.removeNotificationSubscription(responseListener.current);
//     };
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text>Your expo push token: {expoPushToken}</Text>
//       <View style={{ alignItems: 'center', justifyContent: 'center' }}>
//         <Text>Title: {notification?.request.content.title}</Text>
//         <Text>Body: {notification?.request.content.body}</Text>
//         <Text>Data: {JSON.stringify(notification?.request.content.data)}</Text>
//       </View>
//       <Button
//         title="Press to Send Notification"
//         onPress={async () => {
//           await sendPushNotification(expoPushToken);
//         }}
//       />
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// export default PushNotificationTest;
