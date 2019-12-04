const weekData = [
  {
    y: "Mon",
    x: 0,
    Property_Damage: 168,
    Injury: 53,
    Serious_Injury: 6,
    Fatality: 0,
    sum: 227
  },
  {
    y: "Mon",
    x: 1,
    Property_Damage: 120,
    Injury: 29,
    Serious_Injury: 2,
    Fatality: 2,
    sum: 154
  },
  {
    y: "Mon",
    x: 2,
    Property_Damage: 114,
    Injury: 28,
    Serious_Injury: 2,
    Fatality: 0,
    sum: 146
  },
  {
    y: "Mon",
    x: 3,
    Property_Damage: 73,
    Injury: 18,
    Serious_Injury: 1,
    Fatality: 0,
    sum: 95
  },
  {
    y: "Mon",
    x: 4,
    Property_Damage: 53,
    Injury: 17,
    Serious_Injury: 2,
    Fatality: 0,
    sum: 76
  },
  {
    y: "Mon",
    x: 5,
    Property_Damage: 103,
    Injury: 47,
    Serious_Injury: 0,
    Fatality: 0,
    sum: 155
  },
  {
    y: "Mon",
    x: 6,
    Property_Damage: 204,
    Injury: 101,
    Serious_Injury: 4,
    Fatality: 1,
    sum: 316
  },
  {
    y: "Mon",
    x: 7,
    Property_Damage: 403,
    Injury: 229,
    Serious_Injury: 5,
    Fatality: 1,
    sum: 645
  },
  {
    y: "Mon",
    x: 8,
    Property_Damage: 508,
    Injury: 254,
    Serious_Injury: 12,
    Fatality: 1,
    sum: 783
  },
  {
    y: "Mon",
    x: 9,
    Property_Damage: 467,
    Injury: 189,
    Serious_Injury: 8,
    Fatality: 0,
    sum: 673
  },
  {
    y: "Mon",
    x: 10,
    Property_Damage: 387,
    Injury: 162,
    Serious_Injury: 9,
    Fatality: 1,
    sum: 569
  },
  {
    y: "Mon",
    x: 11,
    Property_Damage: 469,
    Injury: 184,
    Serious_Injury: 9,
    Fatality: 0,
    sum: 673
  },
  {
    y: "Mon",
    x: 12,
    Property_Damage: 490,
    Injury: 211,
    Serious_Injury: 5,
    Fatality: 0,
    sum: 718
  },
  {
    y: "Mon",
    x: 13,
    Property_Damage: 476,
    Injury: 217,
    Serious_Injury: 2,
    Fatality: 0,
    sum: 708
  },
  {
    y: "Mon",
    x: 14,
    Property_Damage: 553,
    Injury: 238,
    Serious_Injury: 9,
    Fatality: 1,
    sum: 815
  },
  {
    y: "Mon",
    x: 15,
    Property_Damage: 564,
    Injury: 272,
    Serious_Injury: 11,
    Fatality: 1,
    sum: 863
  },
  {
    y: "Mon",
    x: 16,
    Property_Damage: 597,
    Injury: 325,
    Serious_Injury: 15,
    Fatality: 1,
    sum: 954
  },
  {
    y: "Mon",
    x: 17,
    Property_Damage: 567,
    Injury: 341,
    Serious_Injury: 17,
    Fatality: 1,
    sum: 943
  },
  {
    y: "Mon",
    x: 18,
    Property_Damage: 425,
    Injury: 243,
    Serious_Injury: 13,
    Fatality: 1,
    sum: 700
  },
  {
    y: "Mon",
    x: 19,
    Property_Damage: 337,
    Injury: 155,
    Serious_Injury: 6,
    Fatality: 1,
    sum: 518
  },
  {
    y: "Mon",
    x: 20,
    Property_Damage: 312,
    Injury: 103,
    Serious_Injury: 8,
    Fatality: 0,
    sum: 443
  },
  {
    y: "Mon",
    x: 21,
    Property_Damage: 240,
    Injury: 113,
    Serious_Injury: 6,
    Fatality: 1,
    sum: 381
  },
  {
    y: "Mon",
    x: 22,
    Property_Damage: 213,
    Injury: 79,
    Serious_Injury: 3,
    Fatality: 1,
    sum: 318
  },
  {
    y: "Mon",
    x: 23,
    Property_Damage: 156,
    Injury: 64,
    Serious_Injury: 3,
    Fatality: 3,
    sum: 249
  },
  {
    y: "Tue",
    x: 0,
    Property_Damage: 141,
    Injury: 37,
    Serious_Injury: 3,
    Fatality: 0,
    sum: 181
  },
  {
    y: "Tue",
    x: 1,
    Property_Damage: 93,
    Injury: 30,
    Serious_Injury: 4,
    Fatality: 0,
    sum: 128
  },
  {
    y: "Tue",
    x: 2,
    Property_Damage: 94,
    Injury: 22,
    Serious_Injury: 2,
    Fatality: 0,
    sum: 120
  },
  {
    y: "Tue",
    x: 3,
    Property_Damage: 43,
    Injury: 15,
    Serious_Injury: 3,
    Fatality: 0,
    sum: 64
  },
  {
    y: "Tue",
    x: 4,
    Property_Damage: 50,
    Injury: 19,
    Serious_Injury: 2,
    Fatality: 0,
    sum: 75
  },
  {
    y: "Tue",
    x: 5,
    Property_Damage: 74,
    Injury: 42,
    Serious_Injury: 3,
    Fatality: 3,
    sum: 127
  },
  {
    y: "Tue",
    x: 6,
    Property_Damage: 212,
    Injury: 106,
    Serious_Injury: 10,
    Fatality: 3,
    sum: 337
  },
  {
    y: "Tue",
    x: 7,
    Property_Damage: 477,
    Injury: 202,
    Serious_Injury: 13,
    Fatality: 0,
    sum: 699
  },
  {
    y: "Tue",
    x: 8,
    Property_Damage: 608,
    Injury: 309,
    Serious_Injury: 8,
    Fatality: 0,
    sum: 933
  },
  {
    y: "Tue",
    x: 9,
    Property_Damage: 522,
    Injury: 241,
    Serious_Injury: 5,
    Fatality: 1,
    sum: 778
  },
  {
    y: "Tue",
    x: 10,
    Property_Damage: 442,
    Injury: 193,
    Serious_Injury: 5,
    Fatality: 1,
    sum: 651
  },
  {
    y: "Tue",
    x: 11,
    Property_Damage: 440,
    Injury: 171,
    Serious_Injury: 10,
    Fatality: 1,
    sum: 633
  },
  {
    y: "Tue",
    x: 12,
    Property_Damage: 599,
    Injury: 227,
    Serious_Injury: 8,
    Fatality: 0,
    sum: 846
  },
  {
    y: "Tue",
    x: 13,
    Property_Damage: 541,
    Injury: 247,
    Serious_Injury: 5,
    Fatality: 2,
    sum: 808
  },
  {
    y: "Tue",
    x: 14,
    Property_Damage: 526,
    Injury: 285,
    Serious_Injury: 8,
    Fatality: 1,
    sum: 834
  },
  {
    y: "Tue",
    x: 15,
    Property_Damage: 642,
    Injury: 333,
    Serious_Injury: 12,
    Fatality: 2,
    sum: 1004
  },
  {
    y: "Tue",
    x: 16,
    Property_Damage: 669,
    Injury: 365,
    Serious_Injury: 17,
    Fatality: 1,
    sum: 1068
  },
  {
    y: "Tue",
    x: 17,
    Property_Damage: 737,
    Injury: 395,
    Serious_Injury: 22,
    Fatality: 0,
    sum: 1171
  },
  {
    y: "Tue",
    x: 18,
    Property_Damage: 515,
    Injury: 292,
    Serious_Injury: 15,
    Fatality: 1,
    sum: 841
  },
  {
    y: "Tue",
    x: 19,
    Property_Damage: 372,
    Injury: 185,
    Serious_Injury: 10,
    Fatality: 0,
    sum: 586
  },
  {
    y: "Tue",
    x: 20,
    Property_Damage: 289,
    Injury: 124,
    Serious_Injury: 4,
    Fatality: 0,
    sum: 437
  },
  {
    y: "Tue",
    x: 21,
    Property_Damage: 273,
    Injury: 121,
    Serious_Injury: 6,
    Fatality: 0,
    sum: 421
  },
  {
    y: "Tue",
    x: 22,
    Property_Damage: 229,
    Injury: 90,
    Serious_Injury: 6,
    Fatality: 1,
    sum: 348
  },
  {
    y: "Tue",
    x: 23,
    Property_Damage: 170,
    Injury: 64,
    Serious_Injury: 4,
    Fatality: 0,
    sum: 261
  },
  {
    y: "Wed",
    x: 0,
    Property_Damage: 140,
    Injury: 24,
    Serious_Injury: 1,
    Fatality: 1,
    sum: 166
  },
  {
    y: "Wed",
    x: 1,
    Property_Damage: 102,
    Injury: 32,
    Serious_Injury: 2,
    Fatality: 0,
    sum: 137
  },
  {
    y: "Wed",
    x: 2,
    Property_Damage: 80,
    Injury: 23,
    Serious_Injury: 4,
    Fatality: 1,
    sum: 110
  },
  {
    y: "Wed",
    x: 3,
    Property_Damage: 65,
    Injury: 13,
    Serious_Injury: 0,
    Fatality: 0,
    sum: 81
  },
  {
    y: "Wed",
    x: 4,
    Property_Damage: 53,
    Injury: 12,
    Serious_Injury: 1,
    Fatality: 0,
    sum: 70
  },
  {
    y: "Wed",
    x: 5,
    Property_Damage: 78,
    Injury: 42,
    Serious_Injury: 1,
    Fatality: 0,
    sum: 126
  },
  {
    y: "Wed",
    x: 6,
    Property_Damage: 193,
    Injury: 91,
    Serious_Injury: 6,
    Fatality: 0,
    sum: 296
  },
  {
    y: "Wed",
    x: 7,
    Property_Damage: 385,
    Injury: 203,
    Serious_Injury: 15,
    Fatality: 1,
    sum: 611
  },
  {
    y: "Wed",
    x: 8,
    Property_Damage: 572,
    Injury: 276,
    Serious_Injury: 4,
    Fatality: 1,
    sum: 861
  },
  {
    y: "Wed",
    x: 9,
    Property_Damage: 521,
    Injury: 245,
    Serious_Injury: 9,
    Fatality: 2,
    sum: 786
  },
  {
    y: "Wed",
    x: 10,
    Property_Damage: 448,
    Injury: 179,
    Serious_Injury: 6,
    Fatality: 1,
    sum: 644
  },
  {
    y: "Wed",
    x: 11,
    Property_Damage: 455,
    Injury: 199,
    Serious_Injury: 7,
    Fatality: 0,
    sum: 672
  },
  {
    y: "Wed",
    x: 12,
    Property_Damage: 591,
    Injury: 229,
    Serious_Injury: 7,
    Fatality: 0,
    sum: 839
  },
  {
    y: "Wed",
    x: 13,
    Property_Damage: 493,
    Injury: 231,
    Serious_Injury: 14,
    Fatality: 1,
    sum: 752
  },
  {
    y: "Wed",
    x: 14,
    Property_Damage: 574,
    Injury: 258,
    Serious_Injury: 11,
    Fatality: 2,
    sum: 859
  },
  {
    y: "Wed",
    x: 15,
    Property_Damage: 618,
    Injury: 308,
    Serious_Injury: 10,
    Fatality: 2,
    sum: 953
  },
  {
    y: "Wed",
    x: 16,
    Property_Damage: 670,
    Injury: 323,
    Serious_Injury: 17,
    Fatality: 1,
    sum: 1027
  },
  {
    y: "Wed",
    x: 17,
    Property_Damage: 683,
    Injury: 401,
    Serious_Injury: 16,
    Fatality: 0,
    sum: 1117
  },
  {
    y: "Wed",
    x: 18,
    Property_Damage: 550,
    Injury: 335,
    Serious_Injury: 13,
    Fatality: 1,
    sum: 917
  },
  {
    y: "Wed",
    x: 19,
    Property_Damage: 390,
    Injury: 176,
    Serious_Injury: 3,
    Fatality: 0,
    sum: 588
  },
  {
    y: "Wed",
    x: 20,
    Property_Damage: 309,
    Injury: 143,
    Serious_Injury: 8,
    Fatality: 2,
    sum: 482
  },
  {
    y: "Wed",
    x: 21,
    Property_Damage: 262,
    Injury: 121,
    Serious_Injury: 5,
    Fatality: 3,
    sum: 412
  },
  {
    y: "Wed",
    x: 22,
    Property_Damage: 247,
    Injury: 81,
    Serious_Injury: 3,
    Fatality: 1,
    sum: 354
  },
  {
    y: "Wed",
    x: 23,
    Property_Damage: 206,
    Injury: 73,
    Serious_Injury: 5,
    Fatality: 0,
    sum: 307
  },
  {
    y: "Thur",
    x: 0,
    Property_Damage: 168,
    Injury: 39,
    Serious_Injury: 1,
    Fatality: 0,
    sum: 208
  },
  {
    y: "Thur",
    x: 1,
    Property_Damage: 139,
    Injury: 38,
    Serious_Injury: 4,
    Fatality: 0,
    sum: 182
  },
  {
    y: "Thur",
    x: 2,
    Property_Damage: 131,
    Injury: 40,
    Serious_Injury: 4,
    Fatality: 2,
    sum: 179
  },
  {
    y: "Thur",
    x: 3,
    Property_Damage: 60,
    Injury: 12,
    Serious_Injury: 0,
    Fatality: 1,
    sum: 76
  },
  {
    y: "Thur",
    x: 4,
    Property_Damage: 62,
    Injury: 16,
    Serious_Injury: 1,
    Fatality: 0,
    sum: 83
  },
  {
    y: "Thur",
    x: 5,
    Property_Damage: 105,
    Injury: 48,
    Serious_Injury: 2,
    Fatality: 1,
    sum: 161
  },
  {
    y: "Thur",
    x: 6,
    Property_Damage: 200,
    Injury: 105,
    Serious_Injury: 4,
    Fatality: 2,
    sum: 317
  },
  {
    y: "Thur",
    x: 7,
    Property_Damage: 395,
    Injury: 225,
    Serious_Injury: 12,
    Fatality: 1,
    sum: 640
  },
  {
    y: "Thur",
    x: 8,
    Property_Damage: 574,
    Injury: 254,
    Serious_Injury: 12,
    Fatality: 0,
    sum: 848
  },
  {
    y: "Thur",
    x: 9,
    Property_Damage: 514,
    Injury: 229,
    Serious_Injury: 12,
    Fatality: 1,
    sum: 765
  },
  {
    y: "Thur",
    x: 10,
    Property_Damage: 405,
    Injury: 178,
    Serious_Injury: 11,
    Fatality: 0,
    sum: 604
  },
  {
    y: "Thur",
    x: 11,
    Property_Damage: 430,
    Injury: 188,
    Serious_Injury: 6,
    Fatality: 1,
    sum: 636
  },
  {
    y: "Thur",
    x: 12,
    Property_Damage: 576,
    Injury: 256,
    Serious_Injury: 11,
    Fatality: 1,
    sum: 856
  },
  {
    y: "Thur",
    x: 13,
    Property_Damage: 511,
    Injury: 223,
    Serious_Injury: 14,
    Fatality: 0,
    sum: 761
  },
  {
    y: "Thur",
    x: 14,
    Property_Damage: 563,
    Injury: 284,
    Serious_Injury: 19,
    Fatality: 1,
    sum: 881
  },
  {
    y: "Thur",
    x: 15,
    Property_Damage: 612,
    Injury: 330,
    Serious_Injury: 11,
    Fatality: 4,
    sum: 972
  },
  {
    y: "Thur",
    x: 16,
    Property_Damage: 679,
    Injury: 369,
    Serious_Injury: 19,
    Fatality: 4,
    sum: 1087
  },
  {
    y: "Thur",
    x: 17,
    Property_Damage: 738,
    Injury: 449,
    Serious_Injury: 20,
    Fatality: 0,
    sum: 1224
  },
  {
    y: "Thur",
    x: 18,
    Property_Damage: 549,
    Injury: 287,
    Serious_Injury: 12,
    Fatality: 1,
    sum: 867
  },
  {
    y: "Thur",
    x: 19,
    Property_Damage: 381,
    Injury: 193,
    Serious_Injury: 13,
    Fatality: 2,
    sum: 608
  },
  {
    y: "Thur",
    x: 20,
    Property_Damage: 324,
    Injury: 168,
    Serious_Injury: 7,
    Fatality: 1,
    sum: 520
  },
  {
    y: "Thur",
    x: 21,
    Property_Damage: 279,
    Injury: 130,
    Serious_Injury: 8,
    Fatality: 0,
    sum: 438
  },
  {
    y: "Thur",
    x: 22,
    Property_Damage: 270,
    Injury: 130,
    Serious_Injury: 12,
    Fatality: 0,
    sum: 434
  },
  {
    y: "Thur",
    x: 23,
    Property_Damage: 236,
    Injury: 68,
    Serious_Injury: 2,
    Fatality: 0,
    sum: 329
  },
  {
    y: "Fri",
    x: 0,
    Property_Damage: 166,
    Injury: 33,
    Serious_Injury: 6,
    Fatality: 3,
    sum: 208
  },
  {
    y: "Fri",
    x: 1,
    Property_Damage: 163,
    Injury: 41,
    Serious_Injury: 6,
    Fatality: 0,
    sum: 211
  },
  {
    y: "Fri",
    x: 2,
    Property_Damage: 130,
    Injury: 42,
    Serious_Injury: 2,
    Fatality: 2,
    sum: 178
  },
  {
    y: "Fri",
    x: 3,
    Property_Damage: 75,
    Injury: 9,
    Serious_Injury: 2,
    Fatality: 1,
    sum: 90
  },
  {
    y: "Fri",
    x: 4,
    Property_Damage: 58,
    Injury: 19,
    Serious_Injury: 3,
    Fatality: 0,
    sum: 84
  },
  {
    y: "Fri",
    x: 5,
    Property_Damage: 87,
    Injury: 33,
    Serious_Injury: 4,
    Fatality: 1,
    sum: 130
  },
  {
    y: "Fri",
    x: 6,
    Property_Damage: 208,
    Injury: 104,
    Serious_Injury: 3,
    Fatality: 0,
    sum: 321
  },
  {
    y: "Fri",
    x: 7,
    Property_Damage: 425,
    Injury: 220,
    Serious_Injury: 7,
    Fatality: 1,
    sum: 660
  },
  {
    y: "Fri",
    x: 8,
    Property_Damage: 500,
    Injury: 242,
    Serious_Injury: 11,
    Fatality: 2,
    sum: 763
  },
  {
    y: "Fri",
    x: 9,
    Property_Damage: 453,
    Injury: 189,
    Serious_Injury: 11,
    Fatality: 2,
    sum: 664
  },
  {
    y: "Fri",
    x: 10,
    Property_Damage: 461,
    Injury: 186,
    Serious_Injury: 8,
    Fatality: 0,
    sum: 665
  },
  {
    y: "Fri",
    x: 11,
    Property_Damage: 485,
    Injury: 184,
    Serious_Injury: 4,
    Fatality: 0,
    sum: 684
  },
  {
    y: "Fri",
    x: 12,
    Property_Damage: 680,
    Injury: 223,
    Serious_Injury: 11,
    Fatality: 0,
    sum: 926
  },
  {
    y: "Fri",
    x: 13,
    Property_Damage: 577,
    Injury: 253,
    Serious_Injury: 9,
    Fatality: 0,
    sum: 852
  },
  {
    y: "Fri",
    x: 14,
    Property_Damage: 637,
    Injury: 304,
    Serious_Injury: 13,
    Fatality: 0,
    sum: 968
  },
  {
    y: "Fri",
    x: 15,
    Property_Damage: 733,
    Injury: 342,
    Serious_Injury: 13,
    Fatality: 1,
    sum: 1104
  },
  {
    y: "Fri",
    x: 16,
    Property_Damage: 699,
    Injury: 350,
    Serious_Injury: 14,
    Fatality: 0,
    sum: 1079
  },
  {
    y: "Fri",
    x: 17,
    Property_Damage: 732,
    Injury: 430,
    Serious_Injury: 18,
    Fatality: 1,
    sum: 1198
  },
  {
    y: "Fri",
    x: 18,
    Property_Damage: 534,
    Injury: 275,
    Serious_Injury: 21,
    Fatality: 1,
    sum: 849
  },
  {
    y: "Fri",
    x: 19,
    Property_Damage: 440,
    Injury: 207,
    Serious_Injury: 11,
    Fatality: 0,
    sum: 677
  },
  {
    y: "Fri",
    x: 20,
    Property_Damage: 409,
    Injury: 140,
    Serious_Injury: 7,
    Fatality: 0,
    sum: 576
  },
  {
    y: "Fri",
    x: 21,
    Property_Damage: 346,
    Injury: 144,
    Serious_Injury: 7,
    Fatality: 1,
    sum: 519
  },
  {
    y: "Fri",
    x: 22,
    Property_Damage: 350,
    Injury: 167,
    Serious_Injury: 7,
    Fatality: 0,
    sum: 546
  },
  {
    y: "Fri",
    x: 23,
    Property_Damage: 388,
    Injury: 126,
    Serious_Injury: 7,
    Fatality: 3,
    sum: 547
  },
  {
    y: "Sat",
    x: 0,
    Property_Damage: 334,
    Injury: 123,
    Serious_Injury: 12,
    Fatality: 2,
    sum: 471
  },
  {
    y: "Sat",
    x: 1,
    Property_Damage: 306,
    Injury: 116,
    Serious_Injury: 12,
    Fatality: 0,
    sum: 435
  },
  {
    y: "Sat",
    x: 2,
    Property_Damage: 340,
    Injury: 148,
    Serious_Injury: 9,
    Fatality: 0,
    sum: 499
  },
  {
    y: "Sat",
    x: 3,
    Property_Damage: 168,
    Injury: 57,
    Serious_Injury: 8,
    Fatality: 2,
    sum: 238
  },
  {
    y: "Sat",
    x: 4,
    Property_Damage: 103,
    Injury: 25,
    Serious_Injury: 3,
    Fatality: 0,
    sum: 135
  },
  {
    y: "Sat",
    x: 5,
    Property_Damage: 85,
    Injury: 26,
    Serious_Injury: 4,
    Fatality: 0,
    sum: 120
  },
  {
    y: "Sat",
    x: 6,
    Property_Damage: 122,
    Injury: 48,
    Serious_Injury: 2,
    Fatality: 1,
    sum: 179
  },
  {
    y: "Sat",
    x: 7,
    Property_Damage: 150,
    Injury: 60,
    Serious_Injury: 2,
    Fatality: 0,
    sum: 219
  },
  {
    y: "Sat",
    x: 8,
    Property_Damage: 240,
    Injury: 105,
    Serious_Injury: 4,
    Fatality: 1,
    sum: 358
  },
  {
    y: "Sat",
    x: 9,
    Property_Damage: 277,
    Injury: 128,
    Serious_Injury: 4,
    Fatality: 0,
    sum: 418
  },
  {
    y: "Sat",
    x: 10,
    Property_Damage: 379,
    Injury: 145,
    Serious_Injury: 3,
    Fatality: 0,
    sum: 537
  },
  {
    y: "Sat",
    x: 11,
    Property_Damage: 396,
    Injury: 206,
    Serious_Injury: 6,
    Fatality: 0,
    sum: 619
  },
  {
    y: "Sat",
    x: 12,
    Property_Damage: 569,
    Injury: 248,
    Serious_Injury: 14,
    Fatality: 1,
    sum: 844
  },
  {
    y: "Sat",
    x: 13,
    Property_Damage: 487,
    Injury: 252,
    Serious_Injury: 13,
    Fatality: 0,
    sum: 765
  },
  {
    y: "Sat",
    x: 14,
    Property_Damage: 494,
    Injury: 269,
    Serious_Injury: 5,
    Fatality: 0,
    sum: 782
  },
  {
    y: "Sat",
    x: 15,
    Property_Damage: 492,
    Injury: 230,
    Serious_Injury: 7,
    Fatality: 2,
    sum: 746
  },
  {
    y: "Sat",
    x: 16,
    Property_Damage: 472,
    Injury: 228,
    Serious_Injury: 13,
    Fatality: 1,
    sum: 730
  },
  {
    y: "Sat",
    x: 17,
    Property_Damage: 454,
    Injury: 233,
    Serious_Injury: 8,
    Fatality: 2,
    sum: 714
  },
  {
    y: "Sat",
    x: 18,
    Property_Damage: 422,
    Injury: 183,
    Serious_Injury: 7,
    Fatality: 3,
    sum: 633
  },
  {
    y: "Sat",
    x: 19,
    Property_Damage: 387,
    Injury: 185,
    Serious_Injury: 4,
    Fatality: 1,
    sum: 596
  },
  {
    y: "Sat",
    x: 20,
    Property_Damage: 378,
    Injury: 148,
    Serious_Injury: 12,
    Fatality: 0,
    sum: 558
  },
  {
    y: "Sat",
    x: 21,
    Property_Damage: 376,
    Injury: 135,
    Serious_Injury: 14,
    Fatality: 4,
    sum: 550
  },
  {
    y: "Sat",
    x: 22,
    Property_Damage: 432,
    Injury: 183,
    Serious_Injury: 10,
    Fatality: 1,
    sum: 648
  },
  {
    y: "Sat",
    x: 23,
    Property_Damage: 388,
    Injury: 129,
    Serious_Injury: 7,
    Fatality: 1,
    sum: 548
  },
  {
    y: "Sun",
    x: 0,
    Property_Damage: 313,
    Injury: 125,
    Serious_Injury: 8,
    Fatality: 3,
    sum: 449
  },
  {
    y: "Sun",
    x: 1,
    Property_Damage: 353,
    Injury: 134,
    Serious_Injury: 9,
    Fatality: 2,
    sum: 499
  },
  {
    y: "Sun",
    x: 2,
    Property_Damage: 377,
    Injury: 123,
    Serious_Injury: 13,
    Fatality: 0,
    sum: 515
  },
  {
    y: "Sun",
    x: 3,
    Property_Damage: 203,
    Injury: 56,
    Serious_Injury: 9,
    Fatality: 0,
    sum: 271
  },
  {
    y: "Sun",
    x: 4,
    Property_Damage: 92,
    Injury: 39,
    Serious_Injury: 0,
    Fatality: 1,
    sum: 136
  },
  {
    y: "Sun",
    x: 5,
    Property_Damage: 87,
    Injury: 30,
    Serious_Injury: 1,
    Fatality: 0,
    sum: 123
  },
  {
    y: "Sun",
    x: 6,
    Property_Damage: 91,
    Injury: 27,
    Serious_Injury: 4,
    Fatality: 1,
    sum: 129
  },
  {
    y: "Sun",
    x: 7,
    Property_Damage: 132,
    Injury: 45,
    Serious_Injury: 2,
    Fatality: 0,
    sum: 186
  },
  {
    y: "Sun",
    x: 8,
    Property_Damage: 158,
    Injury: 72,
    Serious_Injury: 4,
    Fatality: 0,
    sum: 242
  },
  {
    y: "Sun",
    x: 9,
    Property_Damage: 237,
    Injury: 91,
    Serious_Injury: 2,
    Fatality: 0,
    sum: 339
  },
  {
    y: "Sun",
    x: 10,
    Property_Damage: 271,
    Injury: 137,
    Serious_Injury: 8,
    Fatality: 0,
    sum: 426
  },
  {
    y: "Sun",
    x: 11,
    Property_Damage: 339,
    Injury: 120,
    Serious_Injury: 3,
    Fatality: 1,
    sum: 474
  },
  {
    y: "Sun",
    x: 12,
    Property_Damage: 428,
    Injury: 153,
    Serious_Injury: 8,
    Fatality: 2,
    sum: 603
  },
  {
    y: "Sun",
    x: 13,
    Property_Damage: 456,
    Injury: 214,
    Serious_Injury: 9,
    Fatality: 0,
    sum: 692
  },
  {
    y: "Sun",
    x: 14,
    Property_Damage: 408,
    Injury: 167,
    Serious_Injury: 12,
    Fatality: 1,
    sum: 602
  },
  {
    y: "Sun",
    x: 15,
    Property_Damage: 415,
    Injury: 192,
    Serious_Injury: 11,
    Fatality: 1,
    sum: 634
  },
  {
    y: "Sun",
    x: 16,
    Property_Damage: 410,
    Injury: 212,
    Serious_Injury: 5,
    Fatality: 1,
    sum: 644
  },
  {
    y: "Sun",
    x: 17,
    Property_Damage: 421,
    Injury: 180,
    Serious_Injury: 15,
    Fatality: 1,
    sum: 634
  },
  {
    y: "Sun",
    x: 18,
    Property_Damage: 360,
    Injury: 155,
    Serious_Injury: 9,
    Fatality: 2,
    sum: 544
  },
  {
    y: "Sun",
    x: 19,
    Property_Damage: 332,
    Injury: 123,
    Serious_Injury: 8,
    Fatality: 0,
    sum: 482
  },
  {
    y: "Sun",
    x: 20,
    Property_Damage: 336,
    Injury: 116,
    Serious_Injury: 8,
    Fatality: 1,
    sum: 481
  },
  {
    y: "Sun",
    x: 21,
    Property_Damage: 268,
    Injury: 99,
    Serious_Injury: 8,
    Fatality: 1,
    sum: 397
  },
  {
    y: "Sun",
    x: 22,
    Property_Damage: 254,
    Injury: 82,
    Serious_Injury: 3,
    Fatality: 2,
    sum: 363
  },
  {
    y: "Sun",
    x: 23,
    Property_Damage: 198,
    Injury: 57,
    Serious_Injury: 5,
    Fatality: 1,
    sum: 284
  }
];
