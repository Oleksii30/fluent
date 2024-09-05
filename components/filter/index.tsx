import { useState, useEffect } from "react";
import { useIsServerSideMobile } from 'context/serverSideMobile';
import Name from "./name";
import Language from "./language";
import NotLearned from "./notLearned";
import { IList } from 'interfaces/list.interface';
import useFilter, { changeName, changeLang, changeShowNotLearned } from "context/filter";

import styles from 'styles/components/Filter.module.css';

type Props = {
  items: Array<IList>;
	setItems: (firltered:Array<IList>) => void;
}

export default function Filter({ items, setItems }:Props) {
	const [filter, filterDispatch] = useFilter();

	const isTabletOrMobile = useIsServerSideMobile();

	const handleChangeName = (name:string) => {
		changeName(filterDispatch, name)
	}

	const handleChangeLanguge = (lang:string) => {
		changeLang(filterDispatch, lang)
	}

	const handleChangeNotLearned = (showNotLearned: boolean) => {
		changeShowNotLearned(filterDispatch, showNotLearned)
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
			<Name onChangeName={handleChangeName} name={filter.name}/>
			<h4 style={{marginRight:10, marginLeft:20}}>Language</h4>
			<Language onChangeLanguage={handleChangeLanguge} lang={filter.lang}/>
			<h4 style={{marginRight:10, marginLeft:20}}>Not Learned</h4>
			<NotLearned onChangeNotLearned={handleChangeNotLearned} isChecked={filter.showNotLearned}/>
		</div>
  )
}
