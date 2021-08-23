import {useState} from 'react';
import styled from 'styled-components';

import {COLORS} from '../constants';

import Cube from './Cube';

import addIcon from '../icons/add-icon.svg';

const SupplyCard = ({
    title,
    supply,
    increment,
    icon,
    showProduction,
    production,
}) => {
    const [incrementBy, setIncrementBy] = useState(0);
    const [showForm, setShowForm] = useState(false);
    const [forceReset, setForceReset] = useState(1);

    const submitIncrement = (e) => {
        e.preventDefault();
        resetCubes();
        increment(supply + incrementBy < 0 ? supply * -1 : incrementBy);
        setIncrementBy(0);
        setShowForm(false);
    }

    const handleTapAdd = (e) => {
        e.preventDefault();

        if (incrementBy >= 0){
            //if we are in the process of adding
            setIncrementBy(incrementBy + 1);
        }else {
            //if we are transitioning from subtracting to adding
            setIncrementBy(1);
        }

        setShowForm(true);
        resetCubes();
    }

    const handleTapCancel = (e) => {
        e.preventDefault();
        setIncrementBy(0);
        setShowForm(false);
        resetCubes();
    }

    const handleCubeTouch = (step) => {
        setIncrementBy(incrementBy + step);
        setShowForm(true);
    }
    
    const resetCubes = () => {
        setForceReset(forceReset + 1);
     }

    let bronze = supply;
    let silver = 0;
    let gold = 0;

    if (supply >= 10){
        silver = 1;
        bronze = supply - 5;
    }

    if (supply >= 15){
        silver = 2;
        bronze = supply - 10;
    }

    if (supply > 20){
        silver = 2;
        bronze = supply - 10;
    }

    if (supply > 25){
        gold = 1;
        silver = 2;
        bronze = supply - 20;
    }

    if (supply > 30){
        gold = Math.floor((supply - 15) / 10)
        silver = 2;
        bronze = supply - (gold * 10) - 10;
    }

    //build cubes
    let bronzeCubes = [];
    for (let i = 0; i < bronze; i++){
        bronzeCubes.push(
            <Cube
                key={`bronze ${i} ${forceReset}`}
                color='bronze'
                step={1}
                action={handleCubeTouch}
            />
        );
    };

    let silverCubes = [];
    for (let i = 0; i < silver; i++){
        silverCubes.push(
            <Cube
                key={`silver ${i} ${forceReset}`}
                color='silver'
                step={5}
                action={handleCubeTouch}
            />
        );
    };

    let goldCubes = [];
    for (let i = 0; i < gold; i++){
        goldCubes.push(
            <Cube
                key={`gold ${i} ${forceReset}`}
                color='gold'
                step={10}
                action={handleCubeTouch}
            />
        );
    };

    return (
        <Wrapper>
            <Title>{title}</Title>
            <Header>
                <Icon src={icon} alt=''/>
                <Supply>{supply}</Supply>
                {(showForm && !showProduction) &&
                    <AfterIncrement>{supply + incrementBy}</AfterIncrement>
                }
                {(showProduction && production !== 0) &&
                    <AfterIncrement>{production > 0 && "+"}{production}</AfterIncrement>
                }
            </Header>
            {supply > 0 && 
                <CubeWrapper>
                    {bronzeCubes}
                    {silverCubes}
                    {goldCubes}
                </CubeWrapper>
            }
            <FlexFill />
            {showForm &&
                <IncrementForm>
                    <IncrementInput
                        type='number'
                        value={incrementBy}
                        onChange={(e) => setIncrementBy(parseInt(e.target.value))}
                    />
                    <SubmitButton
                        onClick={(e) => submitIncrement(e)}
                    >
                        {incrementBy >=0 ? 'Add' : 'Spend'}
                    </SubmitButton>
                    <CancelButton
                        onClick={(e) => handleTapCancel(e)}
                    >
                        Cancel
                    </CancelButton>
                </IncrementForm>
            }
            <AddButton
                onClick={(e) => handleTapAdd(e)}
            >
                <AddIcon src={addIcon} alt='Add'/>
            </AddButton>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    background-color: ${COLORS.cardBK};
    border-radius: 8px;
    padding: 16px;
    position: relative;
    min-height: 200px;
    display: flex;
    flex-direction: column;
`;

const Title = styled.h2`
    font-size: .875rem;
    text-transform: uppercase;
    letter-spacing: .7px;
    font-weight: 400;
    margin-bottom: 8px;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
`;

const Supply = styled.h3`
    font-size: 2rem;
    font-weight: 700;
    margin-right: 8px;
`;

const AfterIncrement = styled.p`
    font-size: 1rem;
    opacity: .5;

`;

const Icon = styled.img`
    margin-right: 8px;
`;

const IconButton = styled.button`
    background-color: transparent;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
`;

const AddButton = styled(IconButton)`
    position: absolute;
    top: 16px;
    right: 16px;
    width: 40px;
    height: 40px;
`;

const AddIcon = styled.img``;

const IncrementForm = styled.form`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 16px;
    align-content: end;
    margin-top: 16px;
`;

const IncrementInput = styled.input`
    display: block;
    width: 100%;
    background-color: transparent;
    padding: 4px 8px;
    border: none;
    border-bottom: 2px solid ${COLORS.mainBlue};
    color: white;
    flex: 1;
    font-size: 1.25rem;
`;

const IncrementButton = styled.button`
    border-radius: 4px;
    border: none;
    padding: 4px 8px;
    text-transform: uppercase;
    letter-spacing: .7px;
`;

const SubmitButton = styled(IncrementButton)`
    background-color: ${COLORS.mainBlue};
    color: white;
`;

const CancelButton = styled(IncrementButton)`
    color: ${COLORS.error};
    background-color: transparent;
`;

const CubeWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, 40px);
    gap: 8px;
    margin-top: 16px;
`;

const FlexFill = styled.div`
    flex-grow: 1;
`;

export default SupplyCard;