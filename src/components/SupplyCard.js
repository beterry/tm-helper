import React, { useState } from 'react'
import styled from 'styled-components'

// CONSTANTS
import { COLORS } from '../constants'
import { RESOURCE_NAMES } from '../providers/store-provider'

// COMPONENTS
import Cube from './Cube'

// IMAGES
import addIcon from '../icons/add-icon.svg'

// CONTEXT
import { StoreContext } from '../providers/store-provider'

// UTILITIES
import { getCubes } from '../utilities/cubes'

const SupplyCard = ({
    resource,
    title,
    icon,
    showProduction,
}) => {
    // context
    const { rating, store, adjustAvailable } = React.useContext(StoreContext)

    // state
    const [incrementBy, setIncrementBy] = useState(0);
    const [showForm, setShowForm] = useState(false);
    const [cubesTouched, setCubesTouched] = useState([]);

    if (!RESOURCE_NAMES.includes(resource)) {
        throw new Error(`Invalid resource: ${resource}. Supported resources: ${RESOURCE_NAMES.join(', ')}`)
    }

    // store values for specified resource
    const supply = store[resource].available
    let production = store[resource].production
    // special production cases
    if (resource === 'credits') { 
        production = store[resource].production + rating
    }

    // get data for cubes to display
    const cubes = getCubes(supply);
    // loop through the cubes and compare it to the cubes that are touched via state
    cubes.forEach((cube, index) => {
        if (cubesTouched.includes(index)) {
            cube.isTouched = true;
        }
    })

    const submitIncrement = (e) => {
        e.preventDefault()

        // TODO: clear state on all cubes so new cubes are not touched

        // adjust the availability of resource in the store
        const nextAvailable = store[resource].available + incrementBy
        // don't allow supply to be less than 0
        const amount = nextAvailable < 0 ? supply * -1 : incrementBy
        adjustAvailable(resource, amount)

        // reset increment
        setIncrementBy(0)

        // hide form
        setShowForm(false)

        setCubesToSolid();
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

        setCubesToSolid();
    }

    const handleTapCancel = (e) => {
        e.preventDefault()

        // hide and reset form
        setIncrementBy(0)
        setShowForm(false)

        setCubesToSolid();
    }

    const handleCubeTouched = (cubeIndex) => {
        const step = cubes[cubeIndex].isTouched ? cubes[cubeIndex].value : -cubes[cubeIndex].value;

        // set whether the cube is touched
        // TODO: seperate this logic into a custom hook?
        const nextCubesTouchedSet = new Set(cubesTouched);
        if (nextCubesTouchedSet.has(cubeIndex)) {
            nextCubesTouchedSet.delete(cubeIndex);
        } else {
            nextCubesTouchedSet.add(cubeIndex);
        }
        setCubesTouched([...nextCubesTouchedSet]);

        // a cube was touched to spend, but the incrementBy was positive
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

    const setCubesToSolid = () => {
        setCubesTouched([]);
    }

    return (
        <Card>
            <Title>{title ? title : resource}</Title>

            {/* Icon and count */}
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

            {/* CUBES */}
            {supply > 0 && 
                <CubeWrapper>
                    {cubes.map((cube, i) => <Cube handleCubeTouched={handleCubeTouched} index={i} {...cube} key={i}/>)}
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

            {/* ADD BUTTON - TOP RIGHT */}
            <AddButton
                onClick={(e) => handleTapAdd(e)}
            >
                <AddIcon src={addIcon} alt='Add'/>
            </AddButton>
        </Card>
    )
}

const Card = styled.div`
    background-color: ${COLORS.cardBK};
    border-radius: 8px;
    padding: 16px;
    position: relative;
    min-height: 200px;
    display: flex;
    flex-direction: column;
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

export default SupplyCard