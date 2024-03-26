/**
 * Compute predicted ERS/ATS values
 *
 * Normes ERS/ATS. The European Respiratory Society (ERS)/American Thoracic Society (ATS)
 * source: Quanjer and al. Lung Volumes and Forced Ventilatory Flows, 1993.
 */
// prettier-ignore
export class PredictedErsAts {
  /**
   *
   * @param boolean isMan vems  — true
   * @param integer height (cm) — 175
   * @param integer age         — 28
   */
  static fev1(isMan, height, age) {
    height /= 100;

    if (isMan) {
      return 4.301 * height - 0.029 * age - 2.492;
    }
    return 3.953 * height - 0.025 * age - 2.604;
  }

  /**
   * cvf
   * @param boolean isMan
   * @param integer height (cm)
   * @param integer age
   */
  static fvc(isMan, height, age) {
    height /= 100;

    if (isMan) {
      return 5.757 * height - 0.026 * age - 4.345;
    }
    return 4.426 * height - 0.026 * age - 2.887;
  }

  /**
   * dlcoMlco
   * @param boolean isMan
   * @param integer height (cm)
   * @param integer age
   */
  static dlco(isMan, height, age) {
    height /= 100;

    if (isMan) {
      return 33.21 * height - 0.197 * age - 18.029;
    }
    return 24.458 * height - 0.148 * age - 8.192;
  }

  /**
   * kcoKpa
   * @param boolean isMan
   * @param integer height (cm)
   * @param integer age
   */
  static dlcoKpa(isMan, height, age) {
    const dlcoMlco = PredictedErsAts.dlco(...arguments);

    return dlcoMlco * 0.3348;
  }

  /**
   * vaHelium
   * @param boolean isMan
   * @param integer height (cm)
   * @param integer age
   */
  static avHelium(isMan, height, age) {
    height /= 100;

    if (isMan) {
      return 7.992 * height - 7.081;
    }
    return 6.602 * height - 5.791;
  }

  /**
   * crf
   * @param boolean isMan
   * @param integer height (cm)
   * @param integer age
   */
  static frc(isMan, height, age) {
    height /= 100;

    if (isMan) {
      return 2.348 * height + 0.009 * age - 1.093;
    }
    return 2.245 * height + 0.001 * age - 1.003;
  }

  /**
   * vr
   * @param boolean isMan
   * @param integer height (cm)
   * @param integer age
   */
  static tc(isMan, height, age) {
    height /= 100;

    if (isMan) {
      return 1.31 * height + 0.022 * age - 1.232;
    }
    return 1.81 * height + 0.016 * age - 2;
  }

  /**
   * cpt
   * @param boolean isMan
   * @param integer height (cm)
   * @param integer age
   */
  static tlc(isMan, height, age) {
    height /= 100;

    if (isMan) {
      return 7.992 * height - 7.081;
    }
    return 6.602 * height - 5.791;
  }

  /**
   * vrCpt
   * @param boolean isMan
   * @param integer height (cm)
   * @param integer age
   */
  static tvTlc(isMan, height, age) {
    height /= 100;

    if (isMan) {
      return 0.39 * age + 13.96;
    }
    return 0.34 * age + 18.96;
  }

  /**
   * demmGli
   * @param boolean isMan
   * @param integer height (cm)
   * @param integer age
   */
  static mmfr(isMan, height, age) {
    if (isMan) {
      return 0.0194 * height - 0.043 * age + 2.7;
    }
    return 0.0125 * height - 0.034 * age + 2.92;
  }
}
