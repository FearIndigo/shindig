<template>
  <div class="d-flex ga-2 align-center">
    <InteractionInput
      @on-selection="onSelection"
      :current-selection="currentSelection?.type"
      :disabled="!loggedIn"
    />
    <InteractionView v-if="interactions" :interactions="interactions" />
  </div>
</template>

<script setup lang="ts">
import type { CommentDocument, InteractionCollection } from "~/rxdb/types";

const props = defineProps<{ comment: CommentDocument }>();

const query = computed(() => {
  const deps = [props.comment.interactions];
  return (collection: InteractionCollection) =>
    collection.find({
      selector: {
        id: { $in: props.comment.interactions },
      },
    });
});

const interactions = await useRxQuery("interactions", query);

const session = await useSessionData();
const user = session.passport?.user;
const loggedIn = user != null;

const currentSelection = computed(() =>
  interactions.value?.find((i) => i.userId == user?.id)
);

async function onSelection(
  type: "Like" | "Love" | "Care" | "Haha" | "Wow" | "Sad" | "Angry"
) {
  if (currentSelection.value) {
    if (currentSelection.value.type == type) {
      // Remove interaction.
      const removed = await currentSelection.value.remove();

      // Remove reference from comment.
      await props.comment.patch({
        interactions: [
          ...props.comment.interactions.filter((id) => id != removed.id),
        ],
      });
    } else {
      // Update interaction type.
      await currentSelection.value.patch({
        type,
      });
    }
  } else if (user) {
    const db = await useRxDB();

    // Create new interaction.
    const newInteraction = await db.interactions.insert({
      id: uuidv4(),
      userId: user.id,
      type,
    });

    // Add interaction to comment.
    await props.comment.patch({
      interactions: [...props.comment.interactions, newInteraction.id],
    });
  }
}
</script>
