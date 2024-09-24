<template>
  <UserView v-if="user" :user="user" />
</template>

<script setup lang="ts">
import type { UserCollection } from "~/rxdb/types";

const props = defineProps<{ id: string }>();

const query = computed(() => {
  // TODO: see if there is a better way to register the dependency.
  const deps = [props.id];
  return (collection: UserCollection) =>
    collection.findOne({
      selector: {
        id: props.id,
      },
    });
});

const user = await useRxQuery("users", query);
</script>
