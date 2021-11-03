const firebase = require("@firebase/testing");

expect.extend({
  async toAllow(res) {
    let pass = false;

    try {
      await firebase.assertSucceeds(res);
      pass = true;
    } catch {}

    return {
      pass,
      message: () =>
        "Expected Firebase operation to be allowed, but was not allowed",
    };
  },
});

expect.extend({
  async toDeny(res) {
    let pass = false;

    try {
      await firebase.assertFails(res);
      pass = true;
    } catch {}

    return {
      pass,
      message: () =>
        "Expected Firebase operation to be denied, but was allowed.",
    };
  },
});
