<template>
  <v-btn @click="toggleTheme" icon>
    <v-icon :icon="icon"></v-icon>
    <v-tooltip activator="parent" location="bottom">Toggle theme</v-tooltip>
  </v-btn>
</template>

<script setup lang="ts">
const theme = useTheme();

const icon = computed(() =>
  theme.global.name.value === "dark" ? "mdi-brightness-4" : "mdi-brightness-5"
);

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
}
</script>
