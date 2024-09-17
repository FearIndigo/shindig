<template>
  <v-app-bar>
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click="$emit('toggleNav')"> </v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>Shindig</v-app-bar-title>

    <template v-slot:append>
      <InputThemeToggle />
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
defineEmits(["toggleNav"]);
</script>
