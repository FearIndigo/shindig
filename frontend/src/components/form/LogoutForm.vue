<template>
  <form :action="`${$config.public.apiBase}/auth/logout`" method="post">
    <v-btn type="submit">Log out</v-btn>
  </form>
</template>
