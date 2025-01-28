const disableContextMenuInProd = (): void => {
  if (import.meta.env.PROD) {
    window.addEventListener('contextmenu', event => event.preventDefault());
  }
};

disableContextMenuInProd();
