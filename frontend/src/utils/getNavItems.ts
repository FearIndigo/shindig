export interface INavItem {
  label: string;
  icon: string;
  path: string;
  colour?: string;
}

export default function getNavItems() {
  const pages: INavItem[] = [
    {
      label: "Feed",
      icon: "mdi-newspaper-variant-outline",
      path: "/",
      colour: "primary",
    },
    {
      label: "Events",
      icon: "mdi-calendar-outline",
      path: "/event",
      colour: "secondary",
    },
  ];

  const account: INavItem[] = [
    {
      label: "Log In",
      icon: "mdi-login",
      path: "/login",
    },
    {
      label: "Log Out",
      icon: "mdi-logout",
      path: "/logout",
    },
  ];

  return {
    pages,
    account,
  };
}
