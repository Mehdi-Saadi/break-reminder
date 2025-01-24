type EventHandler = (payload: any) => void;

class EventBus<T extends string> {
  private events: Record<string, EventHandler[]> = {};

  on(event: T, handler: EventHandler): void {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].push(handler);
  }

  emit(event: T, payload?: any): void {
    if (this.events[event]) {
      this.events[event].forEach(handler => handler(payload));
    }
  }
}

export default EventBus;
