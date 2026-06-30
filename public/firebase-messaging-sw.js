importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyDDAvbzNlznHo8ngBrDWO-qwTYgZZryEOo",
  authDomain: "sendnaw-technologies.firebaseapp.com",
  projectId: "sendnaw-technologies",
  storageBucket: "sendnaw-technologies.firebasestorage.app",
  messagingSenderId: "434841053818",
  appId: "1:434841053818:web:2037a0178856ff3cb2a9c3"
};

firebase.initializeApp(firebaseConfig);  // ← no "const firebaseApp = self.firebase"
const messaging = firebase.messaging();  // ← just use firebase directly

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || 'New Notification';
  const options = {
    body: payload.notification?.body || '',
    icon: '/logo.png',
  };
  self.registration.showNotification(title, options);
});