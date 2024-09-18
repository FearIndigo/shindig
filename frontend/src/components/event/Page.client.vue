<template>
  <div>
    {{ event }}
  </div>
</template>

<script setup lang="ts">
import type { EventType, EventDocument } from "~/rxdb/types";

const { id } = defineProps(["id"]);

const event = await useRxQuery<EventType, EventDocument | null>(
  "events",
  (collection) =>
    collection.findOne({
      selector: {
        id,
      },
    })
);
</script>
