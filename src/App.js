import React from 'react';
import styled from 'styled-components';

// CONSTANTS
import {COLORS} from './constants';

// COMPONENTS
import TerraformRating from './components/TerraformRating';
import Supply from './components/Supply';
import ActionLog from './components/ActionLog';

// HOOKS
import useStore from './hooks/useStore';

// ICONS
import Production from './components/Production';
import ProductionModal from './components/ProductionModal';
import ResetModal from './components/ResetModal';

function App() {
    const [rating, store, adjustRating, adjustAvailable, adjustProduction, produce, resetStore] = useStore();

    return (
        <MainWrapper>
            <MaxWidthWrapper>

                {/* TERRAFORMING RATING AND ACTIONS */}
                <TerraformRatingWrapper>
                    <TerraformRating
                        tr={rating}
                        increment={adjustRating}
                    />
                    <ActionWrapper>
                        <ProductionModal produce={produce}/>
                        <ResetModal resetStore={resetStore}/>
                    </ActionWrapper>
                </TerraformRatingWrapper>

                <MainGrid>
                    {/* SUPPLY CARDS */}
                    <Supply store={store} adjustAvailable={adjustAvailable}/>

                    <RightWrapper>
                        {/* PRODUCTION STEPPERS */}
                        <Production store={store} adjustProduction={adjustProduction}/>

                        <SectionSpacer size='32px'/>

                        {/* ACTION LOG */}
                        <ActionLog />
                    </RightWrapper>
                </MainGrid>
            </MaxWidthWrapper>
        </MainWrapper>
    )
}

const MainWrapper = styled.div`
    min-height: 100%;
    padding: 32px 16px;
    background-color: ${COLORS.background};
    position: relative;
    
    @media screen and (min-width: 600px){
        padding: 32px;
    }
`

const ActionWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr auto;
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

const TerraformRatingWrapper = styled.header`
    display: grid;
    grid-template-columns: 1fr;
    gap: 32px;
    align-items: center;

    @media screen and (min-width: 600px){
        grid-template-columns: 1fr auto;
    }
`

const MainGrid = styled.main`
    display: grid;
    grid-template-columns: 1fr;
    gap: 32px;

    @media screen and (min-width: 786px){
        grid-template-columns: 5fr 2fr;
    }
`

const RightWrapper = styled.div``

const SectionSpacer = styled.div`
    height: ${props => props.size};
`

export default App;