import { isNone } from '@ember/utils';
import Msplines from './msplines';

/**
 * Compute predicted GLI values
 *
 * Normes GLI. Global Lung Function Initiative (GLI)
 * source: Guillien and al. Les nouvelles équations de référence du GLI pour les explorations fonctionnelles respiratoires, 2018.
 */
// prettier-ignore
export class PredictedGLI {
  /**
   * vemsGli
   * @param boolean isMan       — true
   * @param integer height (cm) — 175
   * @param float exactAge      — 28.1234
   */
  static fev1(isMan, height, exactAge) {
    const splineValue = Msplines.ForcedExpiratortVolume1secGli.for(exactAge, isMan);
    if (isNone(splineValue)) return;

    if (isMan) {
      return Math.exp(
        -10.342 +
          2.2196 * Math.log(height) +
          0.0574 * Math.log(exactAge) +
          splineValue
      );
    }
    return Math.exp(
      -9.6987 +
        2.1211 * Math.log(height) +
        -0.027 * Math.log(exactAge) +
        splineValue
    );
  }

  /**
   * cvfGli
   * @param boolean isMan
   * @param integer height (cm)
   * @param float exactAge
   */
  static fvc(isMan, height, exactAge) {
    const splineValue = Msplines.ForcedVitalCapacityGli.for(exactAge, isMan);
    if (isNone(splineValue)) return;

    if (isMan) {
      return Math.exp(
        -11.2281 +
          2.4135 * Math.log(height) +
          0.0865 * Math.log(exactAge) +
          splineValue
      );
    }
    return Math.exp(
      -10.403 +
        2.2633 * Math.log(height) +
        0.0234 * Math.log(exactAge) +
        splineValue
    );
  }

  /**
   * dlcoMlcoGli
   * @param boolean isMan
   * @param integer height (cm)
   * @param float exactAge
   */
  static dlco(isMan, height, exactAge) {
    const splineValue = Msplines.DLCOMlcoGli.for(exactAge, isMan);
    if (isNone(splineValue)) return;

    if (isMan) {
      return Math.exp(
        -7.03492 +
          2.018368 * Math.log(height) -
          0.012425 * Math.log(exactAge) +
          splineValue
      );
    }
    return Math.exp(
      -5.159451 +
        1.618697 * Math.log(height) -
        0.01539 * Math.log(exactAge) +
        splineValue
    );
  }

  /**
   * kcoMlcoGli
   * @param boolean isMan
   * @param integer height (cm)
   * @param float exactAge
   */
  static kcoMlco(isMan, height, exactAge) {
    const splineValue = Msplines.KCOMlcoMspline.for(exactAge, isMan);
    if (isNone(splineValue)) return;

    if (isMan) {
      return Math.exp(
        4.088408 -
          0.415334 * Math.log(height) -
          0.113166 * Math.log(exactAge) +
          splineValue
      );
    }
    return Math.exp(
      5.131492 -
        0.645656 * Math.log(height) -
        0.097395 * Math.log(exactAge) +
        splineValue
    );
  }

  /**
   * kcoKpaGli
   * @param boolean isMan
   * @param integer height (cm)
   * @param float exactAge
   */
  static kcoKpa(isMan, height, exactAge) {
    const splineValue = Msplines.KCOKpaGli.for(exactAge, isMan);
    if (isNone(splineValue)) return;

    if (isMan) {
      return Math.exp(
        2.994137 -
          0.415334 * Math.log(height) -
          0.113166 * Math.log(exactAge) +
          splineValue
      );
    }
    return Math.exp(
      4.037222 -
        0.645656 * Math.log(height) -
        0.097395 * Math.log(exactAge) +
        splineValue
    );
  }

  /**
   * vaHeliumGli
   * @param boolean isMan
   * @param integer height (cm)
   * @param float exactAge
   */
  static avHelium(isMan, height, exactAge) {
    const splineValue = Msplines.AlveolarVolumeHeliumGli.for(exactAge, isMan);
    if (isNone(splineValue)) return;

    if (isMan) {
      return Math.exp(
        -11.086573 +
          2.430021 * Math.log(height) +
          0.097047 * Math.log(exactAge) +
          splineValue
      );
    }
    return Math.exp(
      -9.87397 +
        2.182316 * Math.log(height) +
        0.082868 * Math.log(exactAge) +
        splineValue
    );
  }

