<template>
  <div>
    {{ user }}
    {{ loggedIn }}
  </div>
</template>

<script setup lang="ts">
import type { UserType, UserDocument } from "~/rxdb/types";

const { id } = defineProps(["id"]);

const user = await useRxQuery<UserType, UserDocument | null>("users", (users) =>
  users.findOne({
    selector: {
      id,
    },
  })
);

const session = await useSessionData();

const loggedIn = computed(() => session.passport?.user.id === id);
</script>
