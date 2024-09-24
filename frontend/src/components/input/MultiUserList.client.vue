<template>
  <v-autocomplete
    v-model="users"
    :items="allUsers"
    item-title="name"
    item-value="id"
    :label="$props.label"
    :prepend-inner-icon="$props.icon"
    multiple
    chips
  ></v-autocomplete>
</template>

<script setup lang="ts">
import type { UserCollection } from "~/rxdb/types";

const users = defineModel<string[]>();
const props = defineProps<{
  label?: string;
  excludeUsers?: string[];
  icon?: string;
}>();

const query = computed(
  () => (collection: UserCollection) =>
    collection.find({
      selector: {
        id: { $nin: props.excludeUsers },
      },
    })
);

const allUsers = await useRxQuery("users", query);
</script>
