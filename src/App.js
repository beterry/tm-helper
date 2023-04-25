import React, { useState } from 'react'
import styled from 'styled-components'

// CONSTANTS
import {COLORS} from './constants'

// COMPONENTS
import TerraformRating from './components/TerraformRating'
import ProductionStepper from './components/ProductionStepper'
import Supply from './components/Supply'
import ActionLog from './components/ActionLog'

// CONTEXT
import { LogContext } from './providers/log-provider'

// ICONS
import mcIcon from './icons/mc-icon.svg'
import steelIcon from './icons/steel-icon.svg'
import titaniumIcon from './icons/titanium-icon.svg'
import plantsIcon from './icons/plants-icon.svg'
import energyIcon from './icons/energy-icon.svg'
import heatIcon from './icons/heat-icon.svg'
import forestTile from './icons/tile_forest.svg'
import tempTile from './icons/tile_temp.svg'
import oceanTile from './icons/tile_ocean.svg'

function App() {

    //=============================================
    // CONTEXT
    //=============================================
    const { addToLog } = React.useContext(LogContext)

    //=============================================
    // TR
    //=============================================
    const [tr, setTR] = useState(20)

    const incrementTR = (amount) => {
        setTR(tr + amount)
        addToLog('TR ' + (amount < 0 ? "" : "+") + amount)
    }

    //=============================================
    // MC
    //=============================================
    const [mcAvailable, setMcAvailable] = useState(0)
    const [mcProd, setMcProd] = useState(0)
    
    const incrementMcProd = (amount) => {
        setMcProd(amount)
        addToLog('MegaCredit production: ' + amount)
    }

    //=============================================
    // STEEL
    //=============================================
    const [steelAvailable, setSteelAvailable] = useState(0)
    const [steelProd, setSteelProd] = useState(0)
    
    const incrementSteelProd = (amount) => {
        setSteelProd(amount)
        addToLog('Steel production: ' + amount)
    }

    //=============================================
    // TITANIUM
    //=============================================
    const [titaniumAvailable, setTitaniumAvailable] = useState(0)
    const [titaniumProd, setTitaniumProd] = useState(0)
    
    const incrementTitaniumProd = (amount) => {
        setTitaniumProd(amount)
        addToLog('Titanium production: ' + amount)
    }

    //=============================================
    // PLANTS
    //=============================================
    const [plantsAvailable, setPlantsAvailable] = useState(0)
    const [plantProd, setPlantProd] = useState(0)
    
    const incrementPlantProd = (amount) => {
        setPlantProd(amount)
        addToLog('Plant production: ' + amount)
    }

    //=============================================
    // ENERGY
    //=============================================
    const [energyAvailable, setEnergyAvailable] = useState(0)
    const [energyProd, setEnergyProd] = useState(0)
    
    const incrementEnergyProd = (amount) => {
        setEnergyProd(amount)
        addToLog('Energy production: ' + amount)
    }

    //=============================================
    // HEAT
    //=============================================
    const [heatAvailable, setHeatAvailable] = useState(0)
    const [heatProd, setHeatProd] = useState(0)

    const incrementHeatProd = (amount) => {
        setHeatProd(amount)
        addToLog('Heat production: ' + amount)
    }
    
    //=============================================
    // ACTIONS
    //=============================================
    const produce = () => {
        // ME
        setMcAvailable(mcAvailable + mcProd + tr)

        // steel
        setSteelAvailable(steelAvailable + steelProd)

        // titanium
        setTitaniumAvailable(titaniumAvailable + titaniumProd)

        // plants
        setPlantsAvailable(plantsAvailable + plantProd)

        // heat
        // heat must be produced before energy because leftover energy is added to heatAvailable
        setHeatAvailable(heatAvailable + heatProd + energyAvailable)

        // energy
        // leftover energy is converted to heat, do not add energyAvailable here
        setEnergyAvailable(energyProd)

        toggleProductionChoice()
        addToLog('Production Phase')
    }

    //=============================================
    // MISC STATE
    //=============================================
    const [showProductionChoice, setShowProductionChoice] = useState(false)

    const toggleProductionChoice = () => {
        setShowProductionChoice(!showProductionChoice)
    }

    //=============================================
    // RENDER
    //=============================================

    return (
        <MainWrapper>
            <MaxWidthWrapper>

                {/* TERRAFORMING RATING AND TILES */}
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

                {/* SUPPLY CARDS */}
                <MainGrid>
                    <Supply showProduction={showProductionChoice}/>

                    {/* PRODUCTION STEPPERS */}
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

                        <ActionLog />
                    </RightWrapper>
                </MainGrid>
            </MaxWidthWrapper>

            {/* PRODUCE BUTTON -- BOTTOM RIGHT */}
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
    )
}

const MainWrapper = styled.main`
    min-height: 100%;
    padding: 32px 16px;
    background-color: ${COLORS.background};
    position: relative;
    
    @media screen and (min-width: 600px){
        padding: 32px;
    }
`

const MaxWidthWrapper = styled.div`
    height: 100%;
    max-width: 1400px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    gap: 32px;
`

const TerraformRatingWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 32px;

    @media screen and (min-width: 600px){
        grid-template-columns: 1fr 1fr;
    }
`

const TileWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (min-width: 600px){
        justify-content: flex-end;
    }
`

const TileButton = styled.button`
    width: 70px;
    height: 70px;
    background-color: transparent;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
`

const MainGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 32px;

    @media screen and (min-width: 786px){
        grid-template-columns: 5fr 2fr;
    }
`

const RightWrapper = styled.div``

const Heading = styled.h2``

const ProductionWrapper = styled.div`
    display: grid;
    gap: 8px;
`

const ProduceWrapper = styled.div`
    position: fixed;
    bottom: 32px;
    right: 24px;
    display: flex;
    justify-content: flex-end;
`

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
    margin: 0 8px;
`

const CancelProduceButton = styled(ProduceButton)`
    background-color: ${COLORS.error};
    color: white;
`

const SectionSpacer = styled.div`
    height: ${props => props.size};
`

export default App
