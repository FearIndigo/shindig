<template>
  <ContainerPage>
    <InputBreadcrumbs />

    <UserProfile :id="$route.params.id" />
  </ContainerPage>
</template>
