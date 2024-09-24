<template>
  <p v-if="comments.length === 0" class="text-disabled pa-6">
    No comments to display...
  </p>
  <v-list
    v-else
    class="pa-0"
    lines="three"
    :elevation="$props.elevation"
    rounded
  >
    <template v-for="(comment, i) in $props.comments" :key="comment.id">
      <CommentItem :comment="comment" />
      <v-divider v-if="i < $props.comments.length - 1"></v-divider>
    </template>
  </v-list>
</template>

<script setup lang="ts">
import type { CommentDocument } from "~/rxdb/types";
defineProps<{ comments: CommentDocument[]; elevation?: string }>();
</script>
