import * as firebaseAdmin from "firebase-admin";

if (!firebaseAdmin.apps.length) {
  // set variables in next.config.js or on enviroment variables
  // when app is in production mode
  const firebaseServiceAccountKey = {
    type: "service_account",
    project_id: "cirklebr",
    private_key_id: "6af214a0c4f8955cf9dddf909dae1cfe82e0fcc1",
    private_key: process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, "\n"),
    client_email: "firebase-adminsdk-o1rpm@cirklebr.iam.gserviceaccount.com",
    client_id: "110635396892820934900",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-o1rpm%40cirklebr.iam.gserviceaccount.com",
  };

  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(
      JSON.parse(JSON.stringify(firebaseServiceAccountKey))
    ),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
}

export default firebaseAdmin;
