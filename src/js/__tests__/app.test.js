import Table from '../app';

test('not element', () => {
  expect(() => new Table(null)).toThrowError(new Error('Элемент не существует'));
});
