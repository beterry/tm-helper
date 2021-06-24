import styled from 'styled-components';

//import components
import Cubes from './Cubes';

//import icons
import greeneryTileIcon from '../icons/Greenery.svg';
import oceanTileIcon from '../icons/Ocean.svg';
import tempIcon from '../icons/Temp.svg';
import minusIcon from '../icons/Minus.svg';

const ResourceCard = ({
    title,
    available,
    increment,
    production,
    incrementProd,
    color = '#C24914',
    darkText = false,
    icon,
    conversion,
    conversionAction,
    conversionAvailable,
    conversionText,
    children
}) => {
    return (
        <CardContainer>
            <CardHeader color={color} darkText={darkText}>
                <CardTitle>{title}</CardTitle>
                <CardIcon src={icon} alt='icon' />
            </CardHeader>
            <FlexWrapper>
                <AvailableNumber>{available}</AvailableNumber>
                <ProductionContainer>
                    <IncrementProduction onClick={() => incrementProd(-1)} disabled={production <= 0}>
                        <span className="material-icons">
                            arrow_left
                        </span>
                    </IncrementProduction>
                    <Production>{production}</Production>
                    <IncrementProduction onClick={() => incrementProd(1)}>
                        <span className="material-icons">
                            arrow_right
                        </span>
                    </IncrementProduction>
                </ProductionContainer>
            </FlexWrapper>
            <Cubes current={available} increment={increment} />
            <ConversionContainer>
                {conversion}
                {conversionAvailable && <ConversionButton onClick={() => conversionAction()} color={color}>{conversionText}</ConversionButton>}
            </ConversionContainer>
        </CardContainer>
    )
}

const TRCard = ({
    tr,
    increment,
    color = '#C24914',
    darkText = false,
    icon
}) => {
    return(
        <CardContainer>
            <CardHeader color={color} darkText={darkText}>
                <CardTitle>Terraform Rating</CardTitle>
                <CardIcon src={icon} alt='icon' />
            </CardHeader>
            <AvailableNumber>{tr}</AvailableNumber>
            <GlobalParamContainer>
                <GlobalParam onClick={() => increment(1)}>
                    <img src={greeneryTileIcon} alt='Greenery tile' />
                </GlobalParam>
                <GlobalParam onClick={() => increment(1)}>
                    <img src={oceanTileIcon} alt='Ocean tile' />
                </GlobalParam>
                <GlobalParam onClick={() => increment(1)}>
                    <img src={tempIcon} alt='Raise temperature' />
                </GlobalParam>
                <GlobalParam onClick={() => increment(-1)}>
                    <img src={minusIcon} alt='Minus TR' />
                </GlobalParam>
            </GlobalParamContainer>
        </CardContainer>
    )
}

const CardContainer = styled.section`
    background-color: white;
    padding: 16px;
    border-radius: 4px;
    box-shadow: 0px 3px 6px rgba(0,0,0,.25);
    overflow: hidden;
    margin: 24px 0;
`;

const CardHeader = styled.div`
    color: ${props => props.darkText ? 'black' : 'white'};
    background-color: ${props => props.color};
    padding: 8px 16px;
    margin: -16px;
    margin-bottom: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const CardTitle = styled.h3`
    font-size: 1rem;
    text-transform: uppercase;
    font-weight: 600;
    margin: 0;
    letter-spacing: 1px;
`

const CardIcon = styled.img`
    width: 24px;
`

const AvailableNumber = styled.h2`
    font-size: 4rem;
    font-weight: 700;
    margin: 0;
`

const FlexWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`

const ProductionContainer = styled.div`
    display: flex;
    align-items: center;
    margin-right: -16px;
`

const Production = styled.h3`
    height: 40px;
    width: 40px;
    background: linear-gradient(#643C23, #8D562A);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0;
`

const IncrementProduction = styled.button`
    height: 40px;
    width: 40px;
    border: none;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;

    .material-icons{
        font-size: 32px;
    }
`

const GlobalParamContainer = styled.div`
    display: flex;
    align-items: center;
`

const GlobalParam = styled.button`
    width: 60px;
    height: 60px;
    background-color: transparent;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;

    img{
        width: 60px;
    }
`

const ConversionContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;

    p{
        margin: 0;
        margin-top: 24px;
        opacity: .75;
    }

    *{
        margin-top: 24px;
    }
`

const ConversionButton = styled.button`
    padding: 4px 16px; 
    margin-right: -16px;
    background-color: transparent;
    border: none;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: ${props => props.color};
    font-weight: 600;
`

export {ResourceCard, TRCard};