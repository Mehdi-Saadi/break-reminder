abstract class Component {
  private _element: HTMLElement | null = null;

  protected constructor() {}

  /**
   * Called when the component is mounted to the DOM.
   * Override this method in derived classes.
   */
  onMounted(): void {
    // Default implementation (can be overridden)
  }

  /**
   * Called when the component is unmounted from the DOM.
   * Override this method in derived classes.
   */
  onUnmounted(): void {
    // Default implementation (can be overridden)
  }

  mount(parent: HTMLElement): void {
    this._element = this.render()
    parent.appendChild(this._element);
    this.onMounted();
  }

  unmount(): void {
    if (this._element && this._element.parentElement) {
      this.onUnmounted();
      this._element.parentElement.removeChild(this._element);
      this._element = null;
    }
  }

  abstract render(): HTMLElement;
}

export default Component;
