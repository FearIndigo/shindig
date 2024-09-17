<template>
  <v-navigation-drawer
    v-model="navOpen"
    :location="$vuetify.display.mobile ? 'bottom' : undefined"
    temporary
  >
    <LayoutNavItems :items="navItems.pages" />

    <template v-slot:append>
      <LayoutNavItems :items="navItems.account" />
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
const props = defineProps(["navOpen"]);
const emit = defineEmits(["openUpdated"]);
const navOpen = computed({
  get: () => props.navOpen,
  set: (value: boolean) => emit("openUpdated", value),
});

const navItems = getNavItems();
</script>
