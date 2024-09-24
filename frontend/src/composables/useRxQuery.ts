import type { RxCollection, RxQuery } from "rxdb";
import type { WatchSource } from "vue";
import type { DatabaseCollections } from "~/rxdb/types";

export default async function useRxQuery<DocType, ReturnType>(
  collectionName: keyof DatabaseCollections,
  queryBuilder: WatchSource<
    (collection: RxCollection<DocType>) => RxQuery<DocType, ReturnType>
  >
) {
  const db = await useRxDB();
  const getKeyValue = <T extends object>(obj: T, key: keyof T) => obj[key];
  const collection = getKeyValue(db.collections, collectionName);
  const result = ref<ReturnType>();

  watchExtractedObservable(
    queryBuilder,
    (qBuilder) => qBuilder(collection as RxCollection<DocType>).$,
    (response) => {
      result.value = response;
    },
    {},
    { immediate: true }
  );

  return result;
}
