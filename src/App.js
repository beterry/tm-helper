import { useState } from 'react';
import styled from 'styled-components';

//import constants
import {COLORS} from './constants';

//import components
import OverviewCard from './components/OverviewCard';
import TerraformRating from './components/TerraformRating';
import SupplyCard from './components/SupplyCard';

//import icons
import mcIcon from './icons/mc-icon.svg';
import steelIcon from './icons/steel-icon.svg';
import titaniumIcon from './icons/titanium-icon.svg';
import plantsIcon from './icons/plants-icon.svg';
import energyIcon from './icons/energy-icon.svg';
import heatIcon from './icons/heat-icon.svg';

//import conversion graphics
import steelConversionGraphic from './icons/steel-conversion.svg';
import titaniumConversionGraphic from './icons/titanium-conversion.svg';
import plantConversionGraphic from './icons/plants-conversion.svg';
import heatConversionGraphic from './icons/heat-conversion.svg';

function App() {

    //================ TR ================
    const [tr, setTR] = useState(20);

    const incrementTR = (amount) => {
        setTR(tr + amount);
        addToLog('TR ' + (amount<0?"":"+") + amount);
    }

    //================ MC ================
    const [mcAvailable, setMcAvailable] = useState(0);
    const [mcProd, setMcProd] = useState(0);

    
    const incrementMC = (amount) => {
        setMcAvailable(mcAvailable + amount);
        addToLog('MegaCredits ' + (amount<0?"":"+") + amount);
    }
    
    const incrementMcProd = (amount) => {
        setMcProd(mcProd + amount);
        addToLog('MegaCredit production ' + (amount<0?"":"+") + amount);
    }

    //================ STEEL ================
    const [steelAvailable, setSteelAvailable] = useState(0);
    const [steelProd, setSteelProd] = useState(0);

    
    const incrementSteel = (amount) => {
        setSteelAvailable(steelAvailable + amount);
        addToLog('Steel ' + (amount<0?"":"+") + amount);
    }
    
    const incrementSteelProd = (amount) => {
        setSteelProd(steelProd + amount);
        addToLog('Steel production ' + (amount<0?"":"+") + amount);
    }

    //================ TITANIUM ================
    const [titaniumAvailable, setTitaniumAvailable] = useState(0);
    const [titaniumProd, setTitaniumProd] = useState(0);

    
    const incrementTitanium = (amount) => {
        setTitaniumAvailable(titaniumAvailable + amount);
        addToLog('Titanium ' + (amount<0?"":"+") + amount);
    }
    
    const incrementTitaniumProd = (amount) => {
        setTitaniumProd(titaniumProd + amount);
        addToLog('Titanium production' + (amount<0?"":"+") + amount);
    }

    //================ PLANTS ================
    const [plantsAvailable, setPlantsAvailable] = useState(0);
    const [plantProd, setPlantProd] = useState(0);

    
    const incrementPlants = (amount) => {
        setPlantsAvailable(plantsAvailable + amount);
        addToLog('Plants ' + (amount<0?"":"+") + amount);
    }
    
    const incrementPlantProd = (amount) => {
        setPlantProd(plantProd + amount);
        addToLog('Plant production ' + (amount<0?"":"+") + amount);
    }

    //================ ENERGY ================
    const [energyAvailable, setEnergyAvailable] = useState(0);
    const [energyProd, setEnergyProd] = useState(0);

    
    const incrementEnergy = (amount) => {
        setEnergyAvailable(energyAvailable + amount);
        addToLog('Energy ' + (amount<0?"":"+") + amount);
    }
    
    const incrementEnergyProd = (amount) => {
        setEnergyProd(energyProd + amount);
        addToLog('Energy production ' + (amount<0?"":"+") + amount);
    }

    //================ HEAT ================
    const [heatAvailable, setHeatAvailable] = useState(0);
    const [heatProd, setHeatProd] = useState(0);

    
    const incrementHeat = (amount) => {
        setHeatAvailable(heatAvailable + amount);
        addToLog('Heat ' + (amount<0?"":"+") + amount);
    }
    
    const incrementHeatProd = (amount) => {
        setHeatProd(heatProd + amount);
        addToLog('Heat production' + (amount<0?"":"+") + amount);
    }
    
    //================ ACTIONS ================
    const produce = () => {
        //ME
        setMcAvailable(mcAvailable + mcProd + tr);

        //Steel
        setSteelAvailable(steelAvailable + steelProd);

        //Titanium
        setTitaniumAvailable(titaniumAvailable + titaniumProd);

        //Plants
        setPlantsAvailable(plantsAvailable + plantProd);

        //Heat
        //heat must be produced before energy because leftover energy is added to heatAvailable
        setHeatAvailable(heatAvailable + heatProd + energyAvailable);

        //Energy
        //leftover energy is converted to heat, do not add energyAvailable here
        setEnergyAvailable(energyProd);

        toggleProductionChoice();
        addToLog('Production Phase');
    }

    const plantConversion = () => {
        setPlantsAvailable(plantsAvailable - 8);
        setTR(tr + 1);
        addToLog('Converted plants to Greenery tile');
    }

    const heatConversion = () => {
        setHeatAvailable(heatAvailable - 8);
        setTR(tr + 1);
        addToLog('Converted heat to raise the temperature');
    }

    //================ MISC STATE ================
    const [showProductionChoice, setShowProductionChoice] = useState(false);
    const [log, setLog] = useState([]);

    const toggleProductionChoice = () => {
        setShowProductionChoice(!showProductionChoice);
    }

    const addToLog = (action) => {
        setLog(prevLog => [action, ...prevLog.slice(0, 24)]);
    }

    //=============================================
    // RENDER
    //=============================================

    return (
        <MainWrapper className="App">
            <MaxWidthWrapper>
                <OverviewGrid>
                    <TerraformRatingWrapper>
                        <TerraformRating
                            tr={tr}
                        />
                    </TerraformRatingWrapper>
                    <OverviewCard
                        title='Mega Credits'
                        supply={mcAvailable}
                        production={mcProd}
                        icon={mcIcon}
                    />
                    <OverviewCard
                        title='Steel'
                        supply={steelAvailable}
                        production={steelProd}
                        icon={steelIcon}
                    />
                    <OverviewCard
                        title='Titanium'
                        supply={titaniumAvailable}
                        production={titaniumProd}
                        icon={titaniumIcon}
                    />
                    <OverviewCard
                        title='Plants'
                        supply={plantsAvailable}
                        production={plantProd}
                        icon={plantsIcon}
                    />
                    <OverviewCard
                        title='Energy'
                        supply={energyAvailable}
                        production={energyProd}
                        icon={energyIcon}
                    />
                    <OverviewCard
                        title='Heat'
                        supply={heatAvailable}
                        production={heatProd}
                        icon={heatIcon}
                    />
                </OverviewGrid>
                <SupplyGrid>
                    <Heading>Supply</Heading>
                    <SupplyCard 
                        resource='MC'
                        supply={mcAvailable}
                        icon={mcIcon}
                        increment={incrementMC}
                    />
                    <SupplyCard 
                        resource='Steel'
                        supply={steelAvailable}
                        icon={steelIcon}
                        increment={incrementSteel}
                    />
                    <SupplyCard 
                        resource='Titanium'
                        supply={titaniumAvailable}
                        icon={titaniumIcon}
                        increment={incrementTitanium}
                    />
                    <SupplyCard 
                        resource='Plants'
                        supply={plantsAvailable}
                        icon={plantsIcon}
                        increment={incrementPlants}
                    />
                    <SupplyCard 
                        resource='Energy'
                        supply={energyAvailable}
                        icon={energyIcon}
                        increment={incrementEnergy}
                    />
                    <SupplyCard 
                        resource='Heat'
                        supply={heatAvailable}
                        icon={heatIcon}
                        increment={incrementHeat}
                    />
                </SupplyGrid>
            </MaxWidthWrapper>
        </MainWrapper>
    );
}

const MainWrapper = styled.main`
    min-height: 100%;
    padding: 16px;
    background-color: ${COLORS.background};
`;

const MaxWidthWrapper = styled.div`
    max-width: 1300px;
    margin: 0 auto;
`;

const OverviewGrid = styled.section`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 16px;

`;

const TerraformRatingWrapper = styled.div`
    grid-column: 1 / -1;
`;

const SupplyGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 16px;
`;

const Heading = styled.h2`
    grid-column: 1 / -1;
`;

export default App;
