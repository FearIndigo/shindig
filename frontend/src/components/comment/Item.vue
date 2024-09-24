<template>
  <v-list-item>{{ comment }}</v-list-item>
</template>

<script setup lang="ts">
import type { CommentDocument } from "~/rxdb/types";
defineProps<{ comment: CommentDocument }>();
</script>
