<template>
  <v-sheet class="pa-6 d-flex flex-column ga-6" elevation="4" rounded>
    <div class="d-flex align-center ga-2">
      <v-icon icon="mdi-calendar-plus"></v-icon>
      <h4 class="text-h5">Create Event</h4>
    </div>

    <v-divider></v-divider>

    <v-form @submit.prevent="submit" class="d-flex flex-column ga-6">
      <div>
        <v-text-field v-model="event.title" label="Title" />

        <v-text-field v-model="event.location" label="Location" />

        <p class="mb-4 ml-2">Start time here...</p>

        <p class="mb-4 ml-2">Optional end time here...</p>

        <v-textarea v-model="event.description" label="Description" />

        <v-switch
          v-model="event.private"
          label="Private event"
          color="primary"
        />

        <p class="ml-2">Hosts / Co-hosts here...</p>
      </div>

      <v-divider></v-divider>

      <v-btn type="submit" color="primary">Create Event</v-btn>
    </v-form>
  </v-sheet>
</template>

<script setup lang="ts">
import type { EventType } from "~/rxdb/types";

const session = await useSessionData();

if (!session.passport?.user) {
  throw createError({
    statusCode: 401,
    statusMessage: "Unauthorized: You need to log in to create events!",
  });
}
const user = session.passport.user;

const event = ref<EventType>({
  id: uuidv4(),
  hosts: [user.id],
  title: "",
  startAt: Date.now(),
  duration: 0,
  location: "",
  description: "",
  responses: [],
  interactions: [],
  comments: [],
  private: true,
});

async function submit() {
  const db = await useRxDB();

  const newEvent = await db.events.insert(toRaw(event.value));

  navigateTo(`/event/${newEvent.id}`);
}
</script>
