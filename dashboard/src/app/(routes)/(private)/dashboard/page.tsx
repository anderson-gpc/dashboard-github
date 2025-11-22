"use client"

import DashboardPage from "@/views/home/DashboardPage";
import DefaultPage from "@/views/home/DefaultPage";
import {useDashboard} from "@/src/hooks/useDashboard";

export default function Dashboard() {
  const {actionsGit} = useDashboard();

  if (actionsGit === true) {
    return <DashboardPage />;
  } else {
    return <DefaultPage />;
  }
}
