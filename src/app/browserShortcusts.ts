const disableContextMenuInProd = (): void => {
  if (import.meta.env.PRODUCTION) {
    window.addEventListener('contextmenu', event => event.preventDefault());
  }
};

disableContextMenuInProd();
