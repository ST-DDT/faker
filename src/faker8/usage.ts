import { faker } from '.';
import { bind, bindModules } from './bind';
import { bindDatatypeModule, datatypeFns } from './datatype';
import { numberFn } from './datatype/number';
import { fakerCore } from './fakerCore';
import { forkable } from './forkable';
import { helpersFns } from './helpers';
import { fakerPerson } from './person';
import { fakerFirstName } from './person/firstname';

const firstName = fakerFirstName();
const firstName2 = fakerPerson.firstName();
const firstName3 = faker.person.firstName();
console.log(firstName, firstName2, firstName3);

faker.fork().fork().person.firstName();

const fDataType = forkable(fakerCore, bindDatatypeModule);
fDataType.fork().fork().number();

const fNumber = forkable(fakerCore, (core) => bind(core, numberFn));

console.log(fNumber.fork().fork()());

const subSet = bindModules(fakerCore, {
  datatype: datatypeFns,
  helpers: helpersFns,
});

console.log(subSet.datatype.number());
