import React, { createContext, useContext, useState, useEffect } from 'react'
import { bruteForce } from './components/utils';

const Context = createContext();
export const useProvider = () => useContext(Context);

function getInitialState() {
    return {
        speed: 1,
        selected: [-1, -1],
        word: '',
        result: [-1, -1],
        running: false,
        flag: false,
        algo: bruteForce,
    }
}

function updateState(state, data) {
    return { ...state, ...data };
}


export default function Provider({ children }) {
    const [state, setState] = useState(getInitialState());
    const update = (data) => setState(updateState(state, data));
    const run = () => {
        if (!state.running) {
            update({ result: [-1, -1], running: true, flag: !state.flag });
        }
    }

    useEffect(() => {
        state.algo(state.word, update);
    }, [state.flag]);

    return (
        <Context.Provider value={{ state, update, run }}>
            {children}
        </Context.Provider>
    );
}
