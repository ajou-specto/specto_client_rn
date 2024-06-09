/* webview로 multipart/form-data api 요청 테스트 위함 */
// import React, { useEffect, useRef, useState } from "react";
// import { Platform, View } from "react-native";
// import { WebView } from "react-native-webview";
// import { NativeStackScreenProps } from "@react-navigation/native-stack";
// import * as SecureStore from "expo-secure-store";
// import { RootStackParamList } from "AppInner";
// import { CompositeScreenProps } from "@react-navigation/native";
// import { ActivityAddScreenStackParamList } from "@stackNav/ActivityAddScreen";

// type ActivityProps = NativeStackScreenProps<
//   ActivityAddScreenStackParamList,
//   "SpecSend"
// >;
// type RootProps = NativeStackScreenProps<RootStackParamList>;
// type Props = CompositeScreenProps<ActivityProps, RootProps>;

// export default function SpecSend({ navigation, route }: Readonly<Props>) {
//   //   const { specPostReq, fileBase64, fileName } = route.params;
//   const { specPostReq, fileUri, fileName } = route.params;
//   const webviewRef = useRef<WebView | null>(null);

//   //   const injectedJavaScript = `
//   //         window.addEventListener("message", (e) => {
//   //             const data = JSON.parse(e.data);
//   //             const { specPostReq, documentation } = data;
//   //             postData(specPostReq, documentation);
//   //         });

//   //         async function postData(specPostReq, documentation) {
//   //             const formData = new FormData();
//   //             const blob = new Blob([JSON.stringify(specPostReq)], {
//   //                 type: "application/json",
//   //             });
//   //             formData.append("specPostReq", blob);
//   //             if (documentation) {
//   //                 formData.append("documentation", documentation);
//   //             }

//   //             try {
//   //                 const res = await fetch("http://localhost:8080/api/v1/spec", {
//   //                     method: "POST",
//   //                     body: formData,
//   //                     headers: {
//   //                     // "Content-Type": "multipart/form-data",
//   //                     Authorization:
//   //                         "Bearer eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InhrcWpzc2xzZWs4MEBuYXZlci5jb20iLCJpYXQiOjE3MTY3MTYxNDksImV4cCI6MTcxNjcxNzk0OSwidHlwZSI6ImFjY2VzcyJ9.SmL7_PIhqKqaZjNfp7-0BPjQ7K7aWHdVa6HC8jJQpt8",
//   //                     },
//   //                 });
//   //                 console.log("/api/v1/spec", res);

//   //                 if (window.ReactNativeWebView) {
//   //                     window.ReactNativeWebView.postMessage("success");
//   //                 }
//   //             } catch (error) {
//   //                 console.error("Error 에러:", error);
//   //             }
//   //         }
//   //     `;

//   const [ac, setAc] = useState("");
//   useEffect(() => {
//     const getAc = async () => {
//       const accessToken = await SecureStore.getItemAsync("accessToken");
//       setAc(accessToken ?? "");
//     };
//     getAc();
//   }, []);

//   return (
//     <View style={{ flex: 1, marginTop: 24, backgroundColor: "#fff" }}>
//       <WebView
//         ref={webviewRef}
//         style={{ flex: 1 }}
//         originWhitelist={["*"]}
//         scalesPageToFit={false}
//         source={{
//           //   uri: `https://spectacle-specto.vercel.app/specSend?specPostReq=${JSON.stringify(
//           //     specPostReq
//           //   )}&fileUri=${fileUri}&fileName=${fileName}&ac=${ac}&platform=${
//           //     Platform.OS
//           //   }`,
//           uri: `http://localhost:3000/specSend?specPostReq=${JSON.stringify(
//             specPostReq
//           )}&fileUri=${fileUri}&fileName=${fileName}&ac=${ac}&platform=${
//             Platform.OS
//           }`,
//         }}
//         // injectedJavaScript={injectedJavaScript}
//         // javaScriptEnabled={true}
//         // onMessage={(event) => {
//         //   console.log("event.nativeEvent.data", event.nativeEvent.data);
//         // }}
//         // onLoad={() => {
//         //   if (!webviewRef.current) return;
//         //   webviewRef.current.postMessage(
//         //     JSON.stringify({ specPostReq, documentation })
//         //   );
//         // }}
//       />
//     </View>
//   );
// }
