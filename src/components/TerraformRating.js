import styled from 'styled-components';

const TerraformRating = ({tr}) => {
    return (
        <Wrapper>
            <Title>Terraform Rating</Title>
            <Rating>{tr}</Rating>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Title = styled.h1``;

const Rating = styled.h2``;

export default TerraformRating;