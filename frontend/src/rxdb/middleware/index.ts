import type { RxCollection } from "rxdb";

export default function addCollectionMiddleware(collection: RxCollection) {
  collection.preInsert(function (data) {
    // Set updatedAt on new documents.
    data.updatedAt = Date.now();

    // Set updatedAt on new documents that support it.
    if (Object.hasOwn(data, "createdAt")) {
      data.createdAt = Date.now();
    }
  }, true);

  collection.preSave(function (data) {
    // Set updatedAt when updating documents.
    data.updatedAt = Date.now();
  }, true);
}
