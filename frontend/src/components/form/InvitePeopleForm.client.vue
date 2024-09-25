<template>
  <v-sheet class="pa-6 d-flex flex-column ga-6" elevation="4" rounded>
    <div class="pb-0 d-flex align-center ga-2">
      <v-icon icon="mdi-account-multiple-plus-outline"></v-icon>
      <h4 class="text-h5">Invite people</h4>
    </div>

    <v-divider></v-divider>

    <v-form class="d-flex flex-column ga-6" @submit.prevent="submit">
      <v-list
        v-model:selected="inviteList"
        class="pa-0"
        lines="one"
        select-strategy="classic"
      >
        <v-list-item v-for="user in users" :key="user.id" :value="user.id">
          <template v-slot:prepend="{ isActive }">
            <v-list-item-action start>
              <v-checkbox-btn :model-value="isActive"></v-checkbox-btn>
            </v-list-item-action>
          </template>

          <v-list-item-title>{{ user.name }}</v-list-item-title>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-btn type="submit" color="primary" block>Send invites</v-btn>
    </v-form>
  </v-sheet>
</template>

<script setup lang="ts">
import type { EventDocument, ResponseType, UserCollection } from "~/rxdb/types";

const props = defineProps<{ event: EventDocument }>();
const emit = defineEmits<{ onClose: [] }>();

const inviteList = ref<string[]>([]);

const query = computed(() => {
  const invitedUsers = [
    ...props.event.responses.map((r) => r.userId),
    ...props.event.hosts,
  ];
  return (collection: UserCollection) =>
    collection.find({
      selector: {
        id: { $nin: invitedUsers },
      },
    });
});

const users = await useRxQuery("users", query);

async function submit() {
  if (inviteList.value.length > 0) {
    // Generate new responses.
    const newResponses: ResponseType[] = inviteList.value.map((id) => ({
      type: "Invited",
      userId: id,
    }));

    // Add new responses.
    await props.event.patch({
      responses: [...props.event.responses, ...newResponses],
    });
  }

  emit("onClose");
}
</script>
