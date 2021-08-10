import {useState, useEffect} from 'react';
import styled from 'styled-components';

import {COLORS} from '../constants';

import Cube from './Cube';

import addIcon from '../icons/add-icon.svg';

const SupplyCard = ({
    resource,
    supply,
    increment,
    icon,
}) => {
    const [incrementBy, setIncrementBy] = useState(0);
    const [showForm, setShowForm] = useState(false);
    const [cubes, setCubes] = useState([]);

    const submitIncrement = (e) => {
        e.preventDefault();
        increment(supply + incrementBy < 0 ? supply * -1 : incrementBy);
        setIncrementBy(0);
        setShowForm(false);
    }

    const handleTapAdd = (e) => {
        e.preventDefault();
        setIncrementBy(1);
        setShowForm(true);
    }

    const handleTapCancel = (e) => {
        e.preventDefault();

        let newCubes = [...cubes];
        newCubes.forEach(cube => {
            cube.isTouched = false;
        })

        setCubes(newCubes);
        setIncrementBy(0);
        setShowForm(false);
    }

    const handleCubeTouch = (i, step) => {
        
        let touchedCube = cubes[i];
        let newCubes = [...cubes];

        touchedCube.isTouched = !touchedCube.isTouched;
        newCubes.splice(i, 1, touchedCube);
        
        setIncrementBy(incrementBy - step);
        setCubes(newCubes);
        setShowForm(true);
    }

    useEffect(() => {
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
        let buildCubes = [];
        for (let i = 0; i < bronze; i++){
            buildCubes.push({step: 1, color: 'bronze', isTouched: false});
        };

        for (let i = 0; i < silver; i++){
            buildCubes.push({step: 5, color: 'silver', isTouched: false});
        };

        for (let i = 0; i < gold; i++){
            buildCubes.push({step: 10, color: 'gold', isTouched: false});
        };

        setCubes(buildCubes);
    }, [supply])

    return (
        <Wrapper>
            <Header>
                <Icon src={icon} alt=''/>
                <Supply>{supply}</Supply>
                {showForm &&
                    <AfterIncrement>{supply + incrementBy}</AfterIncrement>
                }
                <HeaderSpace />
                <AddButton
                    onClick={(e) => handleTapAdd(e)}
                >
                    <AddIcon src={addIcon} alt='Add'/>
                </AddButton>
            </Header>
            {supply > 0 && 
                <CubeWrapper>
                    {cubes.map((cube, i) => 
                        <Cube 
                            id={i}
                            key={i}
                            step={cube.step}
                            color={cube.color}
                            touch={handleCubeTouch}
                            isTouched={cube.isTouched}
                        />
                    )}
                </CubeWrapper>
            }
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
        </Wrapper>
    )
}

const Wrapper = styled.div`
    background-color: ${COLORS.cardBK};
    border-radius: 8px;
    padding: 16px;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
`;

const HeaderSpace = styled.div`
    flex-grow: 1;
;`

const Supply = styled.h3`
    font-size: 1.75rem;
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

const AddButton = styled.button`
    background-color: transparent;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
`;

const AddIcon = styled.img``;

const IncrementForm = styled.form`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 4px;
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
    background-color: transparent;
    border: none;
    padding: 4px 16px;
    text-transform: uppercase;
    letter-spacing: .7px;
`;

const SubmitButton = styled(IncrementButton)`
    color: ${COLORS.mainBlue};
`;

const CancelButton = styled(IncrementButton)`
    color: ${COLORS.error};
`;

const CubeWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;

    gap: 8px;
    margin-top: 16px;
`;

export default SupplyCard;