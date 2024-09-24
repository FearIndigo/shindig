<template>
  <p v-if="comments.length === 0" class="text-disabled">
    No comments to display...
  </p>
  <v-list
    v-else
    class="pa-0"
    lines="three"
    :elevation="$props.elevation"
    variant="elevated"
    rounded
  >
    <template v-for="comment in $props.comments" :key="comment.id">
      <CommentItem :comment="comment" />
    </template>
  </v-list>
</template>

<script setup lang="ts">
import type { CommentDocument } from "~/rxdb/types";
defineProps<{ comments: CommentDocument[]; elevation?: string }>();
</script>
