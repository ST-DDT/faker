import type { FakerCore, LocalizedFakerCore } from './fakerCore';

type FakerFunction = (...args: any[]) => unknown;
type FakerModule = Record<string, FakerFunction>;
type FakerModules = Record<string, FakerModule>;

type FakerFn<C extends FakerCore, P extends unknown[], R> = (
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

type FakerFnModules<C extends FakerCore, M extends FakerModules> = {
  [K in keyof M]: FakerFnModule<C, M[K]>;
};

/**
 * Binds the given function to the given faker core.
 *
 * @param fakerCore The faker core to bind the function to.
 * @param fn The function to bind.
 *
 * @example
 * const customFunction = bind(fakerCore, arrayElementFn);
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
 * const customModule = bindModule<Datatype>(fakerCore, datatypeFns);
 *
 * @since 8.0.0
 */
export function bindModule<M extends FakerModule>(
  fakerCore: FakerCore,
  module: FakerFnModule<FakerCore, M>
): M;
export function bindModule<M extends FakerModule>(
  fakerCore: LocalizedFakerCore,
  module: FakerFnModule<LocalizedFakerCore, M>
): M;
export function bindModule<M extends FakerModule, C extends FakerCore>(
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
 * const customModules = bindModules<{ datatype: Datatype }>(fakerCore, { datatype: datatypeFns });
 *
 * @since 8.0.0
 */
export function bindModules<Modules extends FakerModules>(
  fakerCore: FakerCore,
  modules: FakerFnModules<FakerCore, Modules>
): Modules;
export function bindModules<Modules extends FakerModules>(
  fakerCore: LocalizedFakerCore,
  modules: FakerFnModules<LocalizedFakerCore, Modules>
): Modules;
export function bindModules<
  Modules extends FakerModules,
  Core extends FakerCore
>(fakerCore: Core, modules: FakerFnModules<Core, Modules>): Modules {
  return Object.fromEntries(
    Object.entries(modules).map(([key, value]) => {
      return [key, bindModule(fakerCore, value)];
    })
  ) as Modules;
}
