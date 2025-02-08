import Component from '@/shared/ui/base/Component';
import { describe, it, expect, vi } from 'vitest';

describe('Component', () => {
  class TestComponent extends Component {
    onMounted = vi.fn();
    onUnmounted = vi.fn();

    constructor() {
      super('div', 'test-class');
    }

    getElement(): HTMLElement {
      return this.element;
    }
  }

  it('should create an element with the specified tag and class', () => {
    const comp = new TestComponent();
    expect(comp.getElement().tagName.toLowerCase()).toBe('div');
    expect(comp.getElement().classList.contains('test-class')).toBe(true);
  });

  it('should mount to a parent component', () => {
    const parent = new TestComponent();
    const child = new TestComponent();

    child.mount(parent);

    expect(parent.getElement().contains(child.getElement())).toBe(true);
    expect(child.onMounted).toHaveBeenCalled();
  });

  it('should mount to an HTML element', () => {
    const container = document.createElement('div');
    const comp = new TestComponent();

    comp.mount(container);

    expect(container.contains(comp.getElement())).toBe(true);
    expect(comp.onMounted).toHaveBeenCalled();
  });

  it('should unmount and call onUnmounted', () => {
    const container = document.createElement('div');
    const comp = new TestComponent();

    comp.mount(container);
    expect(container.contains(comp.getElement())).toBe(true);

    comp.unmount();
    expect(container.contains(comp.getElement())).toBe(false);
    expect(comp.onUnmounted).toHaveBeenCalled();
  });

  it('should add and unmount children components', () => {
    const parent = new TestComponent();
    const child = new TestComponent();

    parent.addChild(child);
    child.mount(parent);
    parent.mount(document.body);

    expect(parent.getElement().contains(child.getElement())).toBe(true);

    parent.unmount();
    expect(child.onUnmounted).toHaveBeenCalled();
    expect(document.body.contains(parent.getElement())).toBe(false);
  });
});
