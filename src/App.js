import { useState } from 'react';
import styled from 'styled-components';

//import components
import {ResourceCard, TRCard} from './components/Card';

//import icons
import trIcon from './icons/TR.svg';
import meIcon from './icons/ME.svg';
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
    }

    //================ ME ================
    const [meAvailable, setMeAvailable] = useState(0);
    const [meProd, setMeProd] = useState(0);

    
    const incrementME = (amount) => {
        setMeAvailable(meAvailable + amount);
    }
    
    const incrementMeProd = (amount) => {
        setMeProd(meProd + amount);
    }

    //================ STEEL ================
    const [steelAvailable, setSteelAvailable] = useState(0);
    const [steelProd, setSteelProd] = useState(0);

    
    const incrementSteel = (amount) => {
        setSteelAvailable(steelAvailable + amount);
    }
    
    const incrementSteelProd = (amount) => {
        setSteelProd(steelProd + amount);
    }

    //================ TITANIUM ================
    const [titaniumAvailable, setTitaniumAvailable] = useState(0);
    const [titaniumProd, setTitaniumProd] = useState(0);

    
    const incrementTitanium = (amount) => {
        setTitaniumAvailable(titaniumAvailable + amount);
    }
    
    const incrementTitaniumProd = (amount) => {
        setTitaniumProd(titaniumProd + amount);
    }

    //================ PLANTS ================
    const [plantsAvailable, setPlantsAvailable] = useState(0);
    const [plantProd, setPlantProd] = useState(0);

    
    const incrementPlants = (amount) => {
        setPlantsAvailable(plantsAvailable + amount);
    }
    
    const incrementPlantProd = (amount) => {
        setPlantProd(plantProd + amount);
    }

    //================ ENERGY ================
    const [energyAvailable, setEnergyAvailable] = useState(0);
    const [energyProd, setEnergyProd] = useState(0);

    
    const incrementEnergy = (amount) => {
        setEnergyAvailable(energyAvailable + amount);
    }
    
    const incrementEnergyProd = (amount) => {
        setEnergyProd(energyProd + amount);
    }

    //================ HEAT ================
    const [heatAvailable, setHeatAvailable] = useState(0);
    const [heatProd, setHeatProd] = useState(0);

    
    const incrementHeat = (amount) => {
        setHeatAvailable(heatAvailable + amount);
    }
    
    const incrementHeatProd = (amount) => {
        setHeatProd(heatProd + amount);
    }
    
    //================ ACTIONS ================
    const produce = () => {
        //ME
        setMeAvailable(meAvailable + meProd + tr);

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
    }

    const plantConversion = () => {
        setPlantsAvailable(plantsAvailable - 8);
        setTR(tr + 1);
    }

    const heatConversion = () => {
        setHeatAvailable(heatAvailable - 8);
        setTR(tr + 1);
    }

    //================ MISC STATE ================
    const [showProductionChoice, setShowProductionChoice] = useState(false);

    const toggleProductionChoice = () => {
        setShowProductionChoice(!showProductionChoice);
    }

    return (
        <MainWrapper className="App">
            {showProductionChoice
                ? 
                <ProductionChoiceContainer>
                    <ProductionButton onClick={() => produce()}>Produce</ProductionButton>
                    <CancelButton onClick={() => toggleProductionChoice()}>Cancel</CancelButton>
                </ProductionChoiceContainer>
                :
                <ProductionButton onClick={() => toggleProductionChoice()}>Production Phase</ProductionButton>
            }

            <TRCard
                tr={tr}
                increment={incrementTR}
                icon={trIcon}
            />

            <ResourceCard
                title = 'MegaCredits'
                available = {meAvailable}
                increment={incrementME}
                production = {meProd}
                incrementProd = {incrementMeProd}
                color='#FFE600'
                darkText={true}
                icon={meIcon}
            />

            <ResourceCard
                title = 'Steel'
                available = {steelAvailable}
                increment={incrementSteel}
                production = {steelProd}
                incrementProd = {incrementSteelProd}
                color='#976138'
                icon={steelIcon}
                conversion={<ConversionGraphic src={steelConversionGraphic} alt='Building tag : steel resource = 2 me'/>}
            />

            <ResourceCard
                title = 'Titanium'
                available = {titaniumAvailable}
                increment={incrementTitanium}
                production = {titaniumProd}
                incrementProd = {incrementTitaniumProd}
                color='#000000'
                icon={titaniumIcon}
                conversion={<ConversionGraphic src={titaniumConversionGraphic} alt='Space tag : titanium resource = 3 me'/>}
            />

            <ResourceCard
                title = 'Plants'
                available = {plantsAvailable}
                increment={incrementPlants}
                production = {plantProd}
                incrementProd = {incrementPlantProd}
                color='#6CB526'
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
                color='#94308B'
                icon={energyIcon}
                conversion={<p>Leftover energy is converted to heat</p>}
            />

            <ResourceCard
                title = 'Heat'
                available = {heatAvailable}
                increment={incrementHeat}
                production = {heatProd}
                incrementProd = {incrementHeatProd}
                color='#EA4929'
                icon={heatIcon}
                conversion={<ConversionGraphic src={heatConversionGraphic} alt='8 heat tags -> Raise temperature'/>}
                conversionAction={heatConversion}
                conversionAvailable={heatAvailable >= 8}
                conversionText='Raise Temperature'
            />

        </MainWrapper>
    );
}

const MainWrapper = styled.main`
    min-height: 100%;
    background-color: #F5F5F5;

    padding: 16px;
`;

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

export default App;
