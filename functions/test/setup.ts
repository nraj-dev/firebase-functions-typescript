import * as functions from "firebase-functions-test";
import * as path from "path";

// TODO add project information here
const projectConfig = {
  databaseURL: "https://fir-functions-typescript-4a57c.firebaseio.com",
  storageBucket: "[your-project].appspot.com",
  projectId: "fir-functions-typescript-4a57c"
};

export function initializeTest() {
  return functions(
    projectConfig,
    // Generate new file https://console.firebase.google.com/project/[your-project]/settings/serviceaccounts/adminsdk
    path.join("/firebase-functions-typescript/", "fir-functions-typescript-4a57c-firebase-adminsdk-6231k-7c5dc1cad5.json")
  );
}

export function initializeOfflineTest() {
  return functions();
}
