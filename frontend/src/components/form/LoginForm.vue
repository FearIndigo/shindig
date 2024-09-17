<template>
  <form :action="`${$config.public.apiBase}/auth/login`">
    <v-btn type="submit">Log in with Keycloak</v-btn>
  </form>
</template>
