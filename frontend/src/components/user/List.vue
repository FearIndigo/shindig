<template>
  <p v-if="users.length === 0" class="text-disabled">No users to display...</p>
  <v-list v-else class="pa-0" lines="one" :elevation="$props.elevation">
    <template v-for="(user, i) in $props.users" :key="user.id">
      <UserPreview :user="user" />
      <v-divider v-if="divider && i < $props.users.length - 1"></v-divider>
    </template>
  </v-list>
</template>

<script setup lang="ts">
import type { UserDocument } from "~/rxdb/types";
defineProps<{ users: UserDocument[]; elevation?: string; divider?: boolean }>();
</script>
