<template>
  <v-card
    prepend-icon="mdi-logout"
    title="Log Out"
    text="Are you sure you want to log out?"
    max-width="320"
  >
    <v-card-actions class="w-100">
      <form
        :action="`${$config.public.apiBase}/auth/logout`"
        method="post"
        class="w-100"
      >
        <v-btn type="submit" variant="tonal" block>Log out</v-btn>
      </form>
    </v-card-actions>
  </v-card>
</template>
