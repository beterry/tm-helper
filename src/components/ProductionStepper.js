import React, { useState } from 'react'
import styled from 'styled-components'

// CONTEXT
import { StoreContext } from '../providers/store-provider'

// constants
import { COLORS } from '../constants'
import { RESOURCE_NAMES } from '../providers/store-provider'

// images
import arrowRight from '../icons/chevron_right.svg'
import arrowLeft from '../icons/chevron_left.svg'

const ProductionStepper = ({resource, icon, min = 0}) => {

    // throw error if resource in invalid
    if (!RESOURCE_NAMES.includes(resource)) {
        throw new Error(`Invalid resource: ${resource}. Supported resources: ${RESOURCE_NAMES.join(', ')}`)
    }

    // number of steps in the stepper
    const range = 5

    // tracks the lowest number in the range
    const [minRange, setMinRange] = useState(0)

    // tracks largest number in the range
    const [maxRange, setMaxRange] = useState(range)

    // get store data from context
    const { store, adjustProduction } = React.useContext(StoreContext)
    const production = store[resource].production

    const pageUp = () => {
        setMinRange(minRange + range)
        setMaxRange(maxRange + range)
    }

    const pageDown = () => {
        setMinRange(minRange - range)
        setMaxRange(maxRange - range)
    }

    // use component state to compose array of steps
    let currentRange = []
    for (let i = minRange; i < maxRange; i++){
        currentRange.push(i)
    }

    return (
        <Wrapper>
            <IconWrapper><Icon src={icon} alt=""/></IconWrapper>
            <PageButton
                onClick={() => pageDown()}
                disabled={minRange <= min}
            >
                <Icon src={arrowLeft} alt="" />
            </PageButton>
            {currentRange.map((n, i) => 
                <ProductionButton
                    key={i}
                    active={n === production}
                    onClick={() => adjustProduction(resource, n)}
                    disabled={n < min}
                >
                    {n}
                </ProductionButton>
            )}
            <PageButton
                onClick={() => pageUp()}
            >
                <Icon src={arrowRight} alt="" />
            </PageButton>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 8px;
    padding: 8px;

    &:nth-child(odd){
        background-color: ${COLORS.cardBK};
    }
`

const IconWrapper = styled.div`
    line-height: 1;
`

const Icon = styled.img`
    display: block;
`

const ProductionButton = styled.button`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.active ? COLORS.mainBlue : 'transparent'};
    border: none;
    color: white;

    &:disabled{
        opacity: .3;
    }
`

const PageButton = styled(ProductionButton)``

export default ProductionStepper