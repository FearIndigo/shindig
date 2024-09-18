<template>
  <v-navigation-drawer
    v-model="navOpen"
    :location="$vuetify.display.mobile ? 'bottom' : undefined"
    temporary
  >
    <LayoutNavItems :items="navItems.pages" />

    <template v-slot:append>
      <ClientOnly>
        <LayoutNavItems :items="navItems.account" />
      </ClientOnly>
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
const props = defineProps(["navOpen"]);
const emit = defineEmits(["openUpdated"]);
const navOpen = computed({
  get: () => props.navOpen,
  set: (value: boolean) => emit("openUpdated", value),
});

const navItems = ref(getNavItems());

const session = await useSessionData();
if (session.passport?.user) {
  const user = session.passport.user;
  navItems.value.account.unshift({
    label: user.name,
    icon: "mdi-account-circle",
    path: `/user/${user.id}`,
  });
}
</script>
