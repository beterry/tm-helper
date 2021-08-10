import styled from 'styled-components';

import {COLORS} from '../constants';

const ProductionStepper = ({icon, increment, production, min}) => {

    let rangeMin = production - 2;
    //don't allow range to go lower than min
    if (rangeMin < min){
        rangeMin = min;
    }

    let range = [];
    for (let i = 0; i < 5; i++){
        range.push(i + rangeMin);
    }

    return (
        <Wrapper>
            <IconWrapper><Icon src={icon} alt=""/></IconWrapper>
            {range.map((n, i) => 
                <ProductionButton
                    key={i}
                    active={n === production}
                    onClick={() => increment(n)}
                >
                    {n}
                </ProductionButton>
            )}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    border-radius: 8px;
    padding: 8px;

    &:nth-child(odd){
        background-color: ${COLORS.cardBK};
    }
`;

const IconWrapper = styled.div``;

const Icon = styled.img``;

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
`;

export default ProductionStepper;