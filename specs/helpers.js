const firebase = require("@firebase/testing");
const fs = require("fs");

module.exports.setup = async (auth, data) => {
  // Initialize firebase test application.
  const projectId = `firebase-rules-${Date.now()}`;
  const app = await firebase.initializeTestApp({
    projectId,
    auth,
  });

  const db = app.firestore();

  if (data) {
    // adding mock data
    for (const key in data) {
      const ref = db.doc(key); // Creating a key, id
      await ref.set(data[key]); // Adding the data on that key
    }
  }

  // Loading Firebase Rules
  await firebase.loadFirestoreRules({
    projectId,
    rules: fs.readFileSync("firestore.rules", "utf-8"),
  });

  return db;
};

// Cleans up firebase all apps
module.exports.teardown = async () => {
  await Promise.all(firebase.apps().map((app) => app.delete()));
};
