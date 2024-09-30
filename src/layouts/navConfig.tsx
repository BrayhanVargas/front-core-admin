import { IconBuildingBank } from "@tabler/icons-react";

interface NavItem {
  title: string;
  path: string;
  icon: JSX.Element;
}

const navConfig: NavItem[] = [
  {
    title: "Entities",
    path: "/home",
    icon: <IconBuildingBank />,
  },
];

export default navConfig;
