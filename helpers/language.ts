export function calculateLanguageOptions(languages:Array<string>, languagesArray:Array<any>){
  return languagesArray.filter(item => languages.includes(item.value));
}
