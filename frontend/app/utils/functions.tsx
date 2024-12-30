export function short_text(text:string, number:number) {
    if(text.length <= number){
        return text; 
    }
    const shortText = `${text.slice(0, number)} ...`;
    return shortText; 
}