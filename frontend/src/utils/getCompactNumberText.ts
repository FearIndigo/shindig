const formatter = new Intl.NumberFormat(undefined, {
  notation: "compact",
  maximumSignificantDigits: 3,
});

export default function getCompactNumberText(value: number) {
  return formatter.format(value);
}
