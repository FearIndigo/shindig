<template>
  <v-list-item class="px-6">
    <div class="d-flex ga-2">
      <v-icon icon="mdi-map-marker-outline"></v-icon>
      <span>{{ location }}</span>
    </div>
  </v-list-item>
</template>

<script setup lang="ts">
defineProps<{ location: string }>();
</script>
