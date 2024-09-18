<template>
  <v-card
    prepend-icon="mdi-login"
    title="Log In"
    text="Select your login method."
    variant="tonal"
    max-width="320"
  >
    <v-card-actions class="w-100">
      <form :action="`${$config.public.apiBase}/auth/login`" class="w-100">
        <v-btn type="submit" variant="tonal" block>Log in with Keycloak</v-btn>
      </form>
    </v-card-actions>
  </v-card>
</template>
