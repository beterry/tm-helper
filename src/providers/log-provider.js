import React from 'react'

export const LogContext = React.createContext();

const LogProvider = ({ children }) => {
    const [log, setLog] = React.useState([])

    // add an action to the log state
    const addToLog = (message, amount, icon) => {
        const now = new Date();
        const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: true }
        const time = now.toLocaleTimeString('en-US', timeOptions);

        // create a new action to add to the log
        const newAction = { message, time, amount, icon };

        // insert new action into the front of current state
        setLog(prevLog => [newAction, ...prevLog]);
    }

    return (
        <LogContext.Provider value={{log, addToLog}}>
            {children}
        </LogContext.Provider>
    )
}

export default LogProvider