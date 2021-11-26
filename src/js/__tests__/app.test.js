import { Field } from '../app';

test('not element', () => {
  expect(new Field('')).toThrowError('Элемент не существует');
});
