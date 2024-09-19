<template>
  <v-row dense>
    <v-col>
      <v-text-field
        v-model="date"
        :label="$props.label ? `${$props.label} date` : 'Date'"
        prepend-inner-icon="mdi-calendar-outline"
        type="date"
      ></v-text-field>
    </v-col>
    <v-col>
      <v-text-field
        v-model="time"
        :label="$props.label ? `${$props.label} time` : 'Time'"
        prepend-inner-icon="mdi-clock-outline"
        type="time"
      ></v-text-field>
    </v-col>
    <v-col>
      <v-autocomplete
        v-model="timeZone"
        label="Time zone"
        prepend-inner-icon="mdi-map-clock-outline"
        :items="Intl.supportedValuesOf('timeZone')"
        auto-select-first
      ></v-autocomplete>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { format } from "date-fns";
import { TZDate } from "@date-fns/tz";

const timestamp = defineModel<number>({ required: true });
const props = defineProps<{ label: string; minTime?: number }>();

const date = computed({
  get: () => format(new TZDate(timestamp.value, timeZone.value), "yyyy-MM-dd"),
  set: (value: string) =>
    (timestamp.value = new TZDate(
      `${value}T${time.value}:00`,
      timeZone.value
    ).getTime()),
});

const time = computed({
  get: () => format(new TZDate(timestamp.value, timeZone.value), "HH:mm"),
  set: (value: string) =>
    (timestamp.value = new TZDate(
      `${date.value}T${value}:00`,
      timeZone.value
    ).getTime()),
});

const timeZone = ref(Intl.DateTimeFormat().resolvedOptions().timeZone);
</script>
