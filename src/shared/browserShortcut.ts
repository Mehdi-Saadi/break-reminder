class BrowserShortcut {
  disableContextmenu(): void {
    window.addEventListener('contextmenu', event => event.preventDefault());
  }

  disableAllInProd(): void {
    if (import.meta.env.VITE_PRODUCTION === 'true') {
      this.disableContextmenu();
    }
  }
}

const browserShortcut = new BrowserShortcut();

export default browserShortcut;
