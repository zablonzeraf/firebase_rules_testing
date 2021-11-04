const { setup, teardown } = require("./utils/helpers");

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

describe("Admin only access", () => {
  let projectRef;

  afterAll(async () => {
    await teardown();
  });

  test("Deny a user without admin roles", async () => {
    const db = await setup({ uid: "notjeff" }, mockData);
    projectRef = db.doc("projects/testId");

    await expect(projectRef.get()).toDeny();
  });

  test("allow user with admin roles", async () => {
    const db = await setup({ uid: userId }, mockData);

    projectRef = db.doc("projects/testId");
    await expect(projectRef.get()).toAllow();
  });

  test("deny a user if not on the access control list", async () => {
    const db = await setup({ uid: "franku" }, mockData);
    projectRef = db.doc("projects/testId");
    await expect(projectRef.get()).toDeny();
  });

  test("Allow if a user is in the access control list", async () => {
    const db = await setup({ uid: "bob" }, mockData);
    projectRef = db.doc("projects/testId");
    await expect(projectRef.get()).toAllow();
  });
});
