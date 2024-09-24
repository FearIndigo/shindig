<template>
  <div>
    <h4>Add comment</h4>

    <v-form ref="form" v-model="valid" @submit.prevent="submit">
      <v-text-field
        v-model="message"
        :rules="[formRules.required]"
        label="Message"
      />

      <v-btn type="submit" color="primary" block>Add Comment</v-btn>
    </v-form>
  </div>
</template>

<script setup lang="ts">
import type { EventDocument } from "~/rxdb/types";

const props = defineProps<{ event: EventDocument }>();

const valid = ref();
const form = ref(null);

const session = await useSessionData();
const userId = session.passport?.user.id ?? "";

const message = ref("");

async function submit() {
  if (!valid.value) return;

  const db = await useRxDB();

  const newComment = await db.comments.insert({
    id: uuidv4(),
    authorId: userId,
    message: message.value,
    interactions: [],
    createdAt: 0,
  });

  // Add new comment to event.
  await props.event.incrementalPatch({
    comments: [...props.event.comments, newComment.id],
  });

  // Reset form.
  form.value.reset();
}
</script>
