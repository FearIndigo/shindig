<template>
  <v-list-item class="px-6">
    <div class="d-flex ga-2">
      <v-icon icon="mdi-eye-outline"></v-icon>
      <span>{{ $props.visibility }}</span>
    </div>
  </v-list-item>
</template>

<script setup lang="ts">
defineProps<{ visibility: "Private" | "Public" | "Friends" }>();
</script>
