<template>
  <ContainerPage>
    <InputBreadcrumbs />

    <EventPage :id="$route.params.id" />
  </ContainerPage>
</template>
