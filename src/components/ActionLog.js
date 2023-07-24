import React from 'react'
import styled from 'styled-components'

// CONSTANTS
import { COLORS } from '../constants'

// CONTEXT
import { LogContext } from '../providers/log-provider'

// ICONS
import mcIcon from '../icons/mc-icon.svg'
import steelIcon from '../icons/steel-icon.svg'
import titaniumIcon from '../icons/titanium-icon.svg'
import plantsIcon from '../icons/plants-icon.svg'
import energyIcon from '../icons/energy-icon.svg'
import heatIcon from '../icons/heat-icon.svg'
import trIcon from '../icons/tr-icon.svg'

const icons = {
    'credits': mcIcon,
    'steel': steelIcon,
    'titanium': titaniumIcon,
    'plants': plantsIcon,
    'energy': energyIcon,
    'heat': heatIcon,
    'rating': trIcon
}

const ActionLog = () => {
    const { log } = React.useContext(LogContext)

    const now = new Date();
    const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: true }
    const time = now.toLocaleTimeString('en-US', timeOptions);

    return (
        <section>
            <Heading>Log</Heading>
            <SectionSpacer size='16px'/>
            <LogList>
                {log.map((action, i) => <Action key={i} {...action} />)}
                <Action message='Game started' time={time} divider={false}/>
            </LogList>
        </section>
    )
}

const Action = ({ message, amount, icon, time, divider = true }) => {
    return (
        <ActionListItem>
            <ActionLeft>
                <IconWrapper>{icon && <Icon src={icons[icon]} alt={icon}/>}</IconWrapper>
                { amount && <Amount>{`${amount > 0 ? '+' : ''}${amount}`}</Amount>}
                <Message>{message}</Message>
            </ActionLeft>
            <Time>
                { time }
            </Time>
            { divider && <Divider /> }
        </ActionListItem>
    )
}

const Heading = styled.h2``

const LogList = styled.ol`
    height: 200px;
    overflow-y: auto;
    border-radius: 8px;
    border: 1px solid ${COLORS.cardBK};
    margin: 0;
    padding: 0;
`

const ActionListItem = styled.li`
    min-height: 40px;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: space-between;
    padding: 8px;
    padding-right: 16px;
    gap: 16px;
`

const ActionLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`

const Amount = styled.p`
    font-weight: 600;
`

const Message = styled.p`
    font-size: .875rem;
    font-style: italic;
    opacity: 0.8;
`

const Time = styled.p`
    font-size: .75rem;
    opacity: 0.8;
`

const Divider = styled.div`
    position: absolute;
    right: 0;
    left: 36px;
    bottom: 0px;
    height: 1px;
    background-color: ${COLORS.cardBK};
`

const SectionSpacer = styled.div`
    height: ${props => props.size};
`

const IconWrapper = styled.div`
    width: 24px;
    line-height: 1;
`

const Icon = styled.img`
    display: block;
`

export default ActionLog