import { URL } from "store/lists";
import axios from 'axios';


export async function getAudioUrl(word:string) {
  const { data } = await axios.get(`${URL}/polly?word=${word}`);
  return data;
}
