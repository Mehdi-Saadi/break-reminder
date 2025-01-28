const disableContextMenu = (): void => {
  window.addEventListener('contextmenu', event => event.preventDefault());
};

if (import.meta.env.PROD) {
  disableContextMenu();
}
