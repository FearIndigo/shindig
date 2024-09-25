<template>
  <v-sheet class="pa-6 d-flex flex-column ga-6" elevation="4" rounded>
    <div class="d-flex align-center ga-2">
      <v-icon :icon="titleIcon"></v-icon>
      <h4 class="text-h5">{{ actionText }}</h4>
    </div>

    <v-divider></v-divider>

    <v-form
      @submit.prevent="submit"
      v-model="valid"
      class="d-flex flex-column ga-6"
    >
      <div>
        <v-text-field
          v-model="event.title"
          label="Title"
          :rules="[formRules.required]"
        />

        <v-text-field
          v-model="event.location"
          label="Location"
          prepend-inner-icon="mdi-map-marker-outline"
          :rules="[formRules.required]"
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
          :items="['Private', 'Public', 'Friends']"
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

      <v-btn type="submit" color="primary">{{ actionText }}</v-btn>
    </v-form>
  </v-sheet>
</template>

<script setup lang="ts">
import type { EventType } from "~/rxdb/types";

const props = defineProps<{ editEvent?: EventType }>();
const emit = defineEmits<{
  submit: [];
}>();

const valid = ref();

const actionText = props.editEvent ? "Edit Event" : "Create Event";
const titleIcon = props.editEvent ? "mdi-pencil-outline" : "mdi-calendar-plus";

const event = props.editEvent
  ? useCloned(props.editEvent).cloned
  : ref<EventType>({
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

const useEndAt = ref(props.editEvent && props.editEvent.duration > 0);

const endAt = computed({
  get: () => event.value.startAt + event.value.duration,
  set: (value: number) => (event.value.duration = value - event.value.startAt),
});

const session = await useSessionData();
if (!session.passport?.user) {
  throw createError({
    statusCode: 401,
    statusMessage: "Unauthorized: You need to log in to manage events!",
  });
}
const user = session.passport.user;
if (props.editEvent && !props.editEvent.hosts.includes(user.id)) {
  throw createError({
    statusCode: 401,
    statusMessage:
      "Unauthorized: You can only edit events that you are hosting!",
  });
}

async function submit() {
  if (!valid.value) return;

  const db = await useRxDB();

  if (!useEndAt) {
    event.value.duration = 0;
  }

  // Make sure the person editing/creating is a host.
  if (!event.value.hosts.includes(user.id)) {
    event.value.hosts.push(user.id);
  }

  const newEvent = await db.events.upsert(toRaw(event.value));

  emit("submit");

  navigateTo(`/event/${newEvent.id}`);
}
</script>
