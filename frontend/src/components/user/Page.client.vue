<template>
  <UserView v-if="user" :user="user" />
</template>

<script setup lang="ts">
import type { UserType, UserDocument, UserCollection } from "~/rxdb/types";

const { id } = defineProps<{ id: string }>();

const query = computed(
  () => (collection: UserCollection) =>
    collection.findOne({
      selector: {
        id,
      },
    })
);

const user = await useRxQuery<UserType, UserDocument | null>("users", query);
</script>
