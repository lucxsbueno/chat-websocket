import { useState } from "react";

export const useScroll = () => {
  const [sticky, updateSticky] = useState(false);

  const scrollObserver = e => {
    const element = e.target;
    const totalScrollHeight = element.scrollHeight - element.clientHeight;
    //se estiver scrollado pra cima o botão aparece
    updateSticky(element.scrollTop !== totalScrollHeight);
  }

  return { scrollObserver, sticky };
}