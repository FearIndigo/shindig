<template>
  <v-select
    v-model="response"
    :prepend-inner-icon="responseIcon"
    variant="solo-filled"
    :disabled="isHost"
    :items="['Maybe', 'Going', 'Can\'t go']"
    hide-details
    @update:model-value="setResponse"
  ></v-select>
</template>

<script setup lang="ts">
import type { EventDocument } from "~/rxdb/types";

const props = defineProps<{
  event: EventDocument;
  userId: string;
}>();

const isHost = computed(() => props.event.hosts.includes(props.userId));

const response = computed({
  get: () => {
    if (isHost.value) return "Hosting";

    const userResponse = props.event.responses.find(
      (r) => r.userId == props.userId
    );
    if (userResponse) return userResponse.type;

    return "";
  },
  set: () => {},
});

const responseIcon = computed(() => getResponseIcon(response.value));

async function setResponse(value: string) {
  if (isHost.value) return;

  const reponseIndex = props.event.responses.findIndex(
    (r) => r.userId == props.userId
  );
  if (reponseIndex != -1) {
    await props.event.patch({
      responses: props.event.responses.toSpliced(reponseIndex, 1, {
        userId: props.userId,
        type: value as "Maybe" | "Going" | "Can't go",
      }),
    });
  }
}
</script>
