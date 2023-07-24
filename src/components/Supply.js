import React from 'react'
import styled from 'styled-components'

// COMPONENTS
import SupplyCard from './SupplyCard'

// ICONS
import mcIcon from '../icons/mc-icon.svg'
import steelIcon from '../icons/steel-icon.svg'
import titaniumIcon from '../icons/titanium-icon.svg'
import plantsIcon from '../icons/plants-icon.svg'
import energyIcon from '../icons/energy-icon.svg'
import heatIcon from '../icons/heat-icon.svg'

// CONSTANTS
import { COLORS } from '../constants'

const Supply = ({ store, adjustAvailable }) => {
    return (
        <SupplyWrapper>
            <Heading>Supply</Heading>
            <Directions>Add cubes to your supply caches by tapping <Plus>+</Plus>. Remove cubes by tapping the cube you wish to spend.</Directions>
            <SupplyGrid>
                <SupplyCard 
                    resource='credits'
                    title='Mega Credits'
                    supply={store['credits'].available}
                    icon={mcIcon}
                    adjustAvailable={adjustAvailable}
                />
                <SupplyCard 
                    resource='steel'
                    supply={store['steel'].available}
                    icon={steelIcon}
                    adjustAvailable={adjustAvailable}
                />
                <SupplyCard 
                    resource='titanium'
                    supply={store['titanium'].available}
                    icon={titaniumIcon}
                    adjustAvailable={adjustAvailable}
                />
                <SupplyCard 
                    resource='plants'
                    supply={store['plants'].available}
                    icon={plantsIcon}
                    adjustAvailable={adjustAvailable}
                />
                <SupplyCard 
                    resource='energy'
                    supply={store['energy'].available}
                    icon={energyIcon}
                    adjustAvailable={adjustAvailable}
                />
                <SupplyCard 
                    resource='heat'
                    supply={store['heat'].available}
                    icon={heatIcon}
                    adjustAvailable={adjustAvailable}
                />
            </SupplyGrid>
        </SupplyWrapper>
    )
}

const SupplyWrapper = styled.section`
    display: grid;
    grid-template-rows: auto auto 1fr;
    gap: 16px;
`

const SupplyGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 16px;
    overflow-y: auto;
`

const Directions = styled.p`
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.25;
`

const Heading = styled.h2``

const Plus = styled.span`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: ${COLORS.mainBlue};
    width: 16px;
    height: 16px;
    border-radius: 50%;
    color: ${COLORS.cardBK};
    font-weight: 600;
`

export default Supply