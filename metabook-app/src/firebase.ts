import shimFirebasePersistence from "firebase-react-native-persistence-shim";
import firebase from "firebase/app";
import "firebase/firestore";

let app: firebase.app.App | null = null;
export function getFirebaseApp(): firebase.app.App {
  if (!app) {
    app = firebase.initializeApp({
      apiKey: "AIzaSyAwlVFBlx4D3s3eSrwOvUyqOKr_DXFmj0c",
      authDomain: "metabook-system.firebaseapp.com",
      databaseURL: "https://metabook-system.firebaseio.com",
      projectId: "metabook-system",
      storageBucket: "metabook-system.appspot.com",
      messagingSenderId: "748053153064",
      appId: "1:748053153064:web:efc2dfbc9ac11d8512bc1d",
    });

    shimFirebasePersistence("");
  }
  return app;
}

export type PersistenceStatus = "pending" | "enabled" | "unavailable";
let persistenceStatus: PersistenceStatus = "pending";
export async function enableFirebasePersistence(): Promise<PersistenceStatus> {
  if (persistenceStatus !== "pending") {
    return persistenceStatus;
  }

  return getFirebaseApp()
    .firestore()
    .enablePersistence()
    .then(() => {
      persistenceStatus = "enabled";
      console.log("Enabled persistence");
      return persistenceStatus;
    })
    .catch((error) => {
      console.error("Couldn't enable persistence", error);
      persistenceStatus = "unavailable";
      return persistenceStatus;
    });
}