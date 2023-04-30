import React from 'react';

const useCubesTouched = () => {
    const [cubesTouched, setCubesTouched] = React.useState([]);

    const toggleCubeTouched = (cubeIndex) => {
        const nextCubesTouchedSet = new Set(cubesTouched);
        if (nextCubesTouchedSet.has(cubeIndex)) {
            nextCubesTouchedSet.delete(cubeIndex);
        } else {
            nextCubesTouchedSet.add(cubeIndex);
        }
        setCubesTouched([...nextCubesTouchedSet]);
    }

    const clearCubesTouched = () => {
        setCubesTouched([]);
    }

    return [cubesTouched, toggleCubeTouched, clearCubesTouched];
}

export default useCubesTouched;