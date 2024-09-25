<template>
  <v-dialog max-width="600">
    <template v-slot:activator="{ props: activatorProps }">
      <v-list-item v-bind="activatorProps" class="px-6">
        <div class="d-flex ga-2">
          <v-icon icon="mdi-account-multiple-outline"></v-icon>
          <span>{{ previewText }}</span>
        </div>
      </v-list-item>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card title="Guests" prepend-icon="mdi-account-multiple-outline">
        <v-tabs v-model="tab" fixed-tabs>
          <template
            v-for="[type, ids] in Object.entries(filteredIds)"
            :key="type"
          >
            <v-tab
              :text="`${type} (${ids.length})`"
              :prepend-icon="getResponseIcon(type)"
            ></v-tab>
          </template>
        </v-tabs>

        <v-tabs-window v-model="tab">
          <v-tabs-window-item
            v-for="([type, ids], i) in Object.entries(filteredIds)"
            :key="type"
            :value="type"
          >
            <UserList :users="getUsers(ids)" />
          </v-tabs-window-item>
        </v-tabs-window>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Close" @click="isActive.value = false"></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import type { EventDocument, UserCollection } from "~/rxdb/types";
const props = defineProps<{ event: EventDocument }>();

const tab = ref(null);
const filteredIds = computed(() =>
  props.event.responses.reduce(
    (acc: Record<string, string[]>, response) => {
      if (acc[response.type]) acc[response.type].push(response.userId);
      else acc[response.type] = [response.userId];
      return acc;
    },
    { Going: [...props.event.hosts] }
  )
);

const previewText = computed(
  () =>
    `${filteredIds.value.Going.length} ${
      filteredIds.value.Going.length > 1 ? "people are" : "person is"
    } going`
);

const query = computed(() => {
  // TODO: see if there is a better way to register the dependency.
  const deps = [filteredIds.value];
  return (collection: UserCollection) =>
    collection.find({
      selector: { id: { $in: Object.values(filteredIds.value).flat() } },
    });
});

const allGuests = await useRxQuery("users", query);

function getUsers(ids: string[]) {
  return allGuests.value?.filter((user) => ids.includes(user.id)) ?? [];
}
</script>
