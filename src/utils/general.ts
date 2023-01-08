export const countOccurence = (string : string, sub : string) : number => {
    let count = 0;
    
    let split = string.split('');
    for(let i = 0; i < split.length; i++){
        if(split[i] === sub){
            count++
        }
    }

    return count;
}

export const generateSlug = (title : string) : string =>{
    let currentTime = (new Date()).getTime();
    title = title.toLowerCase();
    let whitespaceCount = countOccurence(title, ' ');
    for(let i = 0; i < whitespaceCount; i++){
        title = title.replace(' ', '-')
    }

    if(title[title.length - 1] !== '-'){
        title += '-'
    }

    title += `${currentTime}`

    return title;
}