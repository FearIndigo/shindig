<template>
  <p v-if="comments.length === 0" class="text-disabled">
    No comments to display...
  </p>
  <v-list v-else class="pa-0" lines="three" rounded>
    <template v-for="(comment, i) in $props.comments" :key="comment.id">
      <CommentItem :comment="comment" />
      <v-divider
        v-if="i < comments!.length - 1"
        :key="`${i}-divider`"
      ></v-divider>
    </template>
  </v-list>
</template>

<script setup lang="ts">
import type { CommentDocument } from "~/rxdb/types";
defineProps<{ comments: CommentDocument[] }>();
</script>
