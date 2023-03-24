import React from 'react'
import { useProvider } from '../provider';

export function Answer() {
    const { word, longest } = useProvider();

    const current = word ? word.substring(longest[0], longest[1] + 1) : '';
    return (
        <div className='result' style={{
            display: 'flex',
            height: '60px',
            width: '340px',
            backgroundColor: 'dimgrey',
            position: 'fixed',
            top: 460,
            left: 480,
            justifyContent: 'center',
            borderRadius: 10,
            fontSize: '1.5em',
        }}>
            <div
                style={{
                    backgroundColor: 'red',
                    width: '30%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                }}
            >
                Result
            </div>
            <div
                style={{
                    flex: 1,
                    height: '100%',
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {current && current}
            </div>
        </div>
    );
}