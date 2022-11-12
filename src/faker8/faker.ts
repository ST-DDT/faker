import { bindModules } from './bind';
import type { Datatype } from './datatype';
import { datatypeFns } from './datatype';
import type { LocalizedFakerCore } from './fakerCore';
import type { Forkable } from './forkable';
import { forkable } from './forkable';
import type { Helpers } from './helpers';
import { helpersFns } from './helpers';
import type { Person } from './person';
import { personFns } from './person';

export const fnsModules = {
  datatype: datatypeFns,
  helpers: helpersFns,
  person: personFns,
};

export type FakerModules = {
  datatype: Datatype;
  helpers: Helpers;
  person: Person;
};

export type Faker = Forkable<FakerModules>;

/**
 * Creates a new faker instance that is bound to the given faker core.
 *
 * @param fakerCore The faker core to bind the module to.
 */
export function bindFaker(fakerCore: LocalizedFakerCore): Faker {
  return forkable(fakerCore, (core) =>
    bindModules<FakerModules>(core, fnsModules)
  );
}
