import { useState, useEffect } from "react";
import Name from "./name";
import Language from "./language";
import { IList } from 'interfaces/list.interface';

import styles from 'styles/components/Filter.module.css';

type Props = {
  items: Array<IList>;
	setItems: (firltered:Array<IList>) => void
}

const defaultFilter = {
	name: '',
	lang: '',
}

export default function Filter({ items, setItems }:Props) {
	const [filter, setFilter] = useState(defaultFilter);

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

	useEffect(() => {
		const filtered = items
			.filter(item => item.header.includes(filter.name))
			.filter(item => {
				if(!filter.lang){
					return true
				}
				return item.language === filter.lang
			})
		setItems(filtered);
	}, [filter, items])
  return (
		<div className={styles.main_container}>
			<h4 style={{marginRight:10}}>List Header</h4>
			<Name onChangeName={handleChangeName}/>
			<h4 style={{marginRight:10, marginLeft:20}}>Language</h4>
			<Language onChangeLanguage={handleChangeLanguge}/>
		</div>
  )
}
