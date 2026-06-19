import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// Your Firebase config (from Firebase Console > Project settings)
const firebaseConfig = {
  apiKey: "AIzaSyDDAvbzNlznHo8ngBrDWO-qwTYgZZryEOo",
  authDomain: "sendnaw-technologies.firebaseapp.com",
  projectId: "sendnaw-technologies",
  storageBucket: "sendnaw-technologies.firebasestorage.app",
  messagingSenderId: "434841053818",
  appId: "1:434841053818:web:2037a0178856ff3cb2a9c3",
  measurementId: "G-KHCRQF5B7P"
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const requestFCMToken = async () => {
    try {
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') return null;

        const token = await getToken(messaging, {
            vapidKey: 'BML7tOwSxQ0zI-t4245DeLjanygU9sJsAQ37Nh8K7KfaDojR1JfKeGTG_LcfoBsd1nIqcsuPU4Ns-O4W3_M2S0w'  // from Firebase Console > Cloud Messaging
        });
        if (token) {
            console.log('FCM Token:', token);
            return token;
        }
        return null;
    } catch (err) {
        console.error(err);
        return null;
    }
};

export const onForegroundMessage = (callback) => {
    onMessage(messaging, (payload) => {
        callback(payload);
    });
};