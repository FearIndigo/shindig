<template>
  <div class="d-flex ga-1 align-center">
    <div v-if="interactions.length > 0" class="d-flex position-relative">
      <span
        v-for="(type, i) in types"
        :key="type"
        class="text-h6"
        :style="i < types.length - 1 && 'width: 16px'"
      >
        {{ getInteractionIcon(type) }}
      </span>
    </div>
    <span>{{ compactCountText }}</span>
  </div>
</template>

<script setup lang="ts">
import type { InteractionDocument } from "~/rxdb/types";

const props = defineProps<{
  interactions: InteractionDocument[];
}>();

const types = computed(() =>
  props.interactions.reduce((acc: string[], interaction) => {
    if (!acc.includes(interaction.type)) acc.push(interaction.type);
    return acc;
  }, [])
);

const compactCountText = computed(() =>
  getCompactNumberText(props.interactions.length)
);
</script>
