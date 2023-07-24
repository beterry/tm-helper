import React from 'react'
import styled from 'styled-components'

// COMPONENTS
import ProductionStepper from './ProductionStepper'

// ICONS
import mcIcon from '../icons/mc-icon.svg'
import steelIcon from '../icons/steel-icon.svg'
import titaniumIcon from '../icons/titanium-icon.svg'
import plantsIcon from '../icons/plants-icon.svg'
import energyIcon from '../icons/energy-icon.svg'
import heatIcon from '../icons/heat-icon.svg'

const Production = ({ store, adjustProduction }) => {
    return (
        <Wrapper>
            <Heading>Production</Heading>
            <SectionSpacer size='16px' />
            <ProductionWrapper>
                <ProductionStepper
                    resource='credits'
                    production={store['credits'].production}
                    adjustProduction={adjustProduction}
                    icon={mcIcon}
                    min={-5}
                />
                <ProductionStepper
                    resource='steel'
                    production={store['steel'].production}
                    adjustProduction={adjustProduction}
                    icon={steelIcon}
                />
                <ProductionStepper
                    resource='titanium'
                    production={store['titanium'].production}
                    adjustProduction={adjustProduction}
                    icon={titaniumIcon}
                />
                <ProductionStepper
                    resource='plants'
                    production={store['plants'].production}
                    adjustProduction={adjustProduction}
                    icon={plantsIcon}
                />
                <ProductionStepper
                    resource='energy'
                    production={store['energy'].production}
                    adjustProduction={adjustProduction}
                    icon={energyIcon}
                />
                <ProductionStepper
                    resource='heat'
                    production={store['heat'].production}
                    adjustProduction={adjustProduction}
                    icon={heatIcon}
                />
            </ProductionWrapper>
        </Wrapper>
    )
}

const Heading = styled.h2``

const Wrapper = styled.section``

const ProductionWrapper = styled.div`
    display: grid;
    gap: 8px;
`

const SectionSpacer = styled.div`
    height: ${props => props.size};
`

export default Production