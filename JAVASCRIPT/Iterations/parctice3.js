<<<<<<< HEAD
//1.Check if a Sttring is Palindrome
// A palindrome is a string that reads the same forward and backward (ignoring spaces, punctuation, and case).
function isPalindrome(str) {
    const clean = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return clean === clean.split('').reverse().join('');
}
console.log(isPalindrome('A man, a plan, a canal,Panama')); //true
console.log(isPalindrome('Was it a car or cat I saw?')); //true
console.log(isPalindrome('Hello, World!')); //false

//2. Reverse a String
function reverse_string(str) {
    return str.split("").reverse().join("");
}
console.log(reverse_string("Was it a car or a cat that I saw?"));

//3.Check if Two Strings are Anagrams
function longestPalindromicSubstring(s) {
    if (!s || s.length < 1) return "";

    let start = 0, maxLength = 0;

    function expandAroundCenter(left, right) {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            left--;
            right++;
        }
        return right - left - 1;
    }

    for (let i = 0; i < s.length; i++) {
        let len1 = expandAroundCenter(i, i); // Odd length palindrome
        let len2 = expandAroundCenter(i, i + 1); // Even length palindrome
        let len = Math.max(len1, len2);

        if (len > maxLength) {
            start = i - Math.floor((len - 1) / 2);
            maxLength = len;
        }
    }

    return s.substring(start, start + maxLength);
}
console.log(longestPalindromicSubstring("babad")); // "bab" or "aba"
console.log(longestPalindromicSubstring("cbbd")); // "bb"


//4. Check if two strings are Anagrams
//if they contain te same characters frequently but in different orders
function areAnagrams(str1, str2) {
    let clean1 = str1.toLowerCase().replace(/^[a-z0-9]/gi, '')
    let clean2 = str2.toLowerCase().replace(/^[a-z0-9]/gi, '')

    if (clean1.length !== clean2.length) {
        return false;
    }
    clean1 = str1.split("").sort().join("");
    clean2 = str2.split("").sort().join("");

    return clean1 === clean2;
}
console.log(areAnagrams('listen', 'silent')); //true
console.log(areAnagrams('hello', 'world')); //false

//5. Remove Duplicates from a String
function removeDuplicates(str) {
    return str.trim()
}
console.log(removeDuplicates('programming')); // 'programin
console.log(removeDuplicates('hello world')); // helo wrd
console.log(removeDuplicates('aaaaa')); //a
console.log(removeDuplicates('abcd')); //abcd
console.log(removeDuplicates('aabbcc')); //abc

//6. Count Palindrome in a String
function countPalindromes(s) {
    let count = 0;
    let seen = new Set();

    function expandAroundCenter(left, right) {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            let subStr = s.substring(left, right + 1);
            if (!seen.has(subStr)) {
                seen.add(subStr);
                count++;
            }
            left--;
            right++;
        }
    }

    for (let i = 0; i < s.length; i++) {
        expandAroundCenter(i, i);   // Odd length palindromes
        expandAroundCenter(i, i + 1); // Even length palindromes
    }

    return count;
}
console.log(countPalindromes("ababa")); // 9
console.log(countPalindromes("racecar")); // 10

//7. Longest Common Prefix
function longestCommonPrefix(strings) {
    if (!strings.length) return "";

    let prefix = strings[0];

    for (let i = 1; i < strings.length; i++) {
        while (strings[i].indexOf(prefix) !== 0) {
            prefix = prefix.slice(0, -1);
            if (!prefix) return "";
        }
    }

    return prefix;
}
console.log(longestCommonPrefix(["flower", "flow", "flight"])); // "fl"
console.log(longestCommonPrefix(["dog", "racecar", "car"])); // ""

//8. Case insensitive Palindrome
function isCaseInsensitivePalindrome(str) {
    let cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleanStr === cleanStr.split('').reverse().join('');
}
console.log(isCaseInsensitivePalindrome("RaceCar")); // true
console.log(isCaseInsensitivePalindrome("Hello")); // false



