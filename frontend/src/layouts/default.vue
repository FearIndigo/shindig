<template>
  <v-app>
    <LayoutHeader @toggle-nav="navOpen = !navOpen" />

    <LayoutNavDrawer v-model="navOpen" />

    <v-main>
      <slot />
    </v-main>

    <LayoutFooter />
  </v-app>
</template>

<script setup lang="ts">
const navOpen = ref(false);
</script>
