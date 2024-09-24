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

        <v-text-field
          v-model="event.location"
          label="Location"
          prepend-inner-icon="mdi-map-marker-outline"
        />

        <InputDateTime v-model="event.startAt" label="Start" />

        <v-checkbox
          v-model="useEndAt"
          label="Use end date and time"
        ></v-checkbox>

        <InputDateTime
          v-if="useEndAt"
          v-model="endAt"
          label="End"
          :min-time="event.startAt"
        />

        <v-textarea v-model="event.description" label="Description" />

        <v-select
          v-model="event.visibility"
          :items="visibilityItems"
          label="Visibility"
          prepend-inner-icon="mdi-eye-outline"
        ></v-select>

        <InputMultiUserList
          v-model="event.hosts"
          :exclude-users="[user.id]"
          label="Co-hosts"
          icon="mdi-account-star-outline"
        />
      </div>

      <v-divider></v-divider>

      <v-btn type="submit" color="primary">Create Event</v-btn>
    </v-form>
  </v-sheet>
</template>

<script setup lang="ts">
import type { EventType } from "~/rxdb/types";

const visibilityItems = ["Private", "Public", "Friends"];

const event = ref<EventType>({
  id: uuidv4(),
  hosts: [],
  title: "",
  // Get timestamp at the start of the next 30min period, with a 15min buffer.
  startAt: Math.ceil((Date.now() + 900_000) / 1_800_000) * 1_800_000,
  duration: 0,
  location: "",
  description: "",
  responses: [],
  interactions: [],
  comments: [],
  visibility: "Private",
});

const useEndAt = ref(false);

const endAt = computed({
  get: () => event.value.startAt + event.value.duration,
  set: (value: number) => (event.value.duration = value - event.value.startAt),
});

const session = await useSessionData();

if (!session.passport?.user) {
  throw createError({
    statusCode: 401,
    statusMessage: "Unauthorized: You need to log in to create events!",
  });
}
const user = session.passport.user;

async function submit() {
  const db = await useRxDB();

  if (!useEndAt) {
    event.value.duration = 0;
  }

  event.value.hosts.push(user.id);

  const newEvent = await db.events.insert(toRaw(event.value));

  navigateTo(`/event/${newEvent.id}`);
}
</script>
