<template>
  <v-breadcrumbs :items="items"></v-breadcrumbs>
</template>

<script setup lang="ts">
import isUuid from "~/utils/isId";

const route = useRoute();
const router = useRouter();
const routes = router.getRoutes();
const params = route.path.split("/");
if (params[1] === "") params.pop();
const items = params.map((param, i) => {
  if (i === 0) return { to: "/", title: "Shindig" };
  const to = params.slice(0, i + 1).join("/");
  return {
    to,
    title: isUuid(param) ? "" : param[0].toUpperCase() + param.slice(1),
    disabled:
      i === params.length - 1 ? true : !routes.some((r) => r.path === to),
  };
});
</script>