  /**
   * crfGli
   * @param boolean isMan
   * @param integer height (cm)
   * @param float exactAge
   */
  static frc(isMan, height, exactAge) {
    const splineValue = Msplines.FunctionalResidualCapacityGli.for(exactAge, isMan);
    if (isNone(splineValue)) return;

    if (isMan) {
      return Math.exp(
        -13.4898 +
          0.1111 * Math.log(exactAge) +
          2.7634 * Math.log(height) +
          splineValue
      );
    }
    return Math.exp(
      -12.7674 +
        0.1251 * Math.log(exactAge) +
        2.6049 * Math.log(height) +
        splineValue
    );
  }

  /**
   * vrGli
   * @param boolean isMan
   * @param integer height (cm)
   * @param float exactAge
   */
  static tc(isMan, height, exactAge) {
    const splineValue = Msplines.TidalVolumeGli.for(exactAge, isMan);
    if (isNone(splineValue)) return;

    if (isMan) {
      return Math.exp(
        -2.37211 +
          0.01346 * exactAge +
          0.01307 * height +
          splineValue
      );
    }
    return Math.exp(
      -2.50593 +
        0.01307 * exactAge +
        0.01379 * height +
        splineValue
    );
  }

  /**
   * cptGli
   * @param boolean isMan
   * @param integer height (cm)
   * @param float exactAge
   */
  static tlc(isMan, height, exactAge) {
    const splineValue = Msplines.TotalLungCapacityGli.for(exactAge, isMan);
    if (isNone(splineValue)) return;

    if (isMan) {
      return Math.exp(
        -10.5861 +
          0.1433 * Math.log(exactAge) +
          2.3155 * Math.log(height) +
          splineValue
      );
    }
    return Math.exp(
      -10.1128 +
        0.1062 * Math.log(exactAge) +
        2.2259 * Math.log(height) +
        splineValue
    );
  }

  /**
   * vrCptGli
   * @param boolean isMan
   * @param integer height (cm)
   * @param float exactAge
   */
  static tvTlc(isMan, height, exactAge) {
    const splineValue = Msplines.TvTlcRatioGli.for(exactAge, isMan);
    if (isNone(splineValue)) return;

    if (isMan) {
      return Math.exp(
        2.634 +
          0.01302 * exactAge -
          0.00008862 * height +
          splineValue
      );
    }
    return Math.exp(
      2.666 +
        0.01411 * exactAge -
        0.00003689 * height +
        splineValue
    );
  }

  /**
   * ciGli
   * @param boolean isMan
   * @param integer height (cm)
   * @param float exactAge
   */
  static ic(isMan, height, exactAge) {
    const splineValue = Msplines.InspiratoryCapacityGli.for(exactAge, isMan);
    if (isNone(splineValue)) return;

    if (isMan) {
      return Math.exp(
        -10.121688 +
          0.001265 * exactAge +
          2.188801 * Math.log(height) +
          splineValue
      );
    }
    return Math.exp(
      -9.4438787 -
        0.0002484 * exactAge +
        2.0312769 * Math.log(height) +
        splineValue
    );
  }

  /**
   * vreGli
   * @param boolean isMan
   * @param integer height (cm)
   * @param float exactAge
   */
  static erv(isMan, height, exactAge) {
    const splineValue = Msplines.ExpiratoryReserveVolumeGli.for(exactAge, isMan);
    if (isNone(splineValue)) return;

    if (isMan) {
      return Math.exp(
        -17.32865 -
          0.006288 * exactAge +
          3.478116 * Math.log(height) +
          splineValue
      );
    }
    return Math.exp(
      -14.145513 -
        0.009573 * exactAge +
        2.871446 * Math.log(height) +
        splineValue
    );
  }

  /**
   * demmGli
   * @param boolean isMan
   * @param integer height (cm)
   * @param float exactAge
   */
  static mmfr(isMan, height, exactAge) {
    const splineValue = Msplines.MaximumMidexpiratoryFlowRateGli.for(exactAge, isMan);
    if (isNone(splineValue)) return;

    if (isMan) {
      return Math.exp(
        -6.91893 +
          1.689511 * Math.log(height) +
          -0.14248 * Math.log(exactAge) +
          splineValue
      );
    }
    return Math.exp(
      -5.16817 +
        1.40662 * Math.log(height) +
        -0.26175 * Math.log(exactAge) +
        splineValue
    );
  }
}
