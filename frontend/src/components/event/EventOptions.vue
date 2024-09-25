<template>
  <v-menu v-model="menuOpen">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" variant="flat" icon>
        <v-icon icon="mdi-dots-vertical"></v-icon>
        <v-tooltip activator="parent">Event options</v-tooltip>
      </v-btn>
    </template>
    <v-list>
      <EventEditDialog :event="event" @on-close="closeMenu" />
      <EventDeleteDialog :event="event" @on-close="closeMenu" />
      <EventInviteDialog :event="event" @on-close="closeMenu" />
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
import type { EventDocument } from "~/rxdb/types";

defineProps<{ event: EventDocument }>();

const menuOpen = ref(false);

function closeMenu() {
  menuOpen.value = false;
}
</script>
