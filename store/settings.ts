import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'react-toastify';

export const URL = 'https://rek2ict79j.execute-api.us-west-2.amazonaws.com/Prod';

export type State = {
  isAutoTranslate: boolean;
  all: (userId: string) => void;
	updateAutoTranslate: (userId: string, isAutoTranslate:boolean) => void;
}

const useSettingsStore = create<State>((set, get) => ({
  isAutoTranslate: false,

 	all: async (userId: string) => {
		try {
			const response = await axios.get(`${URL}/settings?userId=${userId}`);
		}catch(error:any){
			toast.error(error.response.data);
		}
	},
	updateAutoTranslate: async (userId: string, isAutoTranslate:boolean) => {
		set((state:State) => ({ isAutoTranslate: isAutoTranslate }));
	}
}));
export default useSettingsStore;

