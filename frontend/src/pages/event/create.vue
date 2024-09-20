<template>
  <ContainerPage>
    <InputBreadcrumbs />

    <FormCreateEventForm />
  </ContainerPage>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});
</script>
