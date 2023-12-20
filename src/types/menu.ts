import { Url } from "next/dist/shared/lib/router/router";

export type Menu = {
  id: number;
  title: string;
  path: Url;
  newTab: boolean;
  submenu?: Menu[];
};
