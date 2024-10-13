import { URL } from "store/lists";
import axios from 'axios';
import { toast } from 'react-toastify';


export async function getAudioUrl(word:string, code:string, voiceId:string) {
  try{
    const { data } = await axios.get(`${URL}/polly?word=${word}&code=${code}&voiceId=${voiceId}`);
    return data;
  }catch(error){
    toast.error('Failed to get audio');
  }

}
