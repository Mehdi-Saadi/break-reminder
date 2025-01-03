type EventHandler = (payload: any) => void;

class EventBus {
  private events: Record<string, EventHandler[]> = {};

  on(event: string, handler: EventHandler): void {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].push(handler);
  }

  emit(event: string, payload?: any): void {
    if (this.events[event]) {
      this.events[event].forEach(handler => handler(payload));
    }
  }
}

export default EventBus;
