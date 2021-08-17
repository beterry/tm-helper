import {useState, useEffect} from 'react';
import styled from 'styled-components';

import {COLORS} from '../constants';

import arrowRight from '../icons/chevron_right.svg';
import arrowLeft from '../icons/chevron_left.svg';

const ProductionStepper = ({icon, increment, production, min}) => {
    const [minRange, setMinRange] = useState(0);
    const [maxRange, setMaxRange] = useState(window.innerWidth < 1000 ? 5 : 10);
    const [range, setRange] = useState(window.innerWidth < 1000 ? 5 : 10);

    useEffect(() => {
        const handleWindowResize = () => {
            const windowWidth = window.innerWidth;
            
            if (windowWidth < 1000){
                setMinRange(0);
                setMaxRange(5)
                setRange(5);
            }else {
                setMinRange(0);
                setMaxRange(10)
                setRange(10);
            }
        }

        window.addEventListener("resize", handleWindowResize);

        return () => window.removeEventListener("resize", handleWindowResize)
    }, []);

    const pageUp = () => {
        setMinRange(minRange + range);
        setMaxRange(maxRange + range);
    }

    const pageDown = () => {
        setMinRange(minRange - range);
        setMaxRange(maxRange - range);
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