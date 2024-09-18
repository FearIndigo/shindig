<template>
  <v-sheet class="pa-6 d-flex flex-column ga-6" elevation="4" rounded>
    <div class="d-flex align-center ga-2">
      <v-icon icon="mdi-logout"></v-icon>
      <h4 class="text-h5">Log Out</h4>
    </div>

    <p>Are you sure you want to log out?</p>

    <v-divider></v-divider>

    <v-form :action="`${$config.public.apiBase}/auth/logout`" method="post">
      <v-btn type="submit" variant="tonal" block>Log out</v-btn>
    </v-form>
  </v-sheet>
</template>
