import { validateId, validateName} from '../src/controllers/dutyController';

test('test id', () => {
    expect(validateId("1")).toBe(true);
    expect(validateId("2")).toBe(true);
    expect(validateId("-1")).toBe(false);
    expect(validateId("abc")).toBe(false);
    expect(validateId("")).toBe(false);
  });



test('test name', () => {
  expect(validateName("Wash the dishes")).toBe(true);
  expect(validateName("Sweep the floor!")).toBe(false);
  expect(validateName("     ")).toBe(false);
  expect(validateName("@#$^#$^*%^*")).toBe(false);
  expect(validateName("")).toBe(false);
});

  