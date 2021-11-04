const { assertFails, assertSucceeds } = require("@firebase/testing");
const { setup, teardown } = require("./utils/helpers");

require("./utils/extensions");

describe("Database rules", () => {
  let db;
  /** @type {firebase.firestore.CollectionReference} */
  let ref;

  beforeAll(async () => {
    db = await setup();
    ref = db.collection("test");
  });

  afterAll(async () => {
    await teardown();
  });

  test("fail when reading", async () => {
    // expect(await assertFails(ref.get()));
    expect(await assertFails(ref.get()));

    // await expect(ref.get()).toAllow();
    await expect(ref.get()).toDeny();
  });
});
