import { isEmpty } from '@ember/utils';
import { LookupError } from 'dacapo-front/utils/errors';

/**
 * Abstract class to compute Mspline based on
 * age, gender and a specific predicted GLI measure.
 */
export default class MsplineLookup {
  static getAgeBoundaries(age) {
    const ageTrunc = parseInt(age);
    let ageBelow;
    let ageAbove;
    for (let pad = 0; pad < 1; ) {
      if (ageTrunc + pad <= age && ageTrunc + pad + 0.25 > age) {
        ageBelow = ageTrunc + pad;
        ageAbove = ageBelow + 0.25;
        break;
      }
      pad += 0.25;
    }
    return { ageBelow, ageAbove };
  }

  static for(exactAge, isMan) {
    if (isEmpty(exactAge)) {
      throw new LookupError('Missing: age');
    }
    if (exactAge < this.ageMin) {
      throw new LookupError('Cannot predict value for age < ' + this.ageMin);
    }
    if (exactAge > this.ageMax) {
      throw new LookupError('Cannot predict value for age > ' + this.ageMax);
    }

    const lookup = isMan ? this.menLookup : this.womenLookup;

    if (String(exactAge) in lookup) {
      return lookup[String(exactAge)];
    }
    const { ageBelow, ageAbove } = this.getAgeBoundaries(exactAge);
    return (
      lookup[ageBelow] + ((exactAge - ageBelow) / 0.25) * (lookup[ageAbove] - lookup[ageBelow])
    );
  }
}
