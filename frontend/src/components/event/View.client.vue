<template>
  <div class="d-flex flex-column ga-6">
    <v-sheet class="d-flex flex-column" elevation="1" rounded>
      <div class="pa-6">
        <p class="text-caption text-disabled">{{ timeText }}</p>

        <h2>{{ event.title }}</h2>

        <p>{{ event.location }}</p>

        <div v-if="user" class="d-flex justify-space-between align-center mt-4">
          <div>
            <EventResponse :event="event" :user-id="user.id" />
          </div>

          <div>
            <EventOptions v-if="isHost" :event="event" />
          </div>
        </div>
      </div>

      <v-divider></v-divider>

      <div>
        <h3 class="pa-6">Details</h3>

        <EventGuests :event="event" />

        <EventHosts :event="event" />

        <EventLocation :location="event.location" />

        <EventDuration v-if="event.duration > 0" :event="event" />

        <EventVisibility :visibility="event.visibility" />

        <div class="px-6 my-6">
          <pre class="text-body-1">{{ event.description }}</pre>
        </div>

        <EventInteractions :event="event" class="my-6" />
      </div>
    </v-sheet>

    <EventComments :event="event" />
  </div>
</template>

<script setup lang="ts">
import type { EventDocument } from "~/rxdb/types";

const props = defineProps<{
  event: EventDocument;
}>();

const timeText = computed(() => getEventTimeText(props.event));

const session = await useSessionData();
const user = session.passport?.user;
const isHost = user && props.event.hosts.includes(session.passport!.user.id);
</script>
