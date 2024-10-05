import { URL } from "store/lists";
import axios from 'axios';


export async function getAudioUrl(word:string, code:string, voiceId:string) {
  try{
    const { data } = await axios.get(`${URL}/polly?word=${word}&code=${code}&voiceId=${voiceId}`);
    return data;
  }catch(error){
    console.log(error)
  }

}
