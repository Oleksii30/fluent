import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ISettings } from 'interfaces/settings.interface';

export const URL = 'https://rek2ict79j.execute-api.us-west-2.amazonaws.com/Prod';

export type State = {
  isAutoTranslate: boolean;
  languages:Array<string>;
	isSaving: boolean;
	languageToTranslate: string;
  all: (userId: string) => void;
  create: (settingsData: ISettings) => void;
  updateAutoTranslate: (userId: string, isAutoTranslate:boolean) => void;
  addLanguage: (userId: string, language:string) => void;
  deleteLanguage: (userId: string, language:string) => void;
	changeTranslateTo: (userId: string, language:string) => void;
}

const useSettingsStore = create<State>((set, get) => ({
  isAutoTranslate: false,
  languages: ['en'],
	isSaving: false,
	languageToTranslate: 'uk',

 	all: async (userId: string) => {
		try {
			const response = await axios.get(`${URL}/settings?userId=${userId}`);
			if(response.data.length === 0){
				return
			}

			const { isAutoTranslate, languages, languageToTranslate } = response.data[0];
			set((state:State) => ({
				isAutoTranslate: isAutoTranslate,
				languages: languages,
				languageToTranslate: languageToTranslate,
			}));
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
			toast.error('Failed to update');
		}
	},
	addLanguage: async (userId: string, language:string) => {
		try{
			set((state:State) => ({ isSaving: true }));
			const state = <State>get();
			const body = {
				...state,
				languages: [...state.languages, language],
				userId: userId
			}
			const response = await axios.put(`${URL}/settings`, body);
			set((state:State) => ({ languages: body.languages }));
			set((state:State) => ({ isSaving: false }));
		}catch(error:any){
			set((state:State) => ({ isSaving: false }));
			toast.error('Failed to update');
		}
	},
	deleteLanguage: async (userId: string, language:string) => {
		try{
			set((state:State) => ({ isSaving: true }));
			const state = <State>get();
			const body = {
				...state,
				languages: state.languages.filter(item => item !== language),
				userId: userId
			}
			const response = await axios.put(`${URL}/settings`, body);
			set((state:State) => ({ languages: body.languages }));
			set((state:State) => ({ isSaving: false }));
		}catch(error:any){
			set((state:State) => ({ isSaving: false }));
			toast.error('Failed to update');
		}
	},
	changeTranslateTo: async (userId: string, language:string) => {
		try{
			set((state:State) => ({ isSaving: true }));
			const state = <State>get();
			const body = {
				...state,
				languageToTranslate: language,
				userId: userId
			}
			const response = await axios.put(`${URL}/settings`, body);
			set((state:State) => ({ languageToTranslate: language }));
			set((state:State) => ({ isSaving: false }));
		}catch(error:any){
			set((state:State) => ({ isSaving: false }));
			toast.error('Failed to update');
		}
	},
}));
export default useSettingsStore;

