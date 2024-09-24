<template>
  <v-list nav>
    <template v-for="item in items" :key="item.path">
      <NuxtLink :to="item.path" custom>
        <v-list-item
          :to="item.path"
          :color="item.colour"
          :prepend-icon="item.icon"
          :title="item.label"
        >
        </v-list-item>
      </NuxtLink>
    </template>
  </v-list>
</template>

<script setup lang="ts">
defineProps<{
  items: INavItem[];
}>();
</script>
