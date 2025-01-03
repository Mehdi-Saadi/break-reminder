abstract class Component {
  private _element: HTMLElement | null = null;
  private _children: Component[] = [];

  protected constructor(public props: Record<string, any> = {}) {}

  addChild(child: Component): void {
    this._children.push(child);
  }

  removeChild(child: Component): void {
    this._children = this._children.filter(item => item !== child);
    child.unmount();
  }

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
