abstract class Component {
  protected element: HTMLElement;
  private children: Component[] = [];

  protected constructor(tagName: keyof HTMLElementTagNameMap, classes?: string) {
    this.element = document.createElement(tagName);
    if (classes) {
      this.element.setAttribute('class', classes);
    }
  }

  /**
   * Called when the component is mounted to the DOM.
   *
   * Override this method in derived classes.
   */
  protected onMounted(): void {
    // Default implementation (can be overridden)
  }

  /**
   * Called when the component is unmounted from the DOM.
   *
   * Override this method in derived classes.
   */
  protected onUnmounted(): void {
    // Default implementation (can be overridden)
  }

  mount(parent: Component | HTMLElement): void {
    if (parent instanceof Component) {
      parent.element.appendChild(this.element);
    } else {
      parent.appendChild(this.element);
    }

    this.onMounted();
  }

  unmount(): void {
    if (this.element.parentElement) {
      this.element.parentElement.removeChild(this.element);

      this.children.forEach(child => child.unmount());
      this.children = [];

      this.onUnmounted();
    }
  }

  protected addChild(child: Component): void {
    this.children.push(child);
  }
}

export default Component;
