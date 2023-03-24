

export async function bruteForce(word, time, callbacks) {
    let longest = '';
    let found = [];
    for (let i = 0; i < word.length; i++) {
        for (let j = i + 1; j < word.length; j++) {
            callbacks.setSelected(i, j);
            await delay(time);
            const subString = word.substring(i, j + 1);
            if (isPalindrome(subString) && subString.length > longest.length) {
                longest = subString;
                found = [i, j];
                callbacks.setLonger(found);
                await delay(time);
            }
            callbacks.setSelected(-1, -1);
        }
    }
    callbacks.setLonger(found);;
    callbacks.stopRun();
}


export async function middleOut(word, time, callbacks) {
    let longest = 0, size = word.length, found = [];
    for (let i = 0; i < size; i++) {
        const odd = await expand(i, i);
        const oddSize = odd[1] - odd[0] + 1;
        if (oddSize > longest) {
            longest = oddSize;
            found = [odd[0], odd[1]];
            callbacks.setLonger(found);
            await delay(time);
        }
    }

    for (let i = 0; i < size; i++) {
        const even = await expand(i, i + 1);
        const evenSize = even[1] - even[0] + 1;
        if (evenSize > longest) {
            longest = evenSize;
            found = [even[0], even[1]];
            callbacks.setLonger(found);
            await delay(time);
        }
        callbacks.setSelected(-1, -1);
    }

    callbacks.setLonger(found);
    callbacks.stopRun();

    async function expand(l, r) {
        callbacks.setSelected(l, r);
        await delay(delay);
        if (l < 0 || r >= size) return [-1, -1];
        while (l >= 0 && r < size) {
            callbacks.setSelected(l, r);
            await delay(time);
            if (word[l] !== word[r]) {
                callbacks.setNotFound(l, r);
                await delay(time);
                callbacks.setNotFound(-1, -1);
                await delay(time);
                break;
            }
            l--;
            r++;
        }
        return [l + 1, r - 1];
    }

}

export async function dynamicProgramming(word, time, callbacks) {
    const n = word.length;
    const matrix = Array(n).fill().map(() => Array(n).fill(false));
    let longest = '', found = [];

    for (let i = 0; i < n; i++) {
        matrix[i][i] = true;
        longest = word[i];
        found = [i, i];
        callbacks.setLonger([i, i]);
        await delay(time);
    }

    for (let length = 2; length <= n; length++) {
        for (let i = 0; i < n - length + 1; i++) {
            const j = i + length - 1;
            callbacks.setSelected(i, j);
            await delay(time);

            if (word[i] === word[j] && (length === 2 || matrix[i + 1][j - 1])) {
                matrix[i][j] = true;

                if (length > longest.length) {
                    longest = word.substring(i, j + 1);
                    found = [i, j];
                    callbacks.setLonger([i, j]);
                    await delay(time);
                }
            }
        }
    }

    callbacks.setLonger(found);
    callbacks.stopRun();
    return longest;
}


export function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time))
}

export function isPalindrome(str) {
    str = str.toLowerCase();
    for (let i = 0; i < str.length / 2; i++) {
        if (str[i] !== str[str.length - 1 - i]) {
            return false;
        }
    }
    return true;
}

middleOut.algoName = 'middle out';
bruteForce.algoName = 'brute force';
dynamicProgramming.algoName = 'dynamic programming';