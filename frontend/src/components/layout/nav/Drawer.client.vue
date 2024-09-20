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
  navItems.value.account.unshift({
    label: "Your Account",
    icon: "mdi-account-outline",
    path: `/user/${session.passport.user.id}`,
  });
}
</script>
