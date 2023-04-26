import React from 'react';

// CONTEXT
import { LogContext } from './log-provider';
export const StoreContext = React.createContext();

export const RESOURCE_NAMES = ['credits', 'steel', 'titanium', 'plants', 'energy', 'heat'];

const StoreProvider = ({ children }) => {
    const [rating, setRating] = React.useState(20);
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
    });

    // context for logging actions
    const { addToLog } = React.useContext(LogContext);

    const adjustRating = (amount) => {
        setRating(rating + amount);

        // log the change
        const logMessage = `Terraforming rating ${amount > 0 ? 'increased' : 'decreased'}`;
        addToLog(logMessage, amount, 'rating');
    }

    const adjustAvailable = (resource, amount) => {
        if (!amount) { return; }

        // create a shallow copy of the current store
        let nextStore = Object.assign({}, store);

        // get the current availability
        const currentAvailable = nextStore[resource].available;

        // adjust the resource availability in the store
        nextStore[resource].available = currentAvailable + amount;

        setStore(nextStore);

        // log the change
        const logMessage = `${resource} supply ${amount > 0 ? 'increased' : 'decreased'}`;
        addToLog(logMessage, amount, resource);
    }

    const adjustProduction = (resource, nextProduction) => {
        // create a shallow copy of the current store
        let nextStore = Object.assign({}, store);

        // get the current product
        const currentProduction = nextStore[resource].production;

        // adjust the resource availability in the store
        nextStore[resource].production = nextProduction;

        setStore(nextStore);

        // log the change
        const productionDelta = nextProduction - currentProduction;
        const logMessage = `${resource} production ${productionDelta > 0 ? 'increased' : 'decreased'}`;
        addToLog(logMessage, productionDelta, resource);
    }

    const produce = () => {
        // create a shallow copy of the current store
        let nextStore = Object.assign({}, store);
        let available, production;

        // credits
        ({ available, production } = store.credits);
        nextStore.credits.available = (available + production + rating);

        // steel
        ({ available, production } = store.steel);
        nextStore.steel.available = (available + production);

        // titanium
        ({ available, production } = store.titanium);
        nextStore.titanium.available = (available + production);

        // plants
        ({ available, production } = store.plants);
        nextStore.plants.available = (available + production);

        // heat
        // heat must be produced before energy because leftover energy is added to available heat
        ({ available, production } = store.heat);
        const energyAvailable = store.energy.available;
        nextStore.heat.available = (available + production + energyAvailable);

        // energy
        // leftover energy is converted to heat, do not add energyAvailable here
        ({ production } = store.energy);
        nextStore.energy.available = production;

        setStore(nextStore);

        // log the change;
        addToLog('Production phase');
    }

    return (
        <StoreContext.Provider value={{ rating, store, adjustRating, adjustAvailable, adjustProduction, produce }}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreProvider;