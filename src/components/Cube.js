import styled from 'styled-components'

// constants
import { COLORS } from '../constants'

const Cube = ({color, isTouched, handleCubeTouched, index, value, resource}) => {
    return (
        <CubeWrapper 
            color={color} 
            onClick={() => handleCubeTouched(index)}
            touched={isTouched}
            aria-label={value + ' ' + resource}
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

export default Cube;