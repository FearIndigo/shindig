<template>
  <v-menu v-model="menuOpen">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" variant="flat" icon>
        <v-icon icon="mdi-dots-vertical"></v-icon>
        <v-tooltip activator="parent">User options</v-tooltip>
      </v-btn>
    </template>
    <v-list>
      <UserEditDialog :user="user" @on-close="closeMenu" />
      <UserDeleteDialog :user="user" @on-close="closeMenu" />
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
import type { UserDocument } from "~/rxdb/types";

defineProps<{ user: UserDocument }>();

const menuOpen = ref(false);

function closeMenu() {
  menuOpen.value = false;
}
</script>
