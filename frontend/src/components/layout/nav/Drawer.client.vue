<template>
  <v-navigation-drawer v-model="open" temporary>
    <LayoutNavItems :items="navItems.pages" />

    <template v-slot:append>
      <LayoutNavItems :items="navItems.account" />
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
const open = defineModel<boolean>();

const navItems = ref(getNavItems());

const session = await useSessionData();
if (session.passport?.user) {
  const user = session.passport.user;
  navItems.value.account.unshift({
    label: user.name,
    icon: "mdi-account-outline",
    path: `/user/${user.id}`,
  });
}
</script>
