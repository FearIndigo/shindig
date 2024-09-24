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
      <v-card title="Guests">
        <v-tabs v-model="tab" fixed-tabs>
          <template
            v-for="[type, ids] in Object.entries(filteredIds)"
            :key="type"
          >
            <v-tab :text="`${type} (${ids.length})`"></v-tab>
          </template>
        </v-tabs>

        <v-tabs-window v-model="tab">
          <v-tabs-window-item
            v-for="(type, i) in Object.keys(filteredIds)"
            :key="type"
            :value="type"
          >
            <UserList v-if="guestLists[i].value" :users="guestLists[i].value" />
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
import type { EventDocument, UserDocument, UserType } from "~/rxdb/types";
const { event } = defineProps<{ event: EventDocument }>();

const tab = ref(null);
const filteredIds = event.responses.reduce(
  (acc: Record<string, string[]>, response) => {
    if (acc[response.type]) acc[response.type].push(response.userId);
    else acc[response.type] = [response.userId];
    return acc;
  },
  { Going: event.hosts }
);

const previewText = `${filteredIds.Going.length} ${
  filteredIds.Going.length > 1 ? "people are" : "person is"
} going`;

const guestLists = await Promise.all(
  Object.values(filteredIds).map(async (ids) => {
    return await useRxQuery<UserType, UserDocument[]>("users", (collection) =>
      collection.find({
        selector: { id: { $in: ids } },
      })
    );
  })
);
</script>
