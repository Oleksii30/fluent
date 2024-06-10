import { create } from 'zustand';
import axios from 'axios';
import { IList } from 'interfaces/list.interface';

const URL = 'https://rek2ict79j.execute-api.us-west-2.amazonaws.com/Prod';

const useStore = create((set, get) => ({
 lists: [],
 currentList: null,
 all: async (userId: string) => {
  const response = await axios.get(`${URL}?userId=${userId}`);
  set((state:any) => ({ lists: response.data, currentList: null }));
 },
 getById: async (userId: string, listId: string) => {
  const state:any = get();
  const list:IList = state.lists.find((list:any) => list.createdAt == listId);

  if(list) {
    set((state:any) => ({ currentList: list }));
    return;
  }

  try{
    const response = await axios.get(`${URL}/${listId}?userId=${userId}`);  
    set((state:any) => ({ currentList: response.data }));
  }catch(error:any){
    console.log(error.response.data)
  }
 },
 create: async (listData:IList) => {
  const response = await axios.post(URL, listData);
 },
 update: async (listData:IList) => {
  const response = await axios.put(URL, listData);
  const list = await axios.get(`${URL}/${listData.createdAt}?userId=${listData.userId}`);
  set((state:any) => ({ currentList: list.data }));
 },
 delete: async (userId: string, listId: string) => {
  await axios.delete(`${URL}/?listId=${listId}&userId=${userId}`);
  const response = await axios.get(`${URL}?userId=${userId}`);
  set((state:any) => ({ lists: response.data }));
 },
}));
export default useStore;

