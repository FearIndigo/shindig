<template>
  <div class="d-flex flex-column ga-6">
    <v-sheet class="d-flex flex-column" elevation="1" rounded>
      <div class="pa-6 d-flex justify-space-between">
        <h2>{{ user.name }}</h2>

        <div v-if="isLoggedIn">
          <UserOptions :user="user" />
        </div>
      </div>
    </v-sheet>
  </div>
</template>

<script setup lang="ts">
import type { UserDocument } from "~/rxdb/types";

const props = defineProps<{ user: UserDocument }>();

const session = await useSessionData();
const isLoggedIn = session.passport?.user.id == props.user.id;
</script>
