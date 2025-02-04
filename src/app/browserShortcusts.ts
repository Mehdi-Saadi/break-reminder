const disableContextMenuInProd = (): void => {
  if (import.meta.env.VITE_PRODUCTION === 'true') {
    window.addEventListener('contextmenu', event => event.preventDefault());
  }
};

disableContextMenuInProd();
