const { NotFound } = require("http-errors");
const { COLLECTION_NAME } = require("./constants");

/** @type {firebase.firestore.Firestore} */
let db;

module.exports.listItems = async (userId) => {
  try {
    const collection = await db.collection(COLLECTION_NAME);
    let snapshot;

    if (userId) {
      snapshot = await collection.where("userId", "==", userId).get();
    } else {
      snapshot = await collection.get();
    }

    let results = [];
    snapshot.forEach((doc) => {
      const { name, created, type, description, url } = doc.data();

      results.push({
        name,
        created,
        type,
        description,
        url,
        id: doc.id,
      });
    });

    return results;
  } catch (e) {
    throw e;
  }
};

module.exports.getItem = async (itemId, userId) => {
  try {
    const snapshot = await db.collection(COLLECTION_NAME).doc(itemId).get();

    const data = snapshot.data();

    if (!data || data.userId !== userId) {
      throw new NotFound("Item not found");
    }

    return data;
  } catch (e) {
    throw e;
  }
};

module.exports.createItem = async (newRecord) => {
  try {
    const addDoc = db.collection(COLLECTION_NAME).add(newRecord);
    return { id: addDoc.id, ...newRecord };
  } catch (e) {
    throw e;
  }
};

module.exports.updateItem = async (itemId, data) => {
  try {
    const itemRef = db.collection(COLLECTION_NAME).doc(itemId);
    const item = await itemRef.get();

    if (!item.exists) {
      throw new NotFound("Item not found");
    }

    const newRecord = {
      ...data,
      updated: new Date().toUTCString(),
    };

    await itemRef.update(newRecord);
  } catch (e) {
    throw e;
  }
};

module.exports.deleteItem = async (itemId) => {
  try {
    const docRef = db.collection(COLLECTION_NAME).doc(itemId);
    const docSnap = await docRef.get();

    if (!docSnap.data()) {
      throw new NotFound("No record found");
    }

    await docRef.delete();
    return { status: "Ok" };
  } catch (e) {
    throw e;
  }
};
