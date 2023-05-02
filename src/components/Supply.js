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

const Supply = ({ showProduction }) => {
    return (
        <SupplyWrapper>
            <Heading>Supply</Heading>
            <Directions>Add cubes to your supply caches by tapping <Plus>+</Plus>. Remove cubes by tapping the cube you wish to spend.</Directions>
            <SupplyGrid>
                <SupplyCard 
                    resource='credits'
                    title='Mega Credits'
                    icon={mcIcon}
                    showProduction={showProduction}
                />
                <SupplyCard 
                    resource='steel'
                    icon={steelIcon}
                    showProduction={showProduction}
                />
                <SupplyCard 
                    resource='titanium'
                    icon={titaniumIcon}
                    showProduction={showProduction}
                />
                <SupplyCard 
                    resource='plants'
                    icon={plantsIcon}
                    showProduction={showProduction}
                />
                <SupplyCard 
                    resource='energy'
                    icon={energyIcon}
                    showProduction={showProduction}
                />
                <SupplyCard 
                    resource='heat'
                    icon={heatIcon}
                    showProduction={showProduction}
                />
            </SupplyGrid>
        </SupplyWrapper>
    )
}

const SupplyWrapper = styled.div`
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