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
      icon: "mdi-home",
      path: "/",

      colour: "primary",
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
