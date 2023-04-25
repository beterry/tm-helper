import React from 'react';

// CONTEXT
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

    const adjustRating = (amount) => {
        setRating(rating + amount);

        // TODO: log the change
    }

    const adjustAvailable = (resource, amount) => {
        // create a shallow copy of the current store
        let nextStore = Object.assign({}, store);

        // get the current availability
        const currentAvailable = nextStore[resource].available;

        // adjust the resource availability in the store
        nextStore[resource].available = currentAvailable + amount;

        setStore(nextStore);

        // TODO: log the change
    }

    const adjustProduction = (resource, amount) => {
        // create a shallow copy of the current store
        let nextStore = Object.assign({}, store);

        // get the current product
        const currentProduction = nextStore[resource].production;

        // adjust the resource availability in the store
        nextStore[resource].production = currentProduction + amount;

        setStore(nextStore);

        // TODO: log the change
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

        // TODO: log the change
    }

    return (
        <StoreContext.Provider value={{ rating, store, adjustRating, adjustAvailable, adjustProduction, produce }}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreProvider;