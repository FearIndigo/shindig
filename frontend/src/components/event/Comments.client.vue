<template>
  <v-sheet elevation="1" rounded>
    <h3 class="pa-6">Comments</h3>

    <FormAddCommentForm v-if="loggedIn" :event="event" class="px-6 pb-6" />

    <v-divider></v-divider>

    <div>
      <CommentList v-if="comments" :comments="comments" />
    </div>
  </v-sheet>
</template>

<script setup lang="ts">
import type { EventDocument, CommentCollection } from "~/rxdb/types";

const props = defineProps<{ event: EventDocument }>();

const query = computed(() => {
  // TODO: see if there is a better way to register the dependency.
  const deps = [props.event.comments];
  return (collection: CommentCollection) =>
    collection.find({
      selector: {
        id: { $in: props.event.comments },
      },
      sort: [{ createdAt: "desc" }],
    });
});

const comments = await useRxQuery("comments", query);

const session = await useSessionData();
const loggedIn = session.passport?.user != null;
</script>
