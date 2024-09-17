import type { RxCollection, RxReplicationPullStreamItem } from "rxdb";
import type { Database, CheckpointType } from "../types";
import { Subject } from "rxjs";
import { replicateRxCollection } from "rxdb/plugins/replication";

export default function replicateServer(db: Database) {
  const commentReplicationState = addReplication(db.comments, "/comment/0");
  const eventReplicationState = addReplication(db.events, "/event/0");
  const interactionReplicationState = addReplication(
    db.interactions,
    "/interaction/0"
  );
  const responseReplicationState = addReplication(db.responses, "/response/0");
  const userReplicationState = addReplication(db.users, "/user/0");
}

function addReplication<DocType>(
  collection: RxCollection<DocType>,
  path: string
) {
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiBase + path;

  const pullStream$ = new Subject<
    RxReplicationPullStreamItem<DocType, CheckpointType>
  >();
  let firstOpen = true;
  function connectEventSource() {
    const eventSource = new EventSource(`${baseUrl}/pullStream`, {
      withCredentials: true,
    });

    eventSource.onmessage = (ev) => pullStream$.next(ev.data);
    eventSource.onerror = () => eventSource.close();
    eventSource.onopen = () => {
      if (firstOpen) {
        firstOpen = false;
      } else {
        pullStream$.next("RESYNC");
      }
    };
  }
  connectEventSource();

  const replicationState = replicateRxCollection<DocType, CheckpointType>({
    collection,
    replicationIdentifier: `replication-${baseUrl}`,
    push: {
      async handler(docs) {
        const rawResponse = await fetch(`${baseUrl}/push`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ docs }),
        });
        const response = await rawResponse.json();
        return response;
      },
    },
    pull: {
      async handler(lastCheckpoint, batchSize) {
        const minTimestamp = lastCheckpoint ? lastCheckpoint.lwt : 0;
        const rawResponse = await fetch(
          `${baseUrl}/pull?lwt=${minTimestamp}&limit=${batchSize}`
        );
        const response = await rawResponse.json();
        return response;
      },
      stream$: pullStream$.asObservable(),
    },
  });

  return replicationState;
}
