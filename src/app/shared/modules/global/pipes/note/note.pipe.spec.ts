import { NotePipe } from './note.pipe';

describe('NotePipe', () => {
  it('create an instance', () => {
    const pipe = new NotePipe(null);
    expect(pipe).toBeTruthy();
  });
});
