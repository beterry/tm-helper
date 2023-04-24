import React from 'react'
import styled from 'styled-components'

// CONTEXT
import { LogContext } from '../providers/log-provider'

const ActionLog = () => {
    const { log } = React.useContext(LogContext)

    return (
        <div>
            <Heading>Log</Heading>
            <SectionSpacer size='16px'/>
            <LogWrapper>
                {log.map((action, i) => <Action key={i}>{action}</Action>)}
            </LogWrapper>
        </div>
    )
}

const Heading = styled.h2``

const LogWrapper = styled.div`
    height: 200px;
    overflow-y: auto;
`

const Action = styled.p`
    margin-top: 8px;
    opacity: .5;

    &:first-of-type{
        margin-top: 0;
    }
`

const SectionSpacer = styled.div`
    height: ${props => props.size};
`

export default ActionLog