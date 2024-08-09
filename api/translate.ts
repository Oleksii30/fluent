import { URL } from "store/lists";
import axios from 'axios';


export async function getTranslation(word:string) {
  const { data } = await axios.get(`${URL}/translate?word=${word}`);
  return data;
}
