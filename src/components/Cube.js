import styled from 'styled-components';
import { COLORS } from '../constants';

const Cube = ({color, step, touch, isTouched, id}) => {
    const handleTouch = (e) => {
        e.preventDefault();
        touch(id, isTouched ? -step : step);
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
`;

export default Cube;