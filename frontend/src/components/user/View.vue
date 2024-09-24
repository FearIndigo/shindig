<template>
  <div>
    {{ user }}
  </div>
</template>

<script setup lang="ts">
import type { UserDocument } from "~/rxdb/types";

defineProps<{ user: UserDocument }>();
</script>
