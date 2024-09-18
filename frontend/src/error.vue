<template>
  <NuxtLayout>
    <div class="h-100 d-flex justify-center align-center">
      <v-card
        :title="error?.statusCode"
        :text="error?.statusMessage"
        variant="tonal"
        class="text-center"
        max-width="320"
      >
        <v-card-actions>
          <v-btn @click="handleError" variant="tonal" block>Go home</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { NuxtError } from "#app";

const { error } = defineProps({
  error: Object as () => NuxtError,
});

const handleError = () => clearError({ redirect: "/" });
</script>
