import { useState } from 'react';
import styled from 'styled-components';

//import constants
import {COLORS} from './constants';

//import components
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
import forestTile from './icons/tile_forest.svg';
import tempTile from './icons/tile_temp.svg';
import oceanTile from './icons/tile_ocean.svg';

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
                        increment={incrementTR}
                    />
                    <TileWrapper>
                        <TileButton
                            onClick={() => incrementTR(1)}
                        >
                            <img src={forestTile} alt=""/>
                        </TileButton>
                        <TileButton
                            onClick={() => incrementTR(1)}
                        >
                            <img src={tempTile} alt=""/>
                        </TileButton>
                        <TileButton
                            onClick={() => incrementTR(1)}
                        >
                            <img src={oceanTile} alt=""/>
                        </TileButton>
                    </TileWrapper>
                </TerraformRatingWrapper>
                <MainGrid>
                    <SupplyWrapper>
                        <Heading>Supply</Heading>
                        <SupplyGrid>
                            <SupplyCard 
                                title='Mega Credits'
                                supply={mcAvailable}
                                icon={mcIcon}
                                increment={incrementMC}
                                showProduction={showProductionChoice}
                                production={mcProd + tr}
                            />
                            <SupplyCard 
                                title='Steel'
                                supply={steelAvailable}
                                icon={steelIcon}
                                increment={incrementSteel}
                                showProduction={showProductionChoice}
                                production={steelProd}
                            />
                            <SupplyCard 
                                title='Titanium'
                                supply={titaniumAvailable}
                                icon={titaniumIcon}
                                increment={incrementTitanium}
                                showProduction={showProductionChoice}
                                production={titaniumProd}
                            />
                            <SupplyCard 
                                title='Plants'
                                supply={plantsAvailable}
                                icon={plantsIcon}
                                increment={incrementPlants}
                                showProduction={showProductionChoice}
                                production={plantProd}
                            />
                            <SupplyCard 
                                title='Energy'
                                supply={energyAvailable}
                                icon={energyIcon}
                                increment={incrementEnergy}
                                showProduction={showProductionChoice}
                                production={energyProd - energyAvailable}
                            />
                            <SupplyCard 
                                title='Heat'
                                supply={heatAvailable}
                                icon={heatIcon}
                                increment={incrementHeat}
                                showProduction={showProductionChoice}
                                production={heatProd + energyAvailable}
                            />
                        </SupplyGrid>
                    </SupplyWrapper>
                    <RightWrapper>
                        <Heading>Production</Heading>
                        <SectionSpacer size='16px'/>
                        <ProductionWrapper>
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
                        <SectionSpacer size='32px'/>
                        <Heading>Log</Heading>
                        <SectionSpacer size='16px'/>
                        <LogWrapper>
                            {log.map((action, i) => <Action key={i}>{action}</Action>)}
                        </LogWrapper>
                    </RightWrapper>
                </MainGrid>
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
    padding: 32px 16px;
    background-color: ${COLORS.background};
    position: relative;
    
    @media screen and (min-width: 600px){
        padding: 32px;
    }
`;

const MaxWidthWrapper = styled.div`
    height: 100%;
    max-width: 1400px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    gap: 32px;
`;

const TerraformRatingWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 32px;

    @media screen and (min-width: 600px){
        grid-template-columns: 1fr 1fr;
    }
`;

const TileWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (min-width: 600px){
        justify-content: flex-end;
    }
`;

const TileButton = styled.button`
    width: 70px;
    height: 70px;
    background-color: transparent;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
`;

const MainGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 32px;

    @media screen and (min-width: 786px){
        grid-template-columns: 5fr 2fr;
    }
`;

const RightWrapper = styled.div`
    
`;

const LogWrapper = styled.div`
    height: 200px;
    overflow-y: auto;
`;

const Action = styled.p`
    margin-top: 8px;
    opacity: .5;

    &:first-of-type{
        margin-top: 0;
    }
`;

const SupplyWrapper = styled.div`
    display: grid;
    grid-template-rows: auto 1fr;
    gap: 16px;
`;

const SupplyGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 16px;
    overflow-y: auto;
`;

const Heading = styled.h2`
    
`;

const ProductionWrapper = styled.div`
    display: grid;
    gap: 8px;
`;

const ProduceWrapper = styled.div`
    position: fixed;
    bottom: 32px;
    right: 32px;
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
    height: ${props => props.size};
`;

export default App;
