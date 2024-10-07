import { URL } from "store/lists";
import axios from 'axios';
import { toast } from 'react-toastify';


export async function getTranslation(word:string, to:string) {
  try{
    const { data } = await axios.get(`${URL}/translate?word=${word}&to=${to}`);
    return data;
  }catch(error){
    toast.error('Failed to translate to language');
  }
}
