
export function pause(time) {
    setTimeout(() => { }, time);
}

export async function bruteForce(word, update) {
    let longest = '', result = [];
    for (let i = 0; i < word.length; i++) {
        for (let j = i + 1; j < word.length; j++) {
            update({ selected: [i, j] });
            await delay(200);
            const subString = word.substring(i, j + 1);
            if (isPalindrome(subString) && subString.length > longest.length) {
                longest = subString;
                result = [i, j];
            }
        }
    }
    update({ result: [result[0], result[1]], running: false });
}

function isPalindrome(str) {
    str = str.toLowerCase();
    for (let i = 0; i < str.length / 2; i++) {
        if (str[i] !== str[str.length - 1 - i]) {
            return false;
        }
    }
    return true;
}

function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time))
}