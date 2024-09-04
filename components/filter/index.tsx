import { useState, useEffect } from "react";
import { useIsServerSideMobile } from 'context/serverSideMobile';
import Name from "./name";
import Language from "./language";
import NotLearned from "./notLearned";
import { IList } from 'interfaces/list.interface';

import styles from 'styles/components/Filter.module.css';

type Props = {
  items: Array<IList>;
	setItems: (firltered:Array<IList>) => void;
}

const defaultFilter = {
	name: '',
	lang: '',
	showNotLearned: false
}

export default function Filter({ items, setItems }:Props) {
	const [filter, setFilter] = useState(defaultFilter);

	const isTabletOrMobile = useIsServerSideMobile();

	const handleChangeName = (name:string) => {
		setFilter(prevFilter => ({
			...prevFilter,
			name: name
		}))
	}

	const handleChangeLanguge = (lang:string) => {
		setFilter(prevFilter => ({
			...prevFilter,
			lang: lang
		}))
	}

	const handleChangeNotLearned = (showNotLearned: boolean) => {
		setFilter(prevFilter => ({
			...prevFilter,
			showNotLearned: showNotLearned
		}))
	}

	useEffect(() => {
		const filtered = items
			.filter(item => item.header.includes(filter.name))
			.filter(item => {
				if(!filter.lang){
					return true
				}
				return item.language === filter.lang
			})
			.filter(item => {
				if(!filter.showNotLearned){
					return true
				}
				return item.isLearned === false
			})
		setItems(filtered);
	}, [filter, items])

  return (
		<div className={isTabletOrMobile ? styles.main_container_mobile : styles.main_container}>
			<h4 style={{marginRight:10}}>List Header</h4>
			<Name onChangeName={handleChangeName}/>
			<h4 style={{marginRight:10, marginLeft:20}}>Language</h4>
			<Language onChangeLanguage={handleChangeLanguge}/>
			<h4 style={{marginRight:10, marginLeft:20}}>Not Learned</h4>
			<NotLearned onChangeNotLearned={handleChangeNotLearned} isChecked={filter.showNotLearned}/>
		</div>
  )
}
