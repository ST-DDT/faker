import { fakerDatatype } from './datatype';
import type { Faker } from './faker';
import { bindFaker } from './faker';
import { localizedFakerCore } from './fakerCore';
import { fakerHelpers } from './helpers';
import { fakerPerson } from './person';

// Either
export const faker: Faker = bindFaker(localizedFakerCore);
// Or
export const faker2: Faker = {
  datatype: fakerDatatype,
  helpers: fakerHelpers,
  person: fakerPerson,
  fork: () => bindFaker(localizedFakerCore.fork()),
  derive: () => bindFaker(localizedFakerCore.derive()),
};
