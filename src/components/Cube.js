import { useState } from 'react'
import styled from 'styled-components'

// constants
import { COLORS } from '../constants'

const Cube = ({color, step, action}) => {
    const [isTouched, setIsTouched] = useState(false)

    const handleTouch = (e) => {
        e.preventDefault()

        // activate action
        action(isTouched ? step : -step)

        // toggle opacity
        setIsTouched(!isTouched)
    }

    return (
        <CubeWrapper 
            color={color} 
            onClick={(e) => handleTouch(e)}
            touched={isTouched}
        />
    )
}

const CubeWrapper = styled.button`
    width: 40px;
    height: 40px;
    background-color: ${props => COLORS[props.color]};
    border-radius: 4px;
    border: none;
    opacity: ${props => props.touched ? .3 : 1};
`

export default Cube