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

const SupplyCard = ({
    resource,
    title,
    icon,
    showProduction,
}) => {
    // context
    const { store, adjustAvailable } = React.useContext(StoreContext)

    // state
    const [incrementBy, setIncrementBy] = useState(0)
    const [showForm, setShowForm] = useState(false)

    if (!RESOURCE_NAMES.includes(resource)) {
        throw new Error(`Invalid resource: ${resource}. Supported resources: ${RESOURCE_NAMES.join(', ')}`)
    }

    // store values for specified resource
    const supply = store[resource].available
    const production = store[resource].production

    // this is used to force a component rerender
    const [forceReset, setForceReset] = useState(1)

    // utility function to capitalize the first letter of a word
    const capitalize = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1)
    }

    const submitIncrement = (e) => {
        e.preventDefault()

        // clear state on all cubes so new cubes are not touched
        resetCubes()

        // adjust the availability of resource in the store
        const nextAvailable = store[resource].available + incrementBy
        // don't allow supply to be less than 0
        const amount = nextAvailable < 0 ? supply * -1 : incrementBy
        adjustAvailable(resource, amount)

        // reset increment
        setIncrementBy(0)

        // hide form
        setShowForm(false)
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

        // make sure all cubes are solid
        resetCubes()
    }

    const handleTapCancel = (e) => {
        e.preventDefault()

        // hide and reset form
        setIncrementBy(0)
        setShowForm(false)

        // make sure all cubes are solid
        resetCubes()
    }

    const handleCubeTouch = (step) => {
        // add or subtract from running increment total
        setIncrementBy(incrementBy + step)

        // show the form
        setShowForm(true)
    }
    
    // this function simply increments the forceReset state
    // this resets all cubes, making sure they don't incorrectly hold state
    // we use this function to return all cubes to solid
    const resetCubes = () => {
        setForceReset(forceReset + 1)
     }

    // THESE ARE THE CUBE VALUES
    // bronze -- 1
    // silver -- 5
    // gold -- 10

    // we start by making the entire supply bronze cubes
    let bronze = supply
    let silver = 0
    let gold = 0

    // we then use these break points to convert bronze cubes to silver and gold
    if (supply >= 10){
        silver = 1
        bronze = supply - 5
    }

    if (supply >= 15){
        silver = 2
        bronze = supply - 10
    }

    if (supply > 20){
        silver = 2
        bronze = supply - 10
    }

    if (supply > 25){
        gold = 1
        silver = 2
        bronze = supply - 20
    }

    if (supply > 30){
        gold = Math.floor((supply - 15) / 10)
        silver = 2
        bronze = supply - (gold * 10) - 10
    }

    // build bronze cube array
    let bronzeCubes = []
    for (let i = 0; i < bronze; i++){
        bronzeCubes.push(
            <Cube
                key={`bronze ${i} ${forceReset}`}
                color='bronze'
                step={1}
                action={handleCubeTouch}
            />
        )
    }

    // build silver cube array
    let silverCubes = []
    for (let i = 0; i < silver; i++){
        silverCubes.push(
            <Cube
                key={`silver ${i} ${forceReset}`}
                color='silver'
                step={5}
                action={handleCubeTouch}
            />
        )
    }

    // build gold cube array
    let goldCubes = []
    for (let i = 0; i < gold; i++){
        goldCubes.push(
            <Cube
                key={`gold ${i} ${forceReset}`}
                color='gold'
                step={10}
                action={handleCubeTouch}
            />
        )
    }

    return (
        <Card>
            <Title>{title ? title : capitalize(resource)}</Title>

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
                    {bronzeCubes}
                    {silverCubes}
                    {goldCubes}
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