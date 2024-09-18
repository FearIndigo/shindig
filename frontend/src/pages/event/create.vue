<template>
  <ContainerPage>
    <p>Hello create event</p>
  </ContainerPage>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});
</script>
