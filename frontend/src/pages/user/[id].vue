<template>
  <ContainerPage>
    <InputBreadcrumbs />

    <UserPage :id="$route.params.id" />
  </ContainerPage>
</template>
