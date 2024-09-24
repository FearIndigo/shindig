<template>
  <div>
    <h4>Add comment</h4>

    <v-form ref="form" v-model="valid" @submit.prevent="submit">
      <v-text-field
        v-model="comment.message"
        :rules="[formRules.required]"
        label="Description"
      />

      <v-btn type="submit" color="primary" block>Add Comment</v-btn>
    </v-form>
  </div>
</template>

<script setup lang="ts">
import type { CommentType, EventDocument } from "~/rxdb/types";

const { event } = defineProps<{ event: EventDocument }>();

const valid = ref();
const form = ref(null);

const session = await useSessionData();
const userId = session.passport?.user.id ?? "";

const comment = ref<CommentType>({
  id: uuidv4(),
  authorId: userId,
  message: "",
  interactions: [],
  createdAt: 0, // Will be updated by middleware.
});

async function submit() {
  if (!valid.value) return;

  const db = await useRxDB();

  const newComment = await db.comments.insert(toRaw(comment.value));

  // Add new comment to event.
  await event.incrementalPatch({
    comments: [...event.comments, newComment.id],
  });

  // Reset form.
  comment.value = {
    id: uuidv4(),
    authorId: userId,
    message: "",
    interactions: [],
    createdAt: 0,
  };

  form.value.resetValidation();
}
</script>
