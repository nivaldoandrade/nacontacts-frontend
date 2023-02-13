import toast, { toastEventManager } from './toast';

describe('Toast Util', () => {
  it('should add toast', () => {
    const event = {
      type: 'success',
      text: 'success',
      duration: 2000
    };

    const emitSpy = jest.spyOn(toastEventManager, 'emit');

    toast(event);

    expect(emitSpy).toHaveBeenCalledWith('addtoast', event);
  });
});
