import {useState} from 'react';
import styled from 'styled-components';

import {COLORS} from '../constants';

import arrowRight from '../icons/chevron_right.svg';
import arrowLeft from '../icons/chevron_left.svg';

const ProductionStepper = ({icon, increment, production, min}) => {
    const [minRange, setMinRange] = useState(0);
    const [maxRange, setMaxRange] = useState(5);


    const pageUp = () => {
        setMinRange(minRange + 5);
        setMaxRange(maxRange + 5);
    }

    const pageDown = () => {
        setMinRange(minRange - 5);
        setMaxRange(maxRange - 5);
    }

    let currentRange = [];
    for (let i = minRange; i < maxRange; i++){
        currentRange.push(i);
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
                    onClick={() => increment(n)}
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
`;

const IconWrapper = styled.div`
    line-height: 1;
`;

const Icon = styled.img`
    display: block;
`;

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
`;

const PageButton = styled(ProductionButton)``;

export default ProductionStepper;