import { useWatchedList } from "./getWatchedListContext";

export const InFavorite = (id: string | number | undefined) => {
  const { watchedList } = useWatchedList();
  let exist = false;
  for (let i = 0; watchedList?.length > i; i++) {
    if (+watchedList[i].id == id) {
      exist = true;
    }
  }
  return exist;
};
