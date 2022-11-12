import type { FakerCore } from './fakerCore';

export type FakerFn<C extends FakerCore, P extends unknown[], R> = (
  core: C,
  ...args: P
) => R;

type FakerFnFor<C extends FakerCore, F extends FakerFunction> = FakerFn<
  C,
  Parameters<F>,
  ReturnType<F>
>;

type FakerFnModule<C extends FakerCore, M extends FakerModule> = {
  [K in keyof M]: FakerFnFor<C, M[K]>;
};

type FakerFnModules<
  C extends FakerCore,
  M extends Record<string, FakerModule>
> = {
  [K in keyof M]: FakerFnModule<C, M[K]>;
};

type FakerFunction = (...args: any[]) => unknown;
export type FakerModule = Record<string, FakerFunction>;
export type FakerModules = Record<string, FakerModule>;

/**
 * Binds the given function to the given faker core.
 *
 * @param fakerCore The faker core to bind the function to.
 * @param fn The function to bind.
 *
 * @example
 * const firstNameFunction = bind(fakerCore, fistNameFn);
 *
 * @since 8.0.0
 */
export function bind<C extends FakerCore, P extends any[], R>(
  fakerCore: C,
  fn: FakerFn<C, P, R>
): (...args: P) => R {
  return (...args: P) => fn(fakerCore.fork() as C, ...args);
}

/**
 * Binds the given module to the given faker core.
 *
 * @param fakerCore The faker core to bind the module to.
 * @param module The module to bind.
 *
 * @example
 * const nameModule = bindModule(fakerCore, nameFns);
 *
 * @since 8.0.0
 */
export function bindModule<C extends FakerCore, M extends FakerModule>(
  fakerCore: C,
  module: FakerFnModule<C, M>
): M {
  return Object.fromEntries(
    Object.entries(module).map(([key, value]) => {
      return [key, bind(fakerCore, value)];
    })
  ) as M;
}

/**
 * Binds the given modules to the given faker core.
 *
 * @param fakerCore The faker core to bind the modules to.
 * @param modules The modules to bind.
 *
 * @example
 * const nameModule = bindModule(fakerCore, { name: nameFns });
 *
 * @since 8.0.0
 */
export function bindModules<
  C extends FakerCore,
  M extends Record<string, FakerModule>
>(fakerCore: C, modules: FakerFnModules<C, M>): M {
  return Object.fromEntries(
    Object.entries(modules).map(([key, value]) => {
      return [key, bindModule(fakerCore, value)];
    })
  ) as M;
}
