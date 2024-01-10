import { create } from 'zustand';
import axios from 'axios';
import { IList } from 'interfaces/list.interface';

const URL = 'https://vdzfnqdmbh.execute-api.us-west-2.amazonaws.com/prod/lists';

const useStore = create((set, get) => ({
 lists: [],
 currentList: null,
 all: async (userId: string) => {
  const response = await axios.get(`${URL}?userId=${userId}`);
  set((state:any) => ({ lists: response.data.Items }));
 },
 getById: async (userId: string, listId: string) => {
  const state:any = get();
  const list:IList = state.lists.find((list:any) => list.createdAt == listId);

  if(list) {
    set((state:any) => ({ currentList: list }));
    return;
  }

  const response = await axios.get(`${URL}/${listId}?userId=${userId}`);
  set((state:any) => ({ currentList: response.data.Items[0] }));
 },
 create: async (listData:IList) => {
  const response = await axios.post(URL, listData);
},
 }));
export default useStore;

