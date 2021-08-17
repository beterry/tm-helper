import styled from 'styled-components';

//import icons
import addIcon from '../icons/add_circle.svg';
import minusIcon from '../icons/remove_circle.svg';

const TerraformRating = ({tr, increment}) => {
    return (
        <Wrapper>
            <Title>Terraform Rating</Title>
            <RatingWrapper>
                <IncrementButton
                    onClick={() => increment(-1)}
                >
                    <Icon src={minusIcon} alt=""/>
                </IncrementButton>

                <Rating>{tr}</Rating>

                <IncrementButton
                    onClick={() => increment(1)}
                >
                    <Icon src={addIcon} alt=""/>
                </IncrementButton>
            </RatingWrapper>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    @media screen and (min-width: 600px){
        align-items: flex-start;
    }
`;

const Title = styled.h1`
    margin-bottom: 8px;
`;

const Rating = styled.h2`
    font-size: 4rem;
    margin: 0 16px;
`;

const RatingWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const IncrementButton = styled.button`
    background-color: transparent;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;`;

const Icon = styled.img``;

export default TerraformRating;