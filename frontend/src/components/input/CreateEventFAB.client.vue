<template>
  <v-fab
    :active="loggedIn"
    to="/event/create"
    color="primary"
    elevation="8"
    size="large"
    icon
    app
  >
    <NuxtLink to="/event/create" custom>
      <v-icon icon="mdi-calendar-plus"></v-icon>
      <v-tooltip activator="parent">Create event</v-tooltip>
    </NuxtLink>
  </v-fab>
</template>

<script setup lang="ts">
const loggedIn = ref(false);
useSessionData().then((session) => {
  if (session.passport?.user) {
    loggedIn.value = true;
  }
});
</script>
