

export async function bruteForce(word, time, callbacks) {
    let longest = '';
    let found = [];
    for (let i = 0; i < word.length; i++) {
        for (let j = i + 1; j < word.length; j++) {
            callbacks.setStatus('');
            callbacks.setSelected(i, j);
            await delay(time);
            const subString = word.substring(i, j + 1);
            if (isPalindrome(subString) && subString.length > longest.length) {
                longest = subString;
                found = [i, j];
                foundLarger(callbacks, found)
                await delay(time);
            }
        }
    }
    callbacks.setFound(found);
    callbacks.setLongest(found);
    callbacks.setStatus('finished');
    callbacks.stopRun();
}


export async function middleOut(word, time, callbacks) {
    let longest = 0, size = word.length, found = [];
    for (let i = 0; i < size; i++) {
        const odd = await expand(i, i);
        const even = await expand(i, i + 1);
        const oddSize = odd[1] - odd[0] + 1;
        const evenSize = even[1] - even[0] + 1;
        if (oddSize > longest) {
            longest = oddSize;
            found = [odd[0], odd[1]];
            foundLarger(callbacks, found);
            await delay(time);
        }
        if (evenSize > longest) {
            longest = evenSize;
            found = [even[0], even[1]];
            foundLarger(callbacks, found);
            await delay(time);
        }
    }

    callbacks.setFound(found);
    callbacks.setLongest(found);
    callbacks.setStatus('finished');
    callbacks.stopRun();

    async function expand(l, r) {
        if (l === r) callbacks.setStatus('checking for odd length');
        else callbacks.setStatus('checking for even length');
        callbacks.setSelected(l, r);
        await delay(delay);
        if (l < 0 || r >= size) return '';
        while (l >= 0 && r < size && word[l] === word[r]) {
            callbacks.setSelected(l, r);
            l--;
            r++;
            await delay(time);
        }
        return [l + 1, r - 1];
    }

}

function foundLarger(callbacks, found) {
    callbacks.setFound(found);
    callbacks.setLongest(found);
    callbacks.setStatus('found a lager palindrome');
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