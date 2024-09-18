<template>
  <v-sheet class="pa-6 d-flex flex-column ga-6" elevation="4" rounded>
    <div class="d-flex align-center ga-2">
      <v-icon icon="mdi-login"></v-icon>
      <h4 class="text-h5">Log In</h4>
    </div>

    <p>Choose your log in or signup method below.</p>

    <v-divider></v-divider>

    <v-form :action="`${$config.public.apiBase}/auth/login`">
      <v-btn type="submit" variant="tonal" block>Log in with Keycloak</v-btn>
    </v-form>
  </v-sheet>
</template>
