import { formatDistance } from "date-fns";

export default function useReactiveFormatDistanceToNow(timestamp: number) {
  // Reactive date now.
  const dateNow = ref(new Date());

  // Computed result.
  const result = computed(() =>
    formatDistance(new Date(timestamp), dateNow.value, { addSuffix: true })
  );

  // Update every minute.
  const interval = setInterval(() => {
    dateNow.value = new Date();
  }, 60_000);

  // Cleanup.
  onUnmounted(() => {
    clearInterval(interval);
  });

  return result;
}
