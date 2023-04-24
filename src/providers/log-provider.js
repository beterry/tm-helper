import React from 'react'

export const LogContext = React.createContext();

const LogProvider = ({ children }) => {
    const [log, setLog] = React.useState([])

    // add an action to the log state
    const addToLog = (action) => {
        // insert new action into the front of current state
        setLog(prevLog => [action, ...prevLog])
    }

    return (
        <LogContext.Provider value={{log, addToLog}}>
            {children}
        </LogContext.Provider>
    )
}

export default LogProvider