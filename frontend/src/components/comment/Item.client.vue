<template>
  <v-list-item class="px-6">
    <div v-if="user" class="d-flex ga-2 align-center">
      <NuxtLink
        :to="`/user/${user.id}`"
        style="text-decoration: none; color: inherit"
      >
        <span class="text-subtitle-1 text-disabled"> By {{ user.name }} </span>
      </NuxtLink>
    </div>

    <pre class="text-body-1 py-2">{{ comment.message }}</pre>

    <span class="text-caption text-disabled">{{ createdText }}</span>
  </v-list-item>
</template>

<script setup lang="ts">
import { format } from "date-fns";
import type { CommentDocument, UserType } from "~/rxdb/types";

const props = defineProps<{ comment: CommentDocument }>();
const createdText = format(new Date(props.comment.createdAt), "Pp");
const user: UserType | null = await props.comment.populate("authorId");
</script>
