import MsplineLookup from './abstract';

/**
 * Expiratory reserve volume (ERV)
 * Volume de réserve expiratoire (VRE)
 *
 * Unit: L BTPS
 */
export default class ExpiratoryReserveVolumeMspline extends MsplineLookup {
  static ageMin = 5;
  static ageMax = 80;
  static menLookup = {
    5: -0.182072519,
    5.25: -0.178602757,
    5.5: -0.175132996,
    5.75: -0.171663234,
    6: -0.168193472,
    6.25: -0.16472371,
    6.5: -0.161253948,
    6.75: -0.157784186,
    7: -0.154314424,
    7.25: -0.150844662,
    7.5: -0.1473749,
    7.75: -0.143905138,
    8: -0.140435376,
    8.25: -0.136965614,
    8.5: -0.133495852,
    8.75: -0.130026419,
    9: -0.12655785,
    9.25: -0.123090418,
    9.5: -0.119624409,
    9.75: -0.116160103,
    10: -0.11269778,
    10.25: -0.109237723,
    10.5: -0.105780211,
    10.75: -0.102325528,
    11: -0.098873953,
    11.25: -0.095425768,
    11.5: -0.091981254,
    11.75: -0.088540729,
    12: -0.085105325,
    12.25: -0.081676971,
    12.5: -0.078257629,
    12.75: -0.074849261,
    13: -0.071453831,
    13.25: -0.068073301,
    13.5: -0.064709632,
    13.75: -0.061364789,
    14: -0.058040733,
    14.25: -0.054739427,
    14.5: -0.051462832,
    14.75: -0.048212913,
    15: -0.044991631,
    15.25: -0.041800948,
    15.5: -0.038642829,
    15.75: -0.035519213,
    16: -0.032431934,
    16.25: -0.029382789,
    16.5: -0.026373571,
    16.75: -0.023406078,
    17: -0.020482104,
    17.25: -0.017603443,
    17.5: -0.01477189,
    17.75: -0.011989246,
    18: -0.009257314,
    18.25: -0.006577797,
    18.5: -0.003952454,
    18.75: -0.00138333,
    19: 0.00112752,
    19.25: 0.00357826,
    19.5: 0.005967917,
    19.75: 0.008295739,
    20: 0.010560969,
    20.25: 0.012762995,
    20.5: 0.014901768,
    20.75: 0.01697738,
    21: 0.018989924,
    21.25: 0.020939464,
    21.5: 0.022825958,
    21.75: 0.024649337,
    22: 0.026409529,
    22.25: 0.028106456,
    22.5: 0.029739995,
    22.75: 0.031310014,
    23: 0.032816382,
    23.25: 0.034259077,
    23.5: 0.035638522,
    23.75: 0.036955249,
    24: 0.038209792,
    24.25: 0.039402738,
    24.5: 0.040534883,
    24.75: 0.041607081,
    25: 0.042620182,
    25.25: 0.043575026,
    25.5: 0.044472401,
    25.75: 0.045313084,
    26: 0.046097853,
    26.25: 0.046827485,
    26.5: 0.047502767,
    26.75: 0.048124486,
    27: 0.04869343,
    27.25: 0.0492104,
    27.5: 0.049676236,
    27.75: 0.050091792,
    28: 0.050457922,
    28.25: 0.050775483,
    28.5: 0.051045346,
    28.75: 0.051268385,
    29: 0.051445474,
    29.25: 0.051577488,
    29.5: 0.051665296,
    29.75: 0.051709766,
    30: 0.05171177,
    30.25: 0.051672174,
    30.5: 0.051591851,
    30.75: 0.05147167,
    31: 0.051312502,
    31.25: 0.051115218,
    31.5: 0.050880685,
    31.75: 0.05060977,
    32: 0.050303341,
    32.25: 0.049962265,
    32.5: 0.049587407,
    32.75: 0.049179634,
    33: 0.048739812,
    33.25: 0.048268808,
    33.5: 0.04776749,
    33.75: 0.047236727,
    34: 0.046677387,
    34.25: 0.046090337,
    34.5: 0.045476438,
    34.75: 0.044836551,
    35: 0.044171535,
    35.25: 0.043482368,
    35.5: 0.042770511,
    35.75: 0.042037624,
    36: 0.041285376,
    36.25: 0.040515435,
    36.5: 0.03972947,
    36.75: 0.038929149,
    37: 0.038116138,
    37.25: 0.037292106,
    37.5: 0.036458721,
    37.75: 0.03561765,
    38: 0.034770561,
    38.25: 0.033919122,
    38.5: 0.033065001,
    38.75: 0.032209866,
    39: 0.031355381,
    39.25: 0.030502877,
    39.5: 0.02965302,
    39.75: 0.028806403,
    40: 0.027963618,
    40.25: 0.027125255,
    40.5: 0.026291906,
    40.75: 0.025464162,
    41: 0.024642615,
    41.25: 0.023827857,
    41.5: 0.023020478,
    41.75: 0.022221071,
    42: 0.021430227,
    42.25: 0.020648536,
    42.5: 0.019876591,
    42.75: 0.019114984,
    43: 0.018364264,
    43.25: 0.017624464,
    43.5: 0.016895251,
    43.75: 0.016176284,
    44: 0.015467224,
    44.25: 0.014767731,
    44.5: 0.014077463,
    44.75: 0.013396083,
    45: 0.012723248,
    45.25: 0.01205862,
    45.5: 0.011401858,
    45.75: 0.010752622,
    46: 0.010110572,
    46.25: 0.009475368,
    46.5: 0.00884667,
    46.75: 0.008224137,
    47: 0.007607574,
    47.25: 0.006997303,
    47.5: 0.006393773,
    47.75: 0.005797429,
    48: 0.005208717,
    48.25: 0.004628082,
    48.5: 0.004055972,
    48.75: 0.003492832,
    49: 0.002939108,
    49.25: 0.002395246,
    49.5: 0.001861692,
    49.75: 0.001338892,
    50: 0.000827293,
    50.25: 0.00032734,
    50.5: -0.000160521,
    50.75: -0.000635873,
    51: -0.001099305,
    51.25: -0.001552652,
    51.5: -0.001997826,
    51.75: -0.002436738,
    52: -0.0028713,
    52.25: -0.003303423,
    52.5: -0.003735017,
    52.75: -0.004167996,
    53: -0.00460427,
    53.25: -0.005045751,
    53.5: -0.005494349,
    53.75: -0.005951978,
    54: -0.006420547,
    54.25: -0.006901969,
    54.5: -0.007398154,
    54.75: -0.007910822,
    55: -0.008440307,
    55.25: -0.008986343,
    55.5: -0.009548661,
    55.75: -0.010126993,
    56: -0.010721069,
    56.25: -0.01133062,
    56.5: -0.011955378,
    56.75: -0.012595074,
    57: -0.013249438,
    57.25: -0.013918202,
    57.5: -0.014601096,
    57.75: -0.015297853,
    58: -0.016008202,
    58.25: -0.016731876,
    58.5: -0.017468601,
    58.75: -0.018217397,
    59: -0.018975707,
    59.25: -0.019740762,
    59.5: -0.020509794,
    59.75: -0.021280034,
    60: -0.022048714,
    60.25: -0.022813064,
    60.5: -0.023570317,
    60.75: -0.024317703,
    61: -0.025052453,
    61.25: -0.0257718,
    61.5: -0.026472975,
    61.75: -0.027153208,
    62: -0.027809732,
    62.25: -0.028439777,
    62.5: -0.029040626,
    62.75: -0.029610351,
    63: -0.030147642,
    63.25: -0.030651207,
    63.5: -0.031119753,
    63.75: -0.031551988,
    64: -0.031946618,
    64.25: -0.032302352,
    64.5: -0.032617897,
    64.75: -0.03289196,
    65: -0.033123248,
    65.25: -0.03331047,
    65.5: -0.033452332,
    65.75: -0.033547541,
    66: -0.033594806,
    66.25: -0.033592834,
    66.5: -0.033540643,
    66.75: -0.033438565,
    67: -0.033287271,
    67.25: -0.033087437,
    67.5: -0.032839736,
    67.75: -0.032544841,
    68: -0.032203426,
    68.25: -0.031816165,
    68.5: -0.031383731,
    68.75: -0.030906799,
    69: -0.030386042,
    69.25: -0.029822133,
    69.5: -0.029215747,
    69.75: -0.028567557,
    70: -0.027878236,
    70.25: -0.027148461,
    70.5: -0.026379014,
    70.75: -0.025570825,
    71: -0.024724833,
    71.25: -0.02384198,
    71.5: -0.022923206,
    71.75: -0.02196945,
    72: -0.020981655,
    72.25: -0.01996076,
    72.5: -0.018907705,
    72.75: -0.017823431,
    73: -0.016708878,
    73.25: -0.015564987,
    73.5: -0.014392699,
    73.75: -0.013192953,
    74: -0.01196669,
    74.25: -0.010714852,
    74.5: -0.009438394,
    74.75: -0.008138275,
    75: -0.006815456,
    75.25: -0.005470898,
    75.5: -0.004105561,
    75.75: -0.002720405,
    76: -0.00131639,
    76.25: 0.000105522,
    76.5: 0.001544371,
    76.75: 0.002999198,
    77: 0.004469041,
    77.25: 0.005952941,
    77.5: 0.007449936,
    77.75: 0.008959067,
    78: 0.010479372,
    78.25: 0.012009995,
    78.5: 0.013550334,
    78.75: 0.015099828,
    79: 0.016657915,
    79.25: 0.018224035,
    79.5: 0.019797626,
    79.75: 0.021378126,
    80: 0.022964973,
  };
  static womenLookup = {
    5: -0.391394993,
    5.25: -0.385966017,
    5.5: -0.380537041,
    5.75: -0.375108065,
    6: -0.369679089,
    6.25: -0.364250113,
    6.5: -0.358821137,
    6.75: -0.353392161,
    7: -0.347963185,
    7.25: -0.34253421,
    7.5: -0.337105259,
    7.75: -0.331676359,
    8: -0.326247525,
    8.25: -0.320818772,
    8.5: -0.315390113,
    8.75: -0.309961563,
    9: -0.304533136,
    9.25: -0.29910485,
    9.5: -0.293676718,
    9.75: -0.288248755,
    10: -0.282820976,
    10.25: -0.277393397,
    10.5: -0.271966031,
    10.75: -0.266538977,
    11: -0.261112958,
    11.25: -0.255688993,
    11.5: -0.250268102,
    11.75: -0.244851303,
    12: -0.239439616,
    12.25: -0.234034062,
    12.5: -0.228635658,
    12.75: -0.223245425,
    13: -0.217864382,
    13.25: -0.212493549,
    13.5: -0.207133945,
    13.75: -0.20178659,
    14: -0.196452503,
    14.25: -0.191132703,
    14.5: -0.185828211,
    14.75: -0.180540044,
    15: -0.175269233,
    15.25: -0.170016896,
    15.5: -0.164784213,
    15.75: -0.159572365,
    16: -0.154382532,
    16.25: -0.149215894,
    16.5: -0.144073632,
    16.75: -0.138956926,
    17: -0.133866957,
    17.25: -0.128804905,
    17.5: -0.123771949,
    17.75: -0.118769272,
    18: -0.113798052,
    18.25: -0.108859471,
    18.5: -0.103954708,
    18.75: -0.099084945,
    19: -0.09425136,
    19.25: -0.089455149,
    19.5: -0.084697026,
    19.75: -0.079977459,
    20: -0.075296915,
    20.25: -0.070655857,
    20.5: -0.066054732,
    20.75: -0.06149398,
    21: -0.056974043,
    21.25: -0.052495364,
    21.5: -0.048058399,
    21.75: -0.043663606,
    22: -0.039311443,
    22.25: -0.03500236,
    22.5: -0.030736781,
    22.75: -0.026515123,
    23: -0.022337802,
    23.25: -0.01820527,
    23.5: -0.014118125,
    23.75: -0.010077,
    24: -0.006082529,
    24.25: -0.002135366,
    24.5: 0.001763737,
    24.75: 0.005614009,
    25: 0.009414678,
    25.25: 0.013164978,
    25.5: 0.016864172,
    25.75: 0.020511529,
    26: 0.024106321,
    26.25: 0.027647816,
    26.5: 0.031135284,
    26.75: 0.034567995,
    27: 0.03794522,
    27.25: 0.041266206,
    27.5: 0.044530117,
    27.75: 0.047736097,
    28: 0.050883288,
    28.25: 0.053970778,
    28.5: 0.056997439,
    28.75: 0.059962086,
    29: 0.062863536,
    29.25: 0.065700615,
    29.5: 0.068472186,
    29.75: 0.071177124,
    30: 0.073814302,
    30.25: 0.07638259,
    30.5: 0.078880845,
    30.75: 0.081307922,
    31: 0.083662674,
    31.25: 0.085943958,
    31.5: 0.088150648,
    31.75: 0.090281617,
    32: 0.092335742,
    32.25: 0.094311959,
    32.5: 0.096209444,
    32.75: 0.098027433,
    33: 0.099765162,
    33.25: 0.101421864,
    33.5: 0.102996765,
    33.75: 0.104489086,
    34: 0.105898047,
    34.25: 0.107222873,
    34.5: 0.108462787,
    34.75: 0.109617015,
    35: 0.110684783,
    35.25: 0.111665317,
    35.5: 0.11255784,
    35.75: 0.113361577,
    36: 0.114075753,
    36.25: 0.114699593,
    36.5: 0.115232827,
    36.75: 0.115676635,
    37: 0.116032461,
    37.25: 0.116301746,
    37.5: 0.116485933,
    37.75: 0.116586464,
    38: 0.116604782,
    38.25: 0.116542328,
    38.5: 0.116400545,
    38.75: 0.116180875,
    39: 0.11588476,
    39.25: 0.115513643,
    39.5: 0.115068965,
    39.75: 0.11455217,
    40: 0.113964699,
    40.25: 0.113307995,
    40.5: 0.1125835,
    40.75: 0.111792484,
    41: 0.110935526,
    41.25: 0.110013033,
    41.5: 0.109025408,
    41.75: 0.107973057,
    42: 0.106856384,
    42.25: 0.105675795,
    42.5: 0.104431695,
    42.75: 0.103124488,
    43: 0.10175458,
    43.25: 0.100322376,
    43.5: 0.09882828,
    43.75: 0.097272697,
    44: 0.095656033,
    44.25: 0.093978693,
    44.5: 0.092241081,
    44.75: 0.090443603,
    45: 0.088586682,
    45.25: 0.086670848,
    45.5: 0.084696672,
    45.75: 0.08266472,
    46: 0.080575561,
    46.25: 0.078429763,
    46.5: 0.076227895,
    46.75: 0.073970525,
    47: 0.071658222,
    47.25: 0.069291553,
    47.5: 0.066871087,
    47.75: 0.064397393,
    48: 0.061871038,
    48.25: 0.059292592,
    48.5: 0.056662622,
    48.75: 0.053981697,
    49: 0.051250385,
    49.25: 0.048469491,
    49.5: 0.045641746,
    49.75: 0.042770808,
    50: 0.039860344,
    50.25: 0.036914019,
    50.5: 0.033935501,
    50.75: 0.030928456,
    51: 0.027896549,
    51.25: 0.024843447,
    51.5: 0.021772816,
    51.75: 0.018688323,
    52: 0.015593633,
    52.25: 0.012492413,
    52.5: 0.009388329,
    52.75: 0.006285047,
    53: 0.003186234,
    53.25: 9.56e-5,
    53.5: -0.00298339,
    53.75: -0.006047804,
    54: -0.009095418,
    54.25: -0.01212397,
    54.5: -0.015131202,
    54.75: -0.018114852,
    55: -0.021072661,
    55.25: -0.024002368,
    55.5: -0.026901712,
    55.75: -0.029768434,
    56: -0.032600273,
    56.25: -0.035394969,
    56.5: -0.038150262,
    56.75: -0.040863891,
    57: -0.043533596,
    57.25: -0.046157117,
    57.5: -0.048732193,
    57.75: -0.051256638,
    58: -0.053729633,
    58.25: -0.056151573,
    58.5: -0.058522895,
    58.75: -0.060844033,
    59: -0.063115425,
    59.25: -0.065337507,
    59.5: -0.067510715,
    59.75: -0.069635485,
    60: -0.071712253,
    60.25: -0.073741457,
    60.5: -0.075723531,
    60.75: -0.077658912,
    61: -0.079548037,
    61.25: -0.081391341,
    61.5: -0.083189261,
    61.75: -0.084942234,
    62: -0.086650709,
    62.25: -0.088315609,
    62.5: -0.089938416,
    62.75: -0.091520643,
    63: -0.093063805,
    63.25: -0.094569416,
    63.5: -0.096038991,
    63.75: -0.097474043,
    64: -0.098876086,
    64.25: -0.100246635,
    64.5: -0.101587205,
    64.75: -0.102899309,
    65: -0.104184461,
    65.25: -0.105444176,
    65.5: -0.106679969,
    65.75: -0.107893352,
    66: -0.109085841,
    66.25: -0.110258944,
    66.5: -0.111413836,
    66.75: -0.112551156,
    67: -0.113671493,
    67.25: -0.114775438,
    67.5: -0.115863581,
    67.75: -0.116936511,
    68: -0.11799482,
    68.25: -0.119039098,
    68.5: -0.120069933,
    68.75: -0.121087918,
    69: -0.122093641,
    69.25: -0.123087694,
    69.5: -0.124070665,
    69.75: -0.125043146,
    70: -0.126005726,
    70.25: -0.126958996,
    70.5: -0.127903546,
    70.75: -0.128839828,
    71: -0.129767999,
    71.25: -0.130688178,
    71.5: -0.131600482,
    71.75: -0.132505029,
    72: -0.133401937,
    72.25: -0.134291324,
    72.5: -0.135173308,
    72.75: -0.136048006,
    73: -0.136915537,
    73.25: -0.137776019,
    73.5: -0.138629568,
    73.75: -0.139476304,
    74: -0.140316344,
    74.25: -0.141149806,
    74.5: -0.141976807,
    74.75: -0.142797466,
    75: -0.14361202,
    75.25: -0.144421063,
    75.5: -0.145225258,
    75.75: -0.146025267,
    76: -0.146821751,
    76.25: -0.147615373,
    76.5: -0.148406795,
    76.75: -0.149196678,
    77: -0.149985685,
    77.25: -0.150774479,
    77.5: -0.151563719,
    77.75: -0.15235407,
    78: -0.153146193,
    78.25: -0.15394075,
    78.5: -0.154738403,
    78.75: -0.155539814,
    79: -0.156345644,
    79.25: -0.157156439,
    79.5: -0.157972227,
    79.75: -0.15879291,
    80: -0.15961839,
  };
}