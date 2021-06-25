import { useState } from 'react';
import styled from 'styled-components';

//import constants
import {COLORS} from './constants';

//import components
import {ResourceCard, TRCard} from './components/Card';
import ResourceOverview from './components/ResourceOverview';

//import icons
import trIcon from './icons/TR.svg';
import mcIcon from './icons/ME.svg';
import steelIcon from './icons/Steel.svg';
import titaniumIcon from './icons/Titanium.svg';
import plantsIcon from './icons/Plants.svg';
import energyIcon from './icons/Energy.svg';
import heatIcon from './icons/Heat.svg';

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

    //================ ME ================
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

    return (
        <MainWrapper className="App">

            <Heading>Overview</Heading>

            <TRCard
                tr={tr}
                increment={incrementTR}
                icon={trIcon}
            />

            <Overview>
                <ResourceOverview
                    anchor='MegaCredits'
                    amount={mcAvailable}
                    icon={mcIcon}
                    color={COLORS.mc.bk}
                    textColor={COLORS.mc.text}
                />
                <ResourceOverview
                    anchor='Steel'
                    amount={steelAvailable}
                    icon={steelIcon}
                    color={COLORS.steel.bk}
                    textColor={COLORS.steel.text}
                />
                <ResourceOverview
                    anchor='Titanium'
                    amount={titaniumAvailable}
                    icon={titaniumIcon}
                    color={COLORS.titanium.bk}
                    textColor={COLORS.titanium.text}
                />
                <ResourceOverview
                    anchor='Plants'
                    amount={plantsAvailable}
                    icon={plantsIcon}
                    color={COLORS.plants.bk}
                    textColor={COLORS.plants.text}
                />
                <ResourceOverview
                    anchor='Energy'
                    amount={energyAvailable}
                    icon={energyIcon}
                    color={COLORS.energy.bk}
                    textColor={COLORS.energy.text}
                />
                <ResourceOverview
                    anchor='Heat'
                    amount={heatAvailable}
                    icon={heatIcon}
                    color={COLORS.heat.bk}
                    textColor={COLORS.heat.text}
                />
            </Overview>

            {showProductionChoice
                ? 
                <ProductionChoiceContainer>
                    <ProductionButton onClick={() => produce()}>Produce</ProductionButton>
                    <CancelButton onClick={() => toggleProductionChoice()}>Cancel</CancelButton>
                </ProductionChoiceContainer>
                :
                <ProductionButton onClick={() => toggleProductionChoice()}>Production Phase</ProductionButton>
            }

            <SectionPadding />

            <Heading>Edit Resources</Heading>

            <ResourceCard
                title = 'MegaCredits'
                available = {mcAvailable}
                increment={incrementMC}
                production = {mcProd}
                incrementProd = {incrementMcProd}
                color={COLORS.mc.bk}
                darkText={true}
                icon={mcIcon}
            />

            <ResourceCard
                title = 'Steel'
                available = {steelAvailable}
                increment={incrementSteel}
                production = {steelProd}
                incrementProd = {incrementSteelProd}
                color={COLORS.steel.bk}
                icon={steelIcon}
                conversion={<ConversionGraphic src={steelConversionGraphic} alt='Building tag : steel resource = 2 me'/>}
            />

            <ResourceCard
                title = 'Titanium'
                available = {titaniumAvailable}
                increment={incrementTitanium}
                production = {titaniumProd}
                incrementProd = {incrementTitaniumProd}
                color={COLORS.titanium.bk}
                icon={titaniumIcon}
                conversion={<ConversionGraphic src={titaniumConversionGraphic} alt='Space tag : titanium resource = 3 me'/>}
            />

            <ResourceCard
                title = 'Plants'
                available = {plantsAvailable}
                increment={incrementPlants}
                production = {plantProd}
                incrementProd = {incrementPlantProd}
                color={COLORS.plants.bk}
                icon={plantsIcon}
                conversion={<ConversionGraphic src={plantConversionGraphic} alt='8 plant tags -> Greenery tile'/>}
                conversionAction={plantConversion}
                conversionAvailable={plantsAvailable >= 8}
                conversionText='Greenery Tile'
            />

            <ResourceCard
                title = 'Energy'
                available = {energyAvailable}
                increment={incrementEnergy}
                production = {energyProd}
                incrementProd = {incrementEnergyProd}
                color={COLORS.energy.bk}
                icon={energyIcon}
                conversion={<p>Leftover energy is converted to heat</p>}
            />

            <ResourceCard
                title = 'Heat'
                available = {heatAvailable}
                increment={incrementHeat}
                production = {heatProd}
                incrementProd = {incrementHeatProd}
                color={COLORS.heat.bk}
                icon={heatIcon}
                conversion={<ConversionGraphic src={heatConversionGraphic} alt='8 heat tags -> Raise temperature'/>}
                conversionAction={heatConversion}
                conversionAvailable={heatAvailable >= 8}
                conversionText='Raise Temperature'
            />

            <SectionPadding />

            <Heading>Log</Heading>

            <LogContainer>
                {log.length === 0 && <p>Your actions will appear here</p>}
                {log.map((action, i) => <p key={i}>{action}</p>)}
            </LogContainer>

        </MainWrapper>
    );
}

const MainWrapper = styled.main`
    min-height: 100%;
    padding: 16px;
`;

const Heading = styled.h2`
    font-size: 2.25rem;
    margin: 0;
    font-weight: 700;
    font-family: 'Share Tech', sans-serif;
    text-transform: uppercase;
    padding-bottom: 8px;
    border-bottom: 1px solid lightgray;
`

const SectionPadding = styled.div`
    height: 2.5rem;
`

const ConversionGraphic = styled.img`
    height: 32px;
`

const ProductionButton = styled.button`
    background-color: #C24914;
    padding: 16px 32px;
    text-align: center;
    border: none;
    box-shadow: 0px 3px 6px rgba(0,0,0,.25);
    border-radius: 32px;
    color: white;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    width: 100%;
    margin: 24px 0;
`

const ProductionChoiceContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
`

const CancelButton = styled(ProductionButton)`
    background-color: white;
    color: black;
`

const Overview = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 16px;
`

const LogContainer = styled.div`
    padding: 16px 0;
    p{
        font-family: 'Share Tech', sans-serif;
        margin: 8px 0;
        opacity: .75;
    }
`

export default App;
