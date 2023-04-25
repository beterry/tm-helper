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

const Production = () => {
    return (
        <Wrapper>
            <Heading>Production</Heading>
            <SectionSpacer size='16px' />
            <ProductionWrapper>
                <ProductionStepper
                    resource='credits'
                    icon={mcIcon}
                    min={-5}
                />
                <ProductionStepper
                    resource='steel'
                    icon={steelIcon}
                />
                <ProductionStepper
                    resource='titanium'
                    icon={titaniumIcon}
                />
                <ProductionStepper
                    resource='plants'
                    icon={plantsIcon}
                />
                <ProductionStepper
                    resource='energy'
                    icon={energyIcon}
                />
                <ProductionStepper
                    resource='heat'
                    icon={heatIcon}
                />
            </ProductionWrapper>
        </Wrapper>
    )
}

const Heading = styled.h2``

const Wrapper = styled.div``

const ProductionWrapper = styled.div`
    display: grid;
    gap: 8px;
`

const SectionSpacer = styled.div`
    height: ${props => props.size};
`

export default Production