import { Jwt } from './jwt';

describe('Jwt', () => {
  it('should be defined', () => {
    expect(new Jwt()).toBeDefined();
  });
});
