<template>
  <v-list-item class="px-6">
    <div class="d-flex ga-2 align-center">
      <InteractionInput
        @selection="onSelection"
        :current-selection="currentSelection?.type"
        :disabled="!loggedIn"
      />
      <InteractionView v-if="interactions" :interactions="interactions" />
    </div>
  </v-list-item>
</template>

<script setup lang="ts">
import type { EventDocument, InteractionCollection } from "~/rxdb/types";

const props = defineProps<{ event: EventDocument }>();

const query = computed(() => {
  const deps = [props.event.interactions];
  return (collection: InteractionCollection) =>
    collection.find({
      selector: {
        id: { $in: props.event.interactions },
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

      // Remove reference from event.
      await props.event.patch({
        interactions: [
          ...props.event.interactions.filter((id) => id != removed.id),
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

    // Add interaction to event.
    await props.event.patch({
      interactions: [...props.event.interactions, newInteraction.id],
    });
  }
}
</script>
