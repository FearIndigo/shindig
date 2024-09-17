<template>
  <v-app>
    <LayoutHeader @toggle-nav="navOpen = !navOpen" />

    <LayoutNavDrawer :nav-open="navOpen" @open-updated="(v) => (navOpen = v)" />

    <v-main>
      <slot />
    </v-main>

    <LayoutFooter />
  </v-app>
</template>

<script setup lang="ts">
const navOpen = ref(false);
</script>
