import type { FakerCore } from './fakerCore';

export type Forkable<T> = T & {
  fork: () => Forkable<T>;
  derive: () => Forkable<T>;
};

export function forkable<C extends FakerCore, T>(
  fakerCore: C,
  factory: (fakerCore: C) => T
): Forkable<T> {
  const result = factory(fakerCore);
  if (typeof result === 'object') {
    return {
      ...result,
      fork: () => forkable(fakerCore.fork() as C, factory),
      derive: () => forkable(fakerCore.derive() as C, factory),
    };
  } else if (typeof result === 'function') {
    const fn = result as unknown as Forkable<T>;
    fn.fork = () => forkable(fakerCore.fork() as C, factory);
    fn.derive = () => forkable(fakerCore.derive() as C, factory);
    return fn;
  }
}
