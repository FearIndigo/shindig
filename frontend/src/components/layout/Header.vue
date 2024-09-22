<template>
  <v-app-bar>
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click="$emit('toggleNav')"> </v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>
      <NuxtLink to="/" custom>
        <v-btn to="/" size="large" variant="outlined" color="primary" rounded>
          Shindig
        </v-btn>
      </NuxtLink>
    </v-app-bar-title>

    <template v-slot:append>
      <InputThemeToggle />
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
defineEmits(["toggleNav"]);
</script>
