import { CUBE_VALUES } from "../constants";

// returns an array of objects with all info needed to build cubes
// used to render Cube components in SupplyCard
const getCubes = (supply) => {
    let cubes = [];

    // we start by making the entire supply bronze cubes
    let bronze = supply;
    let silver = 0;
    let gold = 0;

    // we then use these break points to convert bronze cubes to silver and gold
    if (supply >= 10){
        silver = 1;
        bronze = supply - 5;
    }

    if (supply >= 15){
        silver = 2;
        bronze = supply - 10;
    }

    if (supply > 20){
        silver = 2;
        bronze = supply - 10;
    }

    if (supply > 25){
        gold = 1;
        silver = 2;
        bronze = supply - 20;
    }

    if (supply > 30){
        gold = Math.floor((supply - 15) / 10);
        silver = 2;
        bronze = supply - (gold * 10) - 10;
    }

    // bronze
    for (let i = 0; i < bronze; i++){
        cubes.push({color: 'bronze', value: CUBE_VALUES['bronze']});
    }

    // silver
    for (let i = 0; i < silver; i++){
        cubes.push({color: 'silver', value: CUBE_VALUES['silver']});
    }

    // gold
    for (let i = 0; i < gold; i++){
        cubes.push({color: 'gold', value: CUBE_VALUES['gold']});
    }

    return cubes;
}

export { getCubes };