type Subscriber = () => void;
type UnSubscribeFn = () => boolean;

class State<T> {
  private _value: T;
  private _subscribers = new Set<Subscriber>();

  constructor(initialValue: T) {
    this._value = initialValue;
  }

  get value(): T {
    return this._value;
  }

  set value(newVal: T) {
    this._value = newVal;
    this._subscribers.forEach(sub => sub());
  }

  subscribe(callback: Subscriber): UnSubscribeFn {
    this._subscribers.add(callback);

    return (): boolean => this._subscribers.delete(callback);
  }
}

export default State;
