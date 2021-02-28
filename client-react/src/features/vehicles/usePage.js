import { useLocation } from "react-router-dom";

export default function usePage() {
  const pageString = new URLSearchParams(useLocation().search).get("page");
  return Number(pageString) || 1;
}
