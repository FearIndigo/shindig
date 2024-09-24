<template>
  <v-list-item class="px-6">
    <div class="d-flex ga-2">
      <v-icon icon="mdi-account-star-outline"></v-icon>
      <span>{{ hostsText }}</span>
    </div>
  </v-list-item>
</template>

<script setup lang="ts">
import type { EventDocument, UserDocument, UserType } from "~/rxdb/types";
const { event } = defineProps<{ event: EventDocument }>();

const query = computed(
  () => (collection) =>
    collection.find({
      selector: {
        id: { $in: event.hosts },
      },
    })
);

const hosts = await useRxQuery<UserType, UserDocument[]>("users", query);

const hostsText = computed(() => {
  if (!hosts.value) return "";

  const maxNames = 2;
  const previewNames = hosts.value
    .slice(0, maxNames)
    .map((u) => u.name)
    .join(", ");
  const extraPeople = hosts.value.length - maxNames;
  const textEnd =
    extraPeople > 0
      ? ` and ${extraPeople} other${extraPeople > 1 ? "s" : ""}`
      : "";
  return `Event by ${previewNames + textEnd}`;
});
</script>
