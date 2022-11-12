import { bind } from '../bind';
import { numberFn } from '../datatype/number';
import type { FakerCore } from '../fakerCore';
import { fakerCore } from '../fakerCore';

/**
 * Returns a random element from the given array.
 *
 * @template T The type of the entries to pick from.
 * @param fakerCore The faker core to use.
 * @param values The array to pick the value from.
 *
 * @example
 * fakerArrayElement(['cat', 'dog', 'mouse']) // 'dog'
 *
 * @since 8.0.0
 */
export function arrayElementFn<T>(fakerCore: FakerCore, values: T[]): T {
  const { length } = values;
  const index = numberFn(fakerCore, { min: 0, max: length - 1 });
  return values[index];
}

// The following part is generated by `pnpm run generate:some-script`

/**
 * Returns a random element from the given array.
 *
 * @template T The type of the entries to pick from.
 * @param values The array to pick the value from.
 *
 * @example
 * fakerArrayElement(['cat', 'dog', 'mouse']) // 'dog'
 *
 * @since 8.0.0
 */
export const fakerArrayElement: <T>(values: T[]) => T = bind(
  fakerCore,
  arrayElementFn
);
