import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ISettings } from 'interfaces/settings.interface';

export const URL = 'https://rek2ict79j.execute-api.us-west-2.amazonaws.com/Prod';

export type State = {
  isAutoTranslate: boolean;
  all: (userId: string) => void;
	create: (settingsData: ISettings) => void;
	updateAutoTranslate: (userId: string, isAutoTranslate:boolean) => void;
}

const useSettingsStore = create<State>((set, get) => ({
  isAutoTranslate: false,

 	all: async (userId: string) => {
		try {
			const response = await axios.get(`${URL}/settings?userId=${userId}`);
			if(response.data.length === 0){
				return
			}

			const { isAutoTranslate } = response.data[0];
			set((state:State) => ({ isAutoTranslate: isAutoTranslate }));
		}catch(error:any){
			toast.error(error.response.data);
		}
	},
	create: async (settingsData: ISettings) => {
		try{
			const response = await axios.post(`${URL}/settings`, settingsData);
		}catch(error:any){
			console.log(error)
		}
	},
	updateAutoTranslate: async (userId: string, isAutoTranslate:boolean) => {
		try{
			const state = <State>get();
			const body = {
				...state,
				isAutoTranslate: isAutoTranslate,
				userId: userId
			}
			set((state:State) => ({ isAutoTranslate: isAutoTranslate }));
			const response = await axios.put(`${URL}/settings`, body);
		}catch(error:any){
			console.log(error)
		}
	}
}));
export default useSettingsStore;

