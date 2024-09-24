<template>
  <NuxtLink :to="`/user/${user.id}`" custom>
    <v-list-item :to="`/user/${user.id}`">
      <v-list-item-title>{{ user.name }}</v-list-item-title>
    </v-list-item>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { UserType } from "~/rxdb/types";
defineProps<{
  user: UserType;
}>();
</script>
