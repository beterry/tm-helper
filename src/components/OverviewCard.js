import styled from 'styled-components';

//import constants
import {COLORS} from '../constants';

const OverviewCard = ({title, supply, production, icon}) => {
    return (
        <Wrapper>
            <div>
                <Title>{title}</Title>
                <Values>
                    <Supply>{supply}</Supply>
                    <Production>{production >= 0 ? '+ ' + production : production}</Production>
                </Values>
            </div>
            <IconWrapper><Icon src={icon} alt=''/></IconWrapper>
        </Wrapper>
    )
} 

const Wrapper = styled.div`
    background-color: ${COLORS.cardBK};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    border-radius: 8px;
`;

const Values = styled.div`
    display: flex;
    align-items: center;
`;

const Title = styled.h2`
    font-size: .875rem;
    text-transform: uppercase;
    letter-spacing: .7px;
    font-weight: 400;
    margin-bottom: 8px;
`;

const Supply = styled.h3`
    font-size: 2.5rem;
    font-weight: 900;
`;

const Production = styled.p`
    font-size: 0.875rem;
    opacity: .5;
    margin-left: 8px;
`;

const IconWrapper = styled.div``;

const Icon = styled.img``;

export default OverviewCard;