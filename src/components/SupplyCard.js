import React, { useState } from 'react'
import styled from 'styled-components'

// CONSTANTS
import { COLORS } from '../constants'
import { RESOURCE_NAMES } from '../hooks/useStore'

// COMPONENTS
import Cube from './Cube'

// IMAGES
import addIcon from '../icons/add-icon.svg'

// HOOKS
import useCubesTouched from '../hooks/useCubesTouched'

// UTILITIES
import { getCubes } from '../utilities/cubes'

const SupplyCard = ({
    resource,
    title,
    supply,
    icon,
    adjustAvailable,
}) => {
    // state
    const [incrementBy, setIncrementBy] = useState(0);
    const [showForm, setShowForm] = useState(false);
    const [cubesTouched, toggleCubeTouched, clearCubesTouched] = useCubesTouched();
    const addButtonRef = React.useRef(null);
    const incrementInputRef = React.useRef(null);

    if (!RESOURCE_NAMES.includes(resource)) {
        throw new Error(`Invalid resource: ${resource}. Supported resources: ${RESOURCE_NAMES.join(', ')}`)
    }

    // GET DATA FOR CUBES TO RENDER
    // memoize this value so we only recalculate if the supply or cubesTouched values change
    const cubes = React.useMemo(() => {
        const cubes = getCubes(supply);
        // loop through the cubes and compare it to the cubes that are touched via state
        cubes.forEach((cube, index) => {
            if (cubesTouched.includes(index)) {
                cube.isTouched = true;
            }
        })
        return cubes;
    }, [supply, cubesTouched])

    // this effect handles focus when we show or hide the increment form
    React.useEffect(() => {
        if (showForm) {
            focusIncrementInput();
        } else {
            focusAddButton();
        }
    }, [showForm])

    const submitIncrement = (e) => {
        e.preventDefault()

        // adjust the availability of resource in the store
        const nextAvailable = supply + incrementBy
        // don't allow supply to be less than 0
        const amount = nextAvailable < 0 ? supply * -1 : incrementBy
        adjustAvailable(resource, amount)

        // reset increment
        setIncrementBy(0)

        // hide form
        setShowForm(false)

        // set all cubes to solid
        clearCubesTouched();
    }

    const handleTapAdd = (e) => {
        e.preventDefault()

        if (incrementBy >= 0){
            // if we are in the process of adding
            setIncrementBy(incrementBy + 1)
        } else {
            // if we are transitioning from subtracting to adding
            setIncrementBy(1)
        }

        // show the form
        setShowForm(true)

        if (cubesTouched.length > 0) {
            // set all cubes to solid
            clearCubesTouched();
        }
    }

    const handleTapCancel = (e) => {
        e.preventDefault()

        // hide and reset form
        setIncrementBy(0)
        setShowForm(false)

        // set all cubes to solid
        clearCubesTouched();
    }

    const handleCubeTouched = (cubeIndex) => {
        const touchedCube = cubes[cubeIndex];
        const cubeValue = touchedCube.value;
        const step = touchedCube.isTouched ? cubeValue : -cubeValue;

        toggleCubeTouched(cubeIndex);

        // a cube was touched to spend, but the incrementBy was positive
        // transitioning from adding to spending
        // reset the form
        if (incrementBy > 0 && step < 0) {
            setIncrementBy(step);
            return;
        }

        // add or subtract from running increment total
        setIncrementBy(incrementBy + step);

        // show the form
        setShowForm(true);
    }

    // when the form disappears, focus the add button
    // prevents weird focus behavior for keyboard users
    const focusAddButton = () => {
        addButtonRef.current.focus();
    }

    // when the form appears, focus the form's input
    // this creates a better UX for keyboard users
    const focusIncrementInput = () => {
        incrementInputRef.current.focus();
    }

    return (
        <Card>
            {/* ADD BUTTON - TOP RIGHT */}
            <AddButton
                onClick={(e) => handleTapAdd(e)}
                aria-label={`Add ${resource}`}
                ref={addButtonRef}
            >
                <AddIcon src={addIcon} alt='Add'/>
            </AddButton>

            <Title>{title ? title : resource}</Title>

            {/* Icon and count */}
            <Header>
                <Icon src={icon} alt={resource}/>
                <Supply>{supply}</Supply>
                {showForm &&
                    <AfterIncrement>{supply + incrementBy}</AfterIncrement>
                }
            </Header>

            {/* CUBES */}
            {supply > 0 && 
                <CubeWrapper>
                    {cubes.map((cube, i) => 
                        <Cube
                            handleCubeTouched={handleCubeTouched} 
                            index={i} 
                            resource={resource}
                            {...cube} 
                            key={i}/>
                    )}
                </CubeWrapper>
            }

            <Spacer />


            {/* FORM */}
            {showForm &&
                <IncrementForm>
                    <IncrementInput
                        type='number'
                        value={incrementBy}
                        onChange={(e) => setIncrementBy(parseInt(e.target.value))}
                        ref={incrementInputRef}
                    />
                    <SubmitButton
                        onClick={(e) => submitIncrement(e)}
                    >
                        {incrementBy >= 0 ? 'Add' : 'Spend'}
                    </SubmitButton>
                    <CancelButton
                        onClick={(e) => handleTapCancel(e)}
                    >
                        Cancel
                    </CancelButton>
                </IncrementForm>
            }
        </Card>
    )
}

const Card = styled.article`
    background-color: ${COLORS.cardBK};
    border-radius: 8px;
    padding: 16px;
    position: relative;
    display: flex;
    flex-direction: column;
    
    @media screen and (min-width: 550px) {
        min-height: 200px;
        
    }
`

const Title = styled.h2`
    font-size: .875rem;
    text-transform: uppercase;
    letter-spacing: .7px;
    font-weight: 400;
    margin-bottom: 8px;
`

const Header = styled.div`
    display: flex;
    align-items: center;
`

const Supply = styled.h3`
    font-size: 2rem;
    font-weight: 700;
    margin-right: 8px;
`

const AfterIncrement = styled.p`
    font-size: 1rem;
    opacity: .5;

`

const Icon = styled.img`
    margin-right: 8px;
`

const IconButton = styled.button`
    background-color: transparent;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
`

const AddButton = styled(IconButton)`
    position: absolute;
    top: 16px;
    right: 16px;
    width: 40px;
    height: 40px;
`

const AddIcon = styled.img``;

const IncrementForm = styled.form`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 16px;
    align-content: end;
    margin-top: 16px;
`

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
`

const IncrementButton = styled.button`
    border-radius: 4px;
    border: none;
    padding: 4px 8px;
    text-transform: uppercase;
    letter-spacing: .7px;
`

const SubmitButton = styled(IncrementButton)`
    background-color: ${COLORS.mainBlue};
    color: white;
`

const CancelButton = styled(IncrementButton)`
    color: ${COLORS.error};
    background-color: transparent;
`

const CubeWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, 40px);
    gap: 8px;
    margin-top: 16px;
`

const Spacer = styled.div`
    flex-grow: 1;
`

export default SupplyCard;