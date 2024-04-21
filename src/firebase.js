import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDrtYQgF76-uDJVBLerTsfk6iW89lpkXyc",
  authDomain: "todo-auth-task.firebaseapp.com",
  projectId: "todo-auth-task",
  storageBucket: "todo-auth-task.appspot.com",
  messagingSenderId: "923370605794",
  appId: "1:923370605794:web:de8594ab3e11e497c9e2bb"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
