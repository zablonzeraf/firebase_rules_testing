/** @see {@link {https://dev.to/clarity89/testing-firestore-locally-with-firebase-emulators-2p1j}} */
/** @see {@link {https://firebase.google.com/docs/rules/unit-tests#firestore}} */
/** @see {@link {https://fireship.io/lessons/testing-firestore-security-rules-with-the-emulator/}} */

const { assertFails, assertSucceeds } = require("@firebase/testing");
const { setup, teardown } = require("./utils/helpers");
const { COLLECTION_NAME } = require("./utils/constants");
const operations = require("./utils/operations");

require("./utils/extensions");

const userId = "jeffd23";
const mockData = {
  "users/jeffd23": {
    roles: {
      admin: true,
    },
  },
  "projects/testId": {
    members: ["bob"],
  },
};

describe("Firebase Operations", () => {
  /** @type {firebase.firestore.Firestore} */
  let db;
  /** @type {firebase.firestore.CollectionReference} */
  let ref;

  beforeAll(async () => {
    db = await setup({ uid: userId }, mockData);
    ref = db.collection(COLLECTION_NAME);
  });

  afterAll(async () => {
    await teardown();
  });

  test("Should retrive all items", async () => {
    const resp = await operations.listItems(userId);
  });
});