=======
//1.Check if a Sttring is Palindrome
// A palindrome is a string that reads the same forward and backward (ignoring spaces, punctuation, and case).
function isPalindrome(str) {
    const clean = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return clean === clean.split('').reverse().join('');
}
console.log(isPalindrome('A man, a plan, a canal,Panama')); //true
console.log(isPalindrome('Was it a car or cat I saw?')); //true
console.log(isPalindrome('Hello, World!')); //false

//2. Reverse a String
function reverse_string(str) {
    return str.split("").reverse().join("");
}
console.log(reverse_string("Was it a car or a cat that I saw?"));

//3.Check if Two Strings are Anagrams
function longestPalindromicSubstring(s) {
    if (!s || s.length < 1) return "";

    let start = 0, maxLength = 0;

    function expandAroundCenter(left, right) {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            left--;
            right++;
        }
        return right - left - 1;
    }

    for (let i = 0; i < s.length; i++) {
        let len1 = expandAroundCenter(i, i); // Odd length palindrome
        let len2 = expandAroundCenter(i, i + 1); // Even length palindrome
        let len = Math.max(len1, len2);

        if (len > maxLength) {
            start = i - Math.floor((len - 1) / 2);
            maxLength = len;
        }
    }

    return s.substring(start, start + maxLength);
}
console.log(longestPalindromicSubstring("babad")); // "bab" or "aba"
console.log(longestPalindromicSubstring("cbbd")); // "bb"


//4. Check if two strings are Anagrams
//if they contain te same characters frequently but in different orders
function areAnagrams(str1, str2) {
    let clean1 = str1.toLowerCase().replace(/^[a-z0-9]/gi, '')
    let clean2 = str2.toLowerCase().replace(/^[a-z0-9]/gi, '')

    if (clean1.length !== clean2.length) {
        return false;
    }
    clean1 = str1.split("").sort().join("");
    clean2 = str2.split("").sort().join("");

    return clean1 === clean2;
}
console.log(areAnagrams('listen', 'silent')); //true
console.log(areAnagrams('hello', 'world')); //false

//5. Remove Duplicates from a String
function removeDuplicates(str) {
    return str.trim()
}
console.log(removeDuplicates('programming')); // 'programin
console.log(removeDuplicates('hello world')); // helo wrd
console.log(removeDuplicates('aaaaa')); //a
console.log(removeDuplicates('abcd')); //abcd
console.log(removeDuplicates('aabbcc')); //abc

//6. Count Palindrome in a String
function countPalindromes(s) {
    let count = 0;
    let seen = new Set();

    function expandAroundCenter(left, right) {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            let subStr = s.substring(left, right + 1);
            if (!seen.has(subStr)) {
                seen.add(subStr);
                count++;
            }
            left--;
            right++;
        }
    }

    for (let i = 0; i < s.length; i++) {
        expandAroundCenter(i, i);   // Odd length palindromes
        expandAroundCenter(i, i + 1); // Even length palindromes
    }

    return count;
}
console.log(countPalindromes("ababa")); // 9
console.log(countPalindromes("racecar")); // 10

//7. Longest Common Prefix
function longestCommonPrefix(strings) {
    if (!strings.length) return "";

    let prefix = strings[0];

    for (let i = 1; i < strings.length; i++) {
        while (strings[i].indexOf(prefix) !== 0) {
            prefix = prefix.slice(0, -1);
            if (!prefix) return "";
        }
    }

    return prefix;
}
console.log(longestCommonPrefix(["flower", "flow", "flight"])); // "fl"
console.log(longestCommonPrefix(["dog", "racecar", "car"])); // ""

//8. Case insensitive Palindrome
function isCaseInsensitivePalindrome(str) {
    let cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleanStr === cleanStr.split('').reverse().join('');
}
console.log(isCaseInsensitivePalindrome("RaceCar")); // true
console.log(isCaseInsensitivePalindrome("Hello")); // false



>>>>>>> 41d7ab369c9e98849911c632695ea5c1838075e5
