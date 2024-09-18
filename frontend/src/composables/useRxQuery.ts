import type { RxCollection, RxQuery } from "rxdb";
import type { DatabaseCollections } from "~/rxdb/types";

export default async function useRxQuery<DocType, ReturnType>(
  collectionName: keyof DatabaseCollections,
  queryBuilder: (
    collection: RxCollection<DocType>
  ) => RxQuery<DocType, ReturnType>
) {
  const db = await useRxDB();
  const getKeyValue = <T extends object>(obj: T, key: keyof T) => obj[key];
  const collection = getKeyValue(db.collections, collectionName);
  const query = queryBuilder(collection as RxCollection<DocType>);
  const result = useObservable(query.$);
  return result;
}
