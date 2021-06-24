import styled from 'styled-components';

const CubesComponent = ({increment, current}) => {
    return (
        <CubeContainer>
            <GoldCube onClick={() => increment(-10)} disabled={current < 10}>-10</GoldCube>
            <SilverCube onClick={() => increment(-5)} disabled={current < 5}>-5</SilverCube>
            <BronzeCube onClick={() => increment(-1)} disabled={current < 1}>-1</BronzeCube>
            <BronzeCube onClick={() => increment(1)}>+1</BronzeCube>
            <SilverCube onClick={() => increment(5)}>+5</SilverCube>
            <GoldCube onClick={() => increment(10)}>+10</GoldCube>
        </CubeContainer>
    )
}

const CubeContainer = styled.div`
    margin-top: 16px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`

const Cube = styled.button`
    height: 40px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    font-weight: 600;

    &:disabled{
        opacity: .3;
    }
`

const GoldCube = styled(Cube)`
    background: linear-gradient(#FFEEAD, #E2B300);
    border: 1px solid #9F7E00;
    color: #9F7E00;
`
const SilverCube = styled(Cube)`
    background: linear-gradient(#CCCCCC, #808080);
    border: 1px solid #707070;
    color: #707070;
`

const BronzeCube = styled(Cube)`
    background: linear-gradient(#E9A300, #B16000);
    border: 1px solid #693F00;
    color: #693F00;
`

export default CubesComponent;