type Subscriber<T> = (newValue: T, oldValue: T) => void;
type UnSubscribeFn = () => boolean;

class State<T> {
  private _value: T;
  private _subscribers = new Set<Subscriber<T>>();

  constructor(initialValue: T) {
    this._value = initialValue;
  }

  get value(): T {
    return structuredClone(this._value);
  }

  set value(newVal: T) {
    const oldValue = structuredClone(this._value);
    this._value = newVal;
    this._subscribers.forEach(sub => sub(newVal, oldValue));
  }

  subscribe(callback: Subscriber<T>): UnSubscribeFn {
    this._subscribers.add(callback);

    return (): boolean => this._subscribers.delete(callback);
  }
}

export default State;
