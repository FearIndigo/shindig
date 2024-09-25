export default function getResponseIcon(type: string) {
  switch (type) {
    case "Going":
      return "mdi-check-circle-outline";
    case "Can't go":
      return "mdi-close-circle-outline";
    case "Invited":
      return "mdi-star-outline";
    case "Maybe":
      return "mdi-help-circle-outline";
    case "Hosting":
      return "mdi-account-star-outline";
    default:
      return "";
  }
}
