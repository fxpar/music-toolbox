const chordDatabase = {
    "guitare": {
        "C": [
			{ name: "C", frets: "x,3,2,0,1,0", fingers: "0,3,2,0,1,0", position: "0", length: "5" },
			// Forme en barré case 8 (Test des cases > 9 avec virgules)
			{ name: "C", frets: "8,10,10,9,8,8", fingers: "1,3,4,2,1,1", position: "8", length: "5" },
            { name: "C", frets: "x32010", fingers: "032010", position: "0", length: "5" },
            { name: "C", frets: "335553", fingers: "112341", position: "3", length: "5" }
        ],
        "Am": [
            { name: "Am", frets: "x02210", fingers: "002310", position: "0", length: "5" },
            { name: "Am", frets: "577555", fingers: "134111", position: "5", length: "5" }
        ],
        "G": [
            { name: "G", frets: "320003", fingers: "210003", position: "0", length: "5" },
            { name: "G", frets: "355433", fingers: "134211", position: "3", length: "5" }
        ],
        "D": [
            { name: "D", frets: "xx0232", fingers: "000132", position: "0", length: "5" },
            { name: "D", frets: "x57775", fingers: "012341", position: "5", length: "5" }
        ],
        "E": [
            { name: "E", frets: "022100", fingers: "023100", position: "0", length: "5" },
            { name: "E", frets: "x79997", fingers: "012341", position: "7", length: "5" }
        ],
        "Em": [
            { name: "Em", frets: "022000", fingers: "023000", position: "0", length: "5" },
            { name: "Em", frets: "x79987", fingers: "013421", position: "7", length: "5" }
        ],
        "F": [
            { name: "F", frets: "133211", fingers: "134211", position: "1", length: "5" },
            { name: "F", frets: "x33211", fingers: "034211", position: "0", length: "5" }
        ],
        "Dm": [
            { name: "Dm", frets: "xx0231", fingers: "000231", position: "0", length: "5" },
            { name: "Dm", frets: "x57765", fingers: "013421", position: "5", length: "5" }
        ],
        "A": [
            { name: "A", frets: "x02220", fingers: "001230", position: "0", length: "5" },
            { name: "A", frets: "577655", fingers: "134211", position: "5", length: "5" }
        ],
        "B7": [
            { name: "B7", frets: "x21202", fingers: "021304", position: "0", length: "5" },
            { name: "B7", frets: "797877", fingers: "131211", position: "7", length: "5" }
        ],
        "E7": [
            { name: "E7", frets: "020100", fingers: "020100", position: "0", length: "5" },
            { name: "E7", frets: "x79797", fingers: "013141", position: "7", length: "5" }
        ],
        "A7": [
            { name: "A7", frets: "x02020", fingers: "001020", position: "0", length: "5" },
            { name: "A7", frets: "575655", fingers: "131211", position: "5", length: "5" }
        ],
        "D7": [
            { name: "D7", frets: "xx0212", fingers: "000213", position: "0", length: "5" },
            { name: "D7", frets: "x57575", fingers: "013141", position: "5", length: "5" }
        ],
        "G7": [
            { name: "G7", frets: "320001", fingers: "320001", position: "0", length: "5" },
            { name: "G7", frets: "353433", fingers: "131211", position: "3", length: "5" }
        ],
        "C7": [
            { name: "C7", frets: "x32310", fingers: "032410", position: "0", length: "5" },
            { name: "C7", frets: "x35353", fingers: "013141", position: "3", length: "5" }
        ],
        "Bm": [
            { name: "Bm", frets: "x24432", fingers: "013421", position: "2", length: "5" }
        ],
        "F#m": [
            { name: "F#m", frets: "244222", fingers: "134111", position: "2", length: "5" }
        ],
        "Bb": [
            { name: "Bb", frets: "x13331", fingers: "012341", position: "1", length: "5" }
        ],
        "Dmaj7": [
            { name: "Dmaj7", frets: "xx0222", fingers: "000111", position: "0", length: "5" }
        ],
        "Cmaj7": [
            { name: "Cmaj7", frets: "x32000", fingers: "032000", position: "0", length: "5" }
        ]
    },
"ukulele": {
    "C": [
        { name: "C", frets: "0003", fingers: "0003", position: "0", length: "4", sub_old: "5R3R", sub: "5,R,3,R", sub_status: "correct" },
        { name: "C", frets: "5433", fingers: "3211", position: "3", length: "4", sub_old: "R35R", sub: "R,3,5,R", sub_status: "correct" }
    ],
    "Am": [
        { name: "Am", frets: "2000", fingers: "2000", position: "0", length: "4", sub_old: "R35R", sub: "R,b3,5,R", sub_status: "wrong" },
        { name: "Am", frets: "5453", fingers: "3241", position: "3", length: "4", sub_old: "3R35", sub: "b3,R,5,b3", sub_status: "wrong" }
    ],
    "F": [
        { name: "F", frets: "2010", fingers: "2010", position: "0", length: "4", sub_old: "R3R5", sub: "R,3,5,R", sub_status: "correct" },
        { name: "F", frets: "5558", fingers: "1114", position: "5", length: "4", sub_old: "5R3R", sub: "5,R,3,R", sub_status: "correct" }
    ],
    "G": [
        { name: "G", frets: "0232", fingers: "0132", position: "0", length: "4", sub_old: "5R53", sub: "5,R,5,3", sub_status: "wrong" },
        { name: "G", frets: "4232", fingers: "3121", position: "2", length: "4", sub_old: "3R53", sub: "3,R,5,3", sub_status: "correct" }
    ],
    "D": [
        { name: "D", frets: "2220", fingers: "1230", position: "0", length: "4", sub_old: "5R35", sub: "5,R,3,5", sub_status: "correct" },
        { name: "D", frets: "2225", fingers: "1114", position: "2", length: "4", sub_old: "5R3R", sub: "5,R,3,R", sub_status: "correct" }
    ],
    "Em": [
        { name: "Em", frets: "0432", fingers: "0321", position: "0", length: "4", sub_old: "5R35", sub: "5,R,b3,5", sub_status: "wrong" },
        { name: "Em", frets: "4432", fingers: "3421", position: "2", length: "4", sub_old: "R5R3", sub: "R,5,R,b3", sub_status: "wrong" }
    ],
    "Dm": [
        { name: "Dm", frets: "2210", fingers: "2310", position: "0", length: "4", sub_old: "R5R3", sub: "R,5,R,b3", sub_status: "wrong" },
        { name: "Dm", frets: "7555", fingers: "3111", position: "5", length: "4", sub_old: "5R35", sub: "5,R,b3,5", sub_status: "correct" }
    ],
    "E": [
        { name: "E", frets: "4442", fingers: "2341", position: "2", length: "4", sub_old: "R5R3", sub: "R,5,R,3", sub_status: "correct" },
        { name: "E", frets: "1402", fingers: "1402", position: "0", length: "4", sub_old: "3R53", sub: "3,R,5,3", sub_status: "correct" }
    ],
    "A": [
        { name: "A", frets: "2100", fingers: "2100", position: "0", length: "4", sub_old: "R35R", sub: "R,3,5,R", sub_status: "wrong" },
        { name: "A", frets: "6454", fingers: "3121", position: "4", length: "4", sub_old: "3R53", sub: "3,R,5,3", sub_status: "correct" }
    ],
    "B7": [
        { name: "B7", frets: "4322", fingers: "3211", position: "2", length: "4", sub_old: "3R57", sub: "3,R,5,b7", sub_status: "correct" },
        { name: "B7", frets: "2322", fingers: "1211", position: "2", length: "4", sub_old: "R357", sub: "R,3,5,b7", sub_status: "correct" }
    ],
    "G7": [
        { name: "G7", frets: "0212", fingers: "0213", position: "0", length: "4", sub_old: "5R73", sub: "5,R,b7,3", sub_status: "correct" }
    ],
    "C7": [
        { name: "C7", frets: "0001", fingers: "0001", position: "0", length: "4", sub_old: "5R37", sub: "5,R,3,b7", sub_status: "wrong" },
        { name: "C7", frets: "3433", fingers: "1211", position: "3", length: "4", sub_old: "57R3", sub: "5,b7,R,3", sub_status: "correct" }
    ],
    "D7": [
        { name: "D7", frets: "2020", fingers: "1020", position: "0", length: "4", sub_old: "R375", sub: "R,3,b7,5", sub_status: "correct" },
        { name: "D7", frets: "2223", fingers: "1112", position: "2", length: "4", sub_old: "5R37", sub: "5,R,3,b7", sub_status: "correct" }
    ],
    "E7": [
        { name: "E7", frets: "1202", fingers: "1203", position: "0", length: "4", sub_old: "R573", sub: "R,5,b7,3", sub_status: "correct" }
    ],
    "A7": [
        { name: "A7", frets: "0100", fingers: "0100", position: "0", length: "4", sub_old: "535R", sub: "5,3,5,R", sub_status: "correct" }
    ],
    "Bm": [
        { name: "Bm", frets: "4222", fingers: "3111", position: "2", length: "4", sub_old: "R5R3", sub: "R,5,R,b3", sub_status: "wrong" }
    ],
    "Gm": [
        { name: "Gm", frets: "0231", fingers: "0231", position: "0", length: "4", sub_old: "5R53", sub: "5,R,5,b3", sub_status: "wrong" }
    ],
    "Cm": [
        { name: "Cm", frets: "0333", fingers: "0111", position: "0", length: "4", sub_old: "5R35", sub: "5,R,b3,5", sub_status: "correct" }
    ],
    "F#m": [
        { name: "F#m", frets: "2120", fingers: "2130", position: "0", length: "4", sub_old: "R3R5", sub: "R,b3,R,5", sub_status: "wrong" }
    ],
    "Bb": [
        { name: "Bb", frets: "3211", fingers: "3211", position: "1", length: "4", sub_old: "5R35", sub: "5,R,3,5", sub_status: "correct" }
    ],
    "Am7": [
        { name: "Am7", frets: "0000", fingers: "0000", position: "0", length: "4", sub_old: "R,3b,5,7b", sub: "R,b3,5,b7", sub_status: "correct" },
        { name: "Am7", frets: "2030", fingers: "2030", position: "0", length: "4", sub_old: "R,3b,7b,R", sub: "R,b3,b7,R", sub_status: "correct" }
    ],
    "Dm7": [
        { name: "Dm7", frets: "2213", fingers: "2314", position: "0", length: "4", sub_old: "R573", sub: "R,5,b7,b3", sub_status: "correct" },
        { name: "Dm7", frets: "5555", fingers: "1111", position: "5", length: "4", sub_old: "5R37", sub: "5,R,b3,b7", sub_status: "correct" }
    ],
    "Em7": [
        { name: "Em7", frets: "0202", fingers: "0102", position: "0", length: "4", sub_old: "5R73", sub: "5,R,b7,b3", sub_status: "correct" },
        { name: "Em7", frets: "4435", fingers: "2314", position: "2", length: "4", sub_old: "R573", sub: "R,5,b7,b3", sub_status: "correct" }
    ],
    "Gm7": [
        { name: "Gm7", frets: "0211", fingers: "0211", position: "0", length: "4", sub_old: "5R73", sub: "5,R,b7,b3", sub_status: "correct" }
    ],
    "Bm7": [
        { name: "Bm7", frets: "2222", fingers: "1111", position: "2", length: "4", sub_old: "5R37", sub: "5,R,b3,b7", sub_status: "correct" }
    ],
    "Fm": [
        { name: "Fm", frets: "1013", fingers: "1024", position: "0", length: "4", sub_old: "R3R3", sub: "R,b3,R,b3", sub_status: "wrong" },
        { name: "Fm", frets: "5543", fingers: "3421", position: "3", length: "4", sub_old: "R5R3", sub: "R,5,R,b3", sub_status: "wrong" }
    ],
    "B": [
        { name: "B", frets: "4322", fingers: "3211", position: "2", length: "4", sub_old: "R35R", sub: "R,3,5,R", sub_status: "correct" }
    ],
    "F7": [
        { name: "F7", frets: "2313", fingers: "2314", position: "0", length: "4", sub_old: "R73R", sub: "R,b7,3,R", sub_status: "correct" }
    ],
    "Bb7": [
        { name: "Bb7", frets: "1211", fingers: "1211", position: "1", length: "4", sub_old: "R735", sub: "R,b7,3,5", sub_status: "correct" }
    ],
    "Eb": [
        { name: "Eb", frets: "0331", fingers: "0231", position: "0", length: "4", sub_old: "5R3R", sub: "5,R,3,R", sub_status: "correct" },
        { name: "Eb", frets: "3331", fingers: "2341", position: "1", length: "4", sub_old: "R5R3", sub: "R,5,R,3", sub_status: "correct" }
    ],
    "Ab": [
        { name: "Ab", frets: "5343", fingers: "3121", position: "3", length: "4", sub_old: "R35R", sub: "R,3,5,R", sub_status: "correct" }
    ],
    "Db": [
        { name: "Db", frets: "1114", fingers: "1114", position: "1", length: "4", sub_old: "5R3R", sub: "5,R,3,R", sub_status: "correct" }
    ],
    "Fmaj7": [
        { name: "Fmaj7", frets: "2413", fingers: "2413", position: "0", length: "4", sub_old: "R73R", sub: "R,7,3,R", sub_status: "correct" },
        { name: "Fmaj7", frets: "5500", fingers: "1200", position: "0", length: "4", sub_old: "5R37", sub: "5,R,3,7", sub_status: "correct" }
    ],
    "Cmaj7": [
        { name: "Cmaj7", frets: "0002", fingers: "0002", position: "0", length: "4", sub_old: "5R37", sub: "5,R,3,7", sub_status: "correct" }
    ],
    "Gmaj7": [
        { name: "Gmaj7", frets: "0222", fingers: "0111", position: "0", length: "4", sub_old: "5R37", sub: "5,R,3,7", sub_status: "correct" }
    ],
    "Dmaj7": [
        { name: "Dmaj7", frets: "2224", fingers: "1113", position: "2", length: "4", sub_old: "5R37", sub: "5,R,3,7", sub_status: "correct" }
    ],
    "Amaj7": [
        { name: "Amaj7", frets: "1100", fingers: "1200", position: "0", length: "4", sub_old: "375R", sub: "3,7,5,R", sub_status: "correct" }
    ],
    "Cdim": [
        { name: "Cdim", frets: "2323", fingers: "1234", position: "2", length: "4", sub_old: "R35R", sub: "R,b3,b5,R", sub_status: "wrong" }
    ],
    "Adim": [
        { name: "Adim", frets: "2323", fingers: "1234", position: "2", length: "4", sub_old: "R35R", sub: "R,b3,b5,R", sub_status: "wrong" }
    ],
    "Caug": [
        { name: "Caug", frets: "1003", fingers: "1004", position: "0", length: "4", sub_old: "35R3", sub: "3,#5,R,3", sub_status: "correct" }
    ],
    "Gaug": [
        { name: "Gaug", frets: "0332", fingers: "0231", position: "0", length: "4", sub_old: "R35R", sub: "R,3,#5,R", sub_status: "correct" }
    ],
    "Csus4": [
        { name: "Csus4", frets: "0013", fingers: "0013", position: "0", length: "4", sub_old: "5R4R", sub: "5,R,4,R", sub_status: "correct" }
    ],
    "Gsus4": [
        { name: "Gsus4", frets: "0233", fingers: "0134", position: "0", length: "4", sub_old: "5R54", sub: "5,R,5,4", sub_status: "correct" }
    ],
    "Dsus4": [
        { name: "Dsus4", frets: "0230", fingers: "0120", position: "0", length: "4", sub_old: "4R5R", sub: "4,R,5,R", sub_status: "correct" }
    ],
    "Asus4": [
        { name: "Asus4", frets: "2200", fingers: "1200", position: "0", length: "4", sub_old: "R45R", sub: "R,4,5,R", sub_status: "correct" }
    ]
},
    "piano": {}
};