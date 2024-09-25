<template>
  <v-menu v-model="menuOpen">
    <template v-slot:activator="{ props }">
      <v-btn
        v-bind="props"
        variant="tonal"
        :color="currentSelection && 'primary'"
        prepend-icon="mdi-thumb-up-outline"
        :disabled="disabled"
      >
        Like
      </v-btn>
    </template>
    <v-sheet class="d-flex ga-2 pa-4" rounded>
      <v-btn
        v-for="type in types"
        :key="type"
        @click="onSelected(type)"
        variant="flat"
        :color="currentSelection == type ? 'primary' : ''"
        icon
      >
        <span class="text-h5">{{ getInteractionIcon(type) }}</span>
        <v-tooltip activator="parent" location="bottom">{{ type }}</v-tooltip>
      </v-btn>
    </v-sheet>
  </v-menu>
</template>

<script setup lang="ts">
defineProps<{ disabled?: boolean; currentSelection?: string }>();
const emit = defineEmits<{
  onSelection: ["Like" | "Love" | "Care" | "Haha" | "Wow" | "Sad" | "Angry"];
}>();

const types = ["Like", "Love", "Care", "Haha", "Wow", "Sad", "Angry"];

const menuOpen = ref(false);

function onSelected(
  type: "Like" | "Love" | "Care" | "Haha" | "Wow" | "Sad" | "Angry"
) {
  menuOpen.value = false;
  emit("onSelection", type);
}
</script>
