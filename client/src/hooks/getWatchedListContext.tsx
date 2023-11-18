import { useContext } from "react";
import { WatchedListContext } from "../Context/watchedListContext";
export function useWatchedList() {
  const watchedListContext = useContext<any>(WatchedListContext);
  if (!watchedListContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return watchedListContext;
}
