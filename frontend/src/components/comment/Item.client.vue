<template>
  <v-list-item class="px-6">
    <div v-if="user" class="d-flex ga-2 align-center">
      <NuxtLink
        :to="`/user/${user.id}`"
        style="text-decoration: none; color: inherit"
      >
        <span class="text-subtitle-1 text-medium-emphasis">
          {{ user.name }}
        </span>
      </NuxtLink>

      <span class="text-caption text-disabled">{{ timestampText }}</span>
    </div>

    <p>{{ comment.message }}</p>
  </v-list-item>
</template>

<script setup lang="ts">
import type { CommentDocument, UserType } from "~/rxdb/types";

const props = defineProps<{ comment: CommentDocument }>();
const timestampText = useReactiveFormatDistanceToNow(props.comment.createdAt);
const user: UserType | null = await props.comment.populate("authorId");
</script>
