import React, { createContext, useContext, useReducer } from 'react'
import { twoPointers, dynamicProgramming, middleOut } from './algorithms';

const Context = createContext();
export const useProvider = () => useContext(Context);

function getInitialAppState() {
    return {
        delay: 450,
        word: '',
        running: false,
        algos: [twoPointers, middleOut, dynamicProgramming],
        selectedAlgo: bruteForce,
    }
}

function getInitialColorState() {
    return {
        selected: [-1, -1],
        found: [-1, -1],
        notFound: [-1, -1],
        longest: [-1, -1],
    }
}

export default function Provider({ children }) {
    const [appState, updateApp] = useReducer((state, data) => {
        return { ...state, ...data };
    }, getInitialAppState());

    const [colorState, updateColor] = useReducer((state, data) => {
        return { ...state, ...data }
    }, getInitialColorState());

    const setNotFound = (i, j) => {
        updateColor({ notFound: [i, j] });
    }

    const setSelected = (i, j) => {
        updateColor({ selected: [i, j], found: [-1, -1] });
    }

    const stopRun = () => {
        updateApp({ running: false });
    }

    const setDelay = (delay) => {
        updateApp({ delay: delay });
    }

    const setLonger = (found) => {
        updateColor({ found: found, longest: found, selected: [-1, -1] });
    }

    const callbacks = {
        setSelected,
        setLonger,
        setNotFound,
        stopRun
    };

    const run = () => {
        if (appState.word.length === 0) return;
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
