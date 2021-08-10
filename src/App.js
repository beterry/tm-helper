import { useState } from 'react';
import styled from 'styled-components';

//import constants
import {COLORS} from './constants';

//import components
import OverviewCard from './components/OverviewCard';
import TerraformRating from './components/TerraformRating';
import SupplyCard from './components/SupplyCard';
import ProductionStepper from './components/ProductionStepper';

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
        setMcProd(amount);
        addToLog('MegaCredit production: ' + amount);
    }

    //================ STEEL ================
    const [steelAvailable, setSteelAvailable] = useState(0);
    const [steelProd, setSteelProd] = useState(0);

    
    const incrementSteel = (amount) => {
        setSteelAvailable(steelAvailable + amount);
        addToLog('Steel ' + (amount<0?"":"+") + amount);
    }
    
    const incrementSteelProd = (amount) => {
        setSteelProd(amount);
        addToLog('Steel production: ' + amount);
    }

    //================ TITANIUM ================
    const [titaniumAvailable, setTitaniumAvailable] = useState(0);
    const [titaniumProd, setTitaniumProd] = useState(0);

    
    const incrementTitanium = (amount) => {
        setTitaniumAvailable(titaniumAvailable + amount);
        addToLog('Titanium ' + (amount<0?"":"+") + amount);
    }
    
    const incrementTitaniumProd = (amount) => {
        setTitaniumProd(amount);
        addToLog('Titanium production: ' + amount);
    }

    //================ PLANTS ================
    const [plantsAvailable, setPlantsAvailable] = useState(0);
    const [plantProd, setPlantProd] = useState(0);

    
    const incrementPlants = (amount) => {
        setPlantsAvailable(plantsAvailable + amount);
        addToLog('Plants ' + (amount<0?"":"+") + amount);
    }
    
    const incrementPlantProd = (amount) => {
        setPlantProd(amount);
        addToLog('Plant production: ' + amount);
    }

    //================ ENERGY ================
    const [energyAvailable, setEnergyAvailable] = useState(0);
    const [energyProd, setEnergyProd] = useState(0);

    
    const incrementEnergy = (amount) => {
        setEnergyAvailable(energyAvailable + amount);
        addToLog('Energy ' + (amount<0?"":"+") + amount);
    }
    
    const incrementEnergyProd = (amount) => {
        setEnergyProd(amount);
        addToLog('Energy production: ' + amount);
    }

    //================ HEAT ================
    const [heatAvailable, setHeatAvailable] = useState(0);
    const [heatProd, setHeatProd] = useState(0);

    
    const incrementHeat = (amount) => {
        setHeatAvailable(heatAvailable + amount);
        addToLog('Heat ' + (amount<0?"":"+") + amount);
    }
    
    const incrementHeatProd = (amount) => {
        setHeatProd(amount);
        addToLog('Heat production: ' + amount);
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
                <TerraformRatingWrapper>
                    <TerraformRating
                        tr={tr}
                    />
                </TerraformRatingWrapper>
                <SectionSpacer />
                <SupplyGrid>
                    <Heading>Supply</Heading>
                    <SupplyCard 
                        title='Mega Credits'
                        supply={mcAvailable}
                        icon={mcIcon}
                        increment={incrementMC}
                    />
                    <SupplyCard 
                        title='Steel'
                        supply={steelAvailable}
                        icon={steelIcon}
                        increment={incrementSteel}
                    />
                    <SupplyCard 
                        title='Titanium'
                        supply={titaniumAvailable}
                        icon={titaniumIcon}
                        increment={incrementTitanium}
                    />
                    <SupplyCard 
                        title='Plants'
                        supply={plantsAvailable}
                        icon={plantsIcon}
                        increment={incrementPlants}
                    />
                    <SupplyCard 
                        title='Energy'
                        supply={energyAvailable}
                        icon={energyIcon}
                        increment={incrementEnergy}
                    />
                    <SupplyCard 
                        title='Heat'
                        supply={heatAvailable}
                        icon={heatIcon}
                        increment={incrementHeat}
                    />
                </SupplyGrid>
                <SectionSpacer />
                <ProductionWrapper>
                    <Heading>Production</Heading>
                    <ProductionStepper
                        icon={mcIcon}
                        min={-5}
                        production={mcProd}
                        increment={incrementMcProd}
                    />
                    <ProductionStepper
                        icon={steelIcon}
                        min={0}
                        production={steelProd}
                        increment={incrementSteelProd}
                    />
                    <ProductionStepper
                        icon={titaniumIcon}
                        min={0}
                        production={titaniumProd}
                        increment={incrementTitaniumProd}
                    />
                    <ProductionStepper
                        icon={plantsIcon}
                        min={0}
                        production={plantProd}
                        increment={incrementPlantProd}
                    />
                    <ProductionStepper
                        icon={energyIcon}
                        min={0}
                        production={energyProd}
                        increment={incrementEnergyProd}
                    />
                    <ProductionStepper
                        icon={heatIcon}
                        min={0}
                        production={heatProd}
                        increment={incrementHeatProd}
                    />
                </ProductionWrapper>
            </MaxWidthWrapper>
            <ProduceWrapper>
                {
                    showProductionChoice ?
                    <>
                        <ProduceButton onClick={() => produce()}>Produce</ProduceButton>
                        <CancelProduceButton onClick={() => toggleProductionChoice()}>Cancel</CancelProduceButton>
                    </>
                    :
                    <ProduceButton onClick={() => toggleProductionChoice()}>Produce</ProduceButton>
                }
            </ProduceWrapper>
        </MainWrapper>
    );
}

const MainWrapper = styled.main`
    min-height: 100%;
    padding: 16px;
    background-color: ${COLORS.background};
    position: relative;
`;

const MaxWidthWrapper = styled.div`
    max-width: 1300px;
    margin: 0 auto;
`;

const TerraformRatingWrapper = styled.div`
    
`;

const SupplyGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 16px;
`;

const Heading = styled.h2`
    grid-column: 1 / -1;
`;

const ProductionWrapper = styled.div``;

const ProduceWrapper = styled.div`
    position: fixed;
    bottom: 32px;
    right: 32px;
    left: 32px;
    display: flex;
    justify-content: flex-end;
    gap: 16px;
`;

const ProduceButton = styled.button`
    background-color: ${COLORS.mainBlue};
    border: none;
    min-height: 50px;
    min-width: 150px;
    border-radius: 25px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: .7px;
`;

const CancelProduceButton = styled(ProduceButton)`
    background-color: transparent;
    color: ${COLORS.error};
    border: 1px solid ${COLORS.error};
`;

const SectionSpacer = styled.div`
    height: 32px;
`;

export default App;
