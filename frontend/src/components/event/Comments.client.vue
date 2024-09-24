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
import type { CommentType, CommentDocument, EventDocument } from "~/rxdb/types";

const { event } = defineProps<{ event: EventDocument }>();

const query = computed(() => {
  return (collection) =>
    collection.find({
      selector: {
        id: { $in: event.comments },
      },
      sort: [{ createdAt: "desc" }],
    });
});

const comments = await useRxQuery<CommentType, CommentDocument[]>(
  "comments",
  query
);

const session = await useSessionData();
const loggedIn = session.passport?.user != null;
</script>
