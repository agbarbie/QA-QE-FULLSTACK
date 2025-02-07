//1. check String Input
function is_string(input){
    return typeof input === 'string';
    }
    console.log(is_string('w3resource')); //true
    console.log(is_string([1,2,4,0])); //false
    
    //2.check Blank String
    function is_Blank(str){
        return str === '';
    }
    console.log(is_Blank(''));//true
    console.log(is_Blank('abc')); //false
    
    //3.string to Array of Words
    function string_to_array(str){
        return str.split(" ");
    }
    console.log(string_to_array("Robin Singh")); //["Robin","Singh"]
    
    //4.Extract Charater
    function truncate_string(str,num){
        return str.substring(0,num);
    }
    console.log(truncate_string("Robin Singh",4)); //"Robi"
    
    //5. Abbreviate Name
    function abbrev_name(str){
        const split_names = str.trim().split(" ")
        return split_names.length > 1 ? `${split_names[0]} ${split_names[1][0]}.` : split_names[0];
    }
    console.log(abbrev_name("Robin Singh")); //"Robin S."
    
    //6. Hide Email Address
    function protect_email(email) {
        let avg = '';
        let splitted = [];
        let part1 = ''; 
        let part2 = '';
    
        splitted = email.split("@");
        part1 = splitted[0];
        avg = part1.length / 2;
        part1 = part1.substring(0, Math.floor(avg));
        part2 = splitted[1];
    
        return part1 + "...@" + part2;
    }
    console.log(protect_email("robin_singh@example.com"));  // "robin...@example.com"
    
    //7. Parameterize String
    function string_parameterize(str){
        return str.trim().toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
    }
    console.log(string_parameterize("Robin Singh from USA.")); //"robin-singh-from-usa"
    
    //8. Captitalize First Letter
    function capitalize(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    console.log(capitalize('js string exercises')); // "Js string exercises"
    
    //9. Capitalize Each Word
    function capitalize_Words(str) {
        return str.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }
    console.log(capitalize_Words('js string exercises')); // "Js String Exercises"
    
    //10. Swap Case
    function swapcase(str){
        return str.replace(/[a-zA-Z]/g, function(char) {
            return char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase();
        });
    }
    console.log(swapcase('AaBbc')); // "aAbBC"
    
    //11. Camelize String
    function camelize(str){
        return str.replace(/\s+(.)/g, function(match, char) {
            return char.toUpperCase();
        });
    }
    console.log(camelize("JavaScript Exercises")); // "JavaScriptExercises
    
    //12. Uncamelize String
    function uncamelize(str, separator) {
        if (typeof separator === "undefined") { 
            separator = " "; 
        }
    
        return str.replace(/[A-Z]/g, function (letter) {
            return separator + letter.toLowerCase();
        });
    }
    console.log(uncamelize('helloWorld')); // "hello world"
    console.log(uncamelize('helloWorld','-')); // "hello-world
    
    //13.Repeat String
    function repeat(str,num){
        return str.repeat(num)
    }
    console.log(repeat('Ha!', 3)); // "Ha!Ha!Ha!"
    
    //14. Insert String
    function insert(str,insertStr,position){
        return str.slice(0,position)+ insertStr + str.slice(position);
    }
    console.log(insert('We are doing some exercises.', 'JavaScript ', 18));// "We are doing some JavaScript exercises."
    
    //15. Humanize Format 
    function humanize_format(num){
        if (typeof num !=='number')return '';
        let suffix = 'th';
        if(num % 100 < 11 || num % 100 > 13){
            if (num % 10 === 1) suffix = 'st';
            else if(num % 10 == 2) suffix = 'nd';
            else if(num % 10 ==3) suffix = 'rd';
        }
        return num + suffix;
    }
    console.log(humanize_format(301)); // "301st"
    
    //16. Truncate String with Ellipsis
    function text_truncate(str, length, ending = '...') {
        return str.length > length ? str.slice(0, length) + ending : str;
    }
    console.log(text_truncate('We are doing JS string exercises.', 15, '!!'));// "We are doing !!"
    
    //17. Chop Strng into Chunks 
    function string_chop(str,size){
        let result = [];
        for (let i = 0; i < str.length; i += size){
            result.push(str.slice(i,i +size));
        }
        return result;
    }
    console.log(string_chop('w3resource', 3)); // ["w3r", "eso", "urc", "e"]
    
    //18. Chop Substring Occurrences
    function count(str,subStr){
        let regex = new RegExp(subStr,'gi');
        return (str.match(regex));
    }
    console.log(count("The quick brown fox jumps over the lazy dog", 'the'));// Output: 2
    
    //19.Reverse Binary Representation
    function reverse_binary(num) {
        let binary = num.toString(2); 
        let reversedBinary = binary.split('').reverse().join(''); 
        return parseInt(reversedBinary, 2); 
    }
    console.log(reverse_binary(100)); // 19
    
    //20. Pad String to Length
    function formatted_string(template, num, direction) {
        let numStr = num.toString();
        return direction === 'l' 
            ? template.slice(0, -numStr.length) + numStr 
            : numStr + template.slice(numStr.length); 
    }
    
    console.log(formatted_string('0000', 123, 'l')); // "0123