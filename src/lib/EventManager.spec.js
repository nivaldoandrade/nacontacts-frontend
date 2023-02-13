import EventManager from './EventManager';

describe('EventManager Lib', () => {
  it('should make SUBSCRIBE event and set event with the array empty', () => {
    const event = 'add';

    const eventManager = new EventManager();

    eventManager.subscribe(event);

    expect(eventManager.listeners.get(event)).toEqual([]);
  });

  it('should make SUBSCRIBE event and push listener on event existing', () => {
    const event = 'add';
    const listener = jest.fn();

    const eventManager = new EventManager();

    eventManager.listeners.set('add', []);

    eventManager.subscribe(event, listener);

    expect(eventManager.listeners.get(event)).toEqual([listener]);
  });

  it('should make EMIT event and return if non-exists event', () => {
    const event = 'add';
    const payload = {};

    const eventManager = new EventManager();

    eventManager.emit(event, payload);

    expect(eventManager.listeners.has(event)).toBeFalsy();
  });

  it('should make EMIT event and get event listerners by passing payload', () => {
    const event = 'add';
    const listener = jest.fn();

    const eventManager = new EventManager();

    eventManager.listeners.set(event, [listener]);

    const payload = {
      type: 'success',
      text: 'success',
      duration: 2000
    };

    eventManager.emit(event, payload);

    eventManager.listeners.get(event).forEach((item) => {
      expect(item).toHaveBeenCalledWith(payload);
    });
  });

  it('should make UNSUBSCRIBE event and return if non-exists event', () => {
    const event = 'add';
    const listenerToRemove = jest.fn();

    const eventManager = new EventManager();

    eventManager.unsubscribe(event, listenerToRemove);

    expect(eventManager.listeners.has(event)).toBeFalsy();
  });

  it('should make UNSUBSCRIBE event and remove listener received by parameter', () => {
    const event = 'add';
    const listener = jest.fn();
    const listenerToRemove = jest.fn();

    const eventManager = new EventManager();

    eventManager.listeners.set(event, [listenerToRemove, listener]);

    eventManager.unsubscribe(event, listenerToRemove);

    expect(eventManager.listeners.get(event)).toEqual([listener]);
  });
});
