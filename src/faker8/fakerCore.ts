import type { LocaleDefinition } from 'src';
import en from '../locales/en';
import type { Mersenne } from './mersenne';
import { default as newMersenne } from './mersenne';

export interface FakerCore {
  /**
   * @internal
   */
  readonly mersenne: Mersenne;
  readonly fork: () => FakerCore;
  readonly derive: () => FakerCore;
}

export interface LocalizedFakerCore extends FakerCore {
  readonly definitions: LocaleDefinition;
  readonly fork: () => LocalizedFakerCore;
  readonly derive: () => LocalizedFakerCore;
}

export function createFakerCore(mersenne?: Mersenne): FakerCore {
  mersenne = mersenne ?? newMersenne();
  return {
    mersenne,
    fork: () => createFakerCore(mersenne.fork()),
    derive: () => createFakerCore(mersenne.derive()),
  };
}

export function createLocalizedFakerCore(
  definitions: LocaleDefinition,
  mersenne?: Mersenne
): LocalizedFakerCore {
  mersenne = mersenne ?? newMersenne();
  return {
    mersenne,
    definitions,
    fork: () => createLocalizedFakerCore(definitions, mersenne.fork()),
    derive: () => createLocalizedFakerCore(definitions, mersenne.derive()),
  };
}

const mersenne = newMersenne();

export const fakerCore = createFakerCore(mersenne);
export const localizedFakerCore = createLocalizedFakerCore(en, mersenne);
