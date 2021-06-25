import styled from 'styled-components';

const ResourceOverview = ({
    amount,
    icon,
    color,
    textColor = 'black',
    anchor,
}) => {
    return (
        <Wrapper color={color} href={`#${anchor}`}>
            <Icon src={icon} />
            <Amount textColor={textColor}>{amount}</Amount>
        </Wrapper>
    )
}

const Wrapper = styled.a`
    padding: 8px;
    border-radius: 4px;
    text-align: center;
    background-color: ${props => props.color};
    box-shadow: 0px 0px 10px rgba(0,0,0,.35);
    text-decoration: none;
`

const Amount = styled.h4`
    font-size: 2rem;
    margin: 0;
    color: ${props => props.textColor};
    font-family: 'Share Tech', sans-serif;
`

const Icon = styled.img`
    width: 30px;
`

export default ResourceOverview;