import { create } from 'zustand';
import axios from 'axios';
import { IList } from 'interfaces/list.interface';
import { toast } from 'react-toastify';

export const URL = 'https://rek2ict79j.execute-api.us-west-2.amazonaws.com/Prod';

export type State = {
  lists: Array<IList>;
  currentList: IList | null;
  all: (userId: string) => void;
  getById: (userId: string, listId: string) => void;
  create: (listData:IList) => void;
  update: (listData:IList) => void;
  delete: (userId: string, listId: number) => void;
  nullCurrentList: () => void;
  changeIsSaving: (ISaving:boolean) => void;
  isSaving: boolean;
  changeListStatus: (listData:IList) => void;
  isDeleting: boolean;
}

const useStore = create<State>((set, get) => ({
 lists: [],
 currentList: null,
 isSaving: false,
 isDeleting: false,
 all: async (userId: string) => {
  try {
    const response = await axios.get(`${URL}?userId=${userId}`);
    set((state:State) => ({ lists: response.data }));
  }catch(error:any){
    toast.error(error.response.data);
  }
 },
 getById: async (userId: string, listId: string) => {
  const state = <State>get();
  const list:IList | undefined = state.lists?.find((list:IList) => list.createdAt === Number(listId));

  if(list) {
    set((state:State) => ({ currentList: list }));
    return
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
    set((state:State) => ({ isSaving: true }));
    const response = await axios.post(URL, listData);
    const createdList = await axios.get(`${URL}/${listData.createdAt}?userId=${listData.userId}`);
    set((state:State) => ({ isSaving: false }));
    set((state:State) => ({ currentList: createdList.data }));
  }catch(error:any){
    set((state:State) => ({ isSaving: false }));
    toast.error(error.response.data);
  }
 },
  update: async (listData:IList) => {
  try{
    set((state:State) => ({ isSaving: true }));
    const response = await axios.put(URL, listData);
    const list = await axios.get(`${URL}/${listData.createdAt}?userId=${listData.userId}`);
    set((state:State) => ({ isSaving: false }));
    set((state:State) => ({ currentList: list.data }));
  }catch(error:any){
    set((state:State) => ({ isSaving: false }));
    toast.error(error.response.data);
  }
 },
 delete: async (userId: string, listId: number) => {
  try{
    set((state:State) => ({ isDeleting: true }));
    await axios.delete(`${URL}/?listId=${listId}&userId=${userId}`);
    const response = await axios.get(`${URL}?userId=${userId}`);
    set((state:State) => ({ lists: response.data }));
    set((state:State) => ({ isDeleting: false }));
  }catch(error:any){
    set((state:State) => ({ isDeleting: false }));
    toast.error(error.response.data);
  }
 },
 nullCurrentList: () => {
  set((state:State) => ({ currentList: null }));
 },
 changeIsSaving: (isSaving:boolean) => {
  set((state:State) => ({ isSaving: isSaving }));
 },
 changeListStatus: async (listData:IList) => {
  try{
    const response = await axios.put(URL, listData);
  }catch(error:any){
    toast.error(error.response.data);
  }
 },
}));
export default useStore;

