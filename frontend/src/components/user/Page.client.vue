<template>
  <UserView v-if="user" :user="user" />
</template>

<script setup lang="ts">
import type { UserType, UserDocument } from "~/rxdb/types";

const { id } = defineProps<{ id: string }>();

const user = await useRxQuery<UserType, UserDocument | null>(
  "users",
  (collection) =>
    collection.findOne({
      selector: {
        id,
      },
    })
);
</script>
