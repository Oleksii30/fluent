import { create } from 'zustand';
import axios from 'axios';
import { IList } from 'interfaces/list.interface';
import { toast } from 'react-toastify';

export const URL = 'https://rek2ict79j.execute-api.us-west-2.amazonaws.com/Prod';

type State = {
  lists: Array<IList> | null;
  currentList: IList | null;
  all: (items: Array<IList>) => void;
  getById: (userId: string, listId: string) => void;
  create: (listData:IList) => void;
  update: (listData:IList) => void;
  delete: (userId: string, listId: string) => void;
}

const useStore = create((set, get) => ({
 lists: null,
 currentList: null,
 all: async (items: Array<IList>) => {
  set((state:State) => ({ lists: items, currentList: null }));
 },
 getById: async (userId: string, listId: string) => {
  const state = <State>get();
  const list:IList | undefined = state.lists?.find((list:IList) => list.createdAt === Number(listId));

  if(list) {
    set((state:State) => ({ currentList: list }));
    return;
  }

  try{
    const response = await axios.get(`${URL}/${listId}?userId=${userId}`);
    set((state:State) => ({ currentList: response.data }));
  }catch(error:any){
    toast.error(error.response.data);
  }
 },
 create: async (listData:IList) => {
  try{
    const response = await axios.post(URL, listData);
  }catch(error:any){
    toast.error(error.response.data);
  }
 },
  update: async (listData:IList) => {
  try{
    const response = await axios.put(URL, listData);
    const list = await axios.get(`${URL}/${listData.createdAt}?userId=${listData.userId}`);
    set((state:State) => ({ currentList: list.data }));
  }catch(error:any){
    toast.error(error.response.data);
  }
 },
 delete: async (userId: string, listId: string) => {
  try{
    await axios.delete(`${URL}/?listId=${listId}&userId=${userId}`);
    const response = await axios.get(`${URL}?userId=${userId}`);
    set((state:State) => ({ lists: response.data }));
  }catch(error:any){
    toast.error(error.response.data);
  }
 },
}));
export default useStore;

