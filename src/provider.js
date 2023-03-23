import React, { createContext, useContext, useReducer } from 'react'
import { bruteForce, middleOut } from './utils';
import { delay, isPalindrome } from './utils';

const Context = createContext();
export const useProvider = () => useContext(Context);

function getInitialAppState() {
    return {
        delay: 300,
        word: '',
        running: false,
        status: '',
        algos: [bruteForce, middleOut,],
        selectedAlgo: bruteForce,
    }
}

function getInitialColorState() {
    return {
        selected: [-1, -1],
        found: [-1, -1],
        longest: [-1, -1]
    }
}

export default function Provider({ children }) {
    const [appState, updateApp] = useReducer((state, data) => {
        return { ...state, ...data };
    }, getInitialAppState());

    const [colorState, updateColor] = useReducer((state, data) => {
        return { ...state, ...data }
    }, getInitialColorState());

    const setStatus = (status) => {
        updateApp({ status: status });
    }

    const setFound = (found) => {
        updateColor({ found: [found[0], found[1]], selected: [-1, -1] });
    }

    const setSelected = (i, j) => {
        updateColor({ selected: [i, j], found: [-1, -1] });
    }

    const setLongest = (found) => {
        updateColor({ longest: found });
    }

    const stopRun = () => {
        updateApp({ running: false });
    }

    const setDelay = (delay) => {
        updateApp({ delay: delay });
    }

    const callbacks = {
        setStatus,
        setFound,
        setSelected,
        setLongest,
        stopRun
    };

    const run = () => {
        if (!appState.running) {
            updateApp({ running: true, found: [-1, -1] });
            appState.selectedAlgo(appState.word, appState.delay, callbacks);
        }
    }

    return (
        <Context.Provider value={{ ...appState, ...colorState, updateApp, updateColor, run, setDelay }}>
            {children}
        </Context.Provider>
    );
}
