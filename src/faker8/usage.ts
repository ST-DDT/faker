import { faker } from '.';
import { bind, bindModules } from './bind';
import type { Datatype } from './datatype';
import { bindDatatypeModule, datatypeFns } from './datatype';
import { numberFn } from './datatype/number';
import { fakerCore } from './fakerCore';
import { forkable } from './forkable';
import type { Helpers } from './helpers';
import { helpersFns } from './helpers';
import { fakerPerson } from './person';
import { fakerFirstName } from './person/firstname';

const firstName = fakerFirstName();
const firstName2 = fakerPerson.firstName();
const firstName3 = faker.person.firstName();
console.log(firstName, firstName2, firstName3);

faker.fork().fork().person.firstName();

// Custom

const fDataType = forkable(fakerCore, bindDatatypeModule);
console.log(fDataType.fork().fork().number());

const fNumber = forkable(fakerCore, (core) => bind(core, numberFn));
console.log(fNumber.fork().fork()());

const subSet = bindModules<{ datatype: Datatype; helpers: Helpers }>(
  fakerCore,
  {
    datatype: datatypeFns,
    helpers: helpersFns,
  }
);

console.log(subSet.datatype.number());
