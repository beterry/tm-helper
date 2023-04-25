import React, { useState } from 'react';
import styled from 'styled-components';

// CONSTANTS
import {COLORS} from './constants';

// COMPONENTS
import TerraformRating from './components/TerraformRating';
import Supply from './components/Supply';
import ActionLog from './components/ActionLog';

// CONTEXT
import { StoreContext } from './providers/store-provider';

// ICONS
import forestTile from './icons/tile_forest.svg';
import tempTile from './icons/tile_temp.svg';
import oceanTile from './icons/tile_ocean.svg';
import Production from './components/Production';

function App() {

    //=============================================
    // CONTEXT
    //=============================================
    const { rating, adjustRating, produce } = React.useContext(StoreContext);

    //=============================================
    // MISC STATE
    //=============================================
    const [showProductionChoice, setShowProductionChoice] = useState(false);

    const toggleProductionChoice = () => {
        setShowProductionChoice(!showProductionChoice);
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
                        tr={rating}
                        increment={adjustRating}
                    />
                    <TileWrapper>
                        <TileButton
                            onClick={() => adjustRating(1)}
                        >
                            <img src={forestTile} alt=""/>
                        </TileButton>
                        <TileButton
                            onClick={() => adjustRating(1)}
                        >
                            <img src={tempTile} alt=""/>
                        </TileButton>
                        <TileButton
                            onClick={() => adjustRating(1)}
                        >
                            <img src={oceanTile} alt=""/>
                        </TileButton>
                    </TileWrapper>
                </TerraformRatingWrapper>

                <MainGrid>
                    {/* SUPPLY CARDS */}
                    <Supply showProduction={showProductionChoice}/>

                    <RightWrapper>
                        {/* PRODUCTION STEPPERS */}
                        <Production />

                        <SectionSpacer size='32px'/>

                        {/* ACTION LOG */}
                        <ActionLog />
                    </RightWrapper>
                </MainGrid>
            </MaxWidthWrapper>

            {/* PRODUCE BUTTON -- BOTTOM RIGHT */}
            <ProduceWrapper>
                {
                    showProductionChoice ?
                    <>
                        <ProduceButton onClick={produce}>Produce</ProduceButton>
                        <CancelProduceButton onClick={toggleProductionChoice}>Cancel</CancelProduceButton>
                    </>
                    :
                    <ProduceButton onClick={toggleProductionChoice}>Produce</ProduceButton>
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

export default App;