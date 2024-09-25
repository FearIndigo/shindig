export default function getInteractionIcon(type: string) {
  switch (type) {
    case "Like":
      return "👍";
    case "Love":
      return "❤️";
    case "Care":
      return "🥰";
    case "Haha":
      return "😆";
    case "Wow":
      return "😮";
    case "Sad":
      return "😢";
    case "Angry":
      return "😡";
    default:
      return "";
  }
}
