import React from 'react';
import styled from 'styled-components';

// constants
import { COLORS } from '../constants';

const Cube = ({color, isTouched, handleCubeTouched, index, value, resource}) => {
    const [mouseDown, setMouseDown] = React.useState(false);

    return (
        <CubeWrapper 
            color={color} 
            onClick={() => handleCubeTouched(index)}
            touched={isTouched}
            aria-label={value + ' ' + resource}
            onMouseDown={() => setMouseDown(true)}
            onTouchStart={() => setMouseDown(true)}
            onMouseLeave={() => setMouseDown(false)}
            onTouchEnd={() => setMouseDown(false)}
            onMouseUp={() => setMouseDown(false)}
            mouseDown={mouseDown}
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
    transform: scale(${props => props.mouseDown ? '0.9' : '1'});
    transition: transform ${props => props.mouseDown ? '50ms' : '200ms'};
`

export default Cube;