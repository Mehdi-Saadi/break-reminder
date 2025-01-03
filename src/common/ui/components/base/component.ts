abstract class Component {
  protected element: HTMLElement;

  protected constructor(tagName: keyof HTMLElementTagNameMap, classes?: string) {
    this.element = document.createElement(tagName);
    if (classes) {
      this.element.setAttribute('class', classes);
    }
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
    parent.appendChild(this.element);
    this.onMounted();
  }

  unmount(): void {
    if (this.element.parentElement) {
      this.element.parentElement.removeChild(this.element);
      this.onUnmounted();
    }
  }
}

export default Component;
