import React from 'react'

// CONTEXT
export const StoreContext = React.createContext()

export const RESOURCE_NAMES = ['credits', 'steel', 'titanium', 'plants', 'energy', 'heat'];

const StoreProvider = ({ children }) => {
    const [store, setStore] = React.useState({
        credits: {
            available: 0,
            production: 0
        },
        steel: {
            available: 0,
            production: 0
        },
        titanium: {
            available: 0,
            production: 0
        },
        plants: {
            available: 0,
            production: 0
        },
        energy: {
            available: 0,
            production: 0
        },
        heat: {
            available: 0,
            production: 0
        },
    })

    const adjustAvailable = (resource, amount) => {
        // create a shallow copy of the current store
        let nextStore = Object.assign({}, store);

        // get the current availability
        const currentAvailable = nextStore[resource].available

        // adjust the resource availability in the store
        nextStore[resource].available = currentAvailable + amount

        setStore(nextStore)

        // TODO: log the change
    }

    const adjustProduction = (resource, amount) => {
        // create a shallow copy of the current store
        let nextStore = Object.assign({}, store);

        // get the current product
        const currentProduction = nextStore[resource].production

        // adjust the resource availability in the store
        nextStore[resource].production = currentProduction + amount

        setStore(nextStore)

        // TODO: log the change
    }

    return (
        <StoreContext.Provider value={{ store, adjustAvailable, adjustProduction }}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreProvider