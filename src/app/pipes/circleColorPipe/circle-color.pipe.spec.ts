import { CircleColorPipe } from './circle-color.pipe';

describe('CircleColorPipe', () => {
  it('create an instance', () => {
    const pipe = new CircleColorPipe();
    expect(pipe).toBeTruthy();
  });

  it('returns "afterDeadline" if dueDay === 0', () => {
    const pipe = new CircleColorPipe();
    expect(pipe.transform(0)).toBe('afterDeadline');
  });

  it('returns "afterDeadline" if dueDay < 0', () => {
    const pipe = new CircleColorPipe();
    expect(pipe.transform(-5)).toBe('afterDeadline');
  });

  it('returns "closeDeadline" if dueDay >= 1 && dueDay <= 2', () => {
    const pipe = new CircleColorPipe();
    expect(pipe.transform(2)).toBe('closeToDeadline');
  });

  it('returns "moreThanTwoDaysLeft" if dueDay > 2', () => {
    const pipe = new CircleColorPipe();
    expect(pipe.transform(10)).toBe('moreThanTwoDaysLeft');
  });
});
