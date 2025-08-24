import Switch from "react-switch";
import { useState } from "react";

type Props = {
    index: number;
	saveIsLearnedResult: (value:boolean, index: number) => void;
    isInitialyChecked: boolean;
}

export default function CustomSwitch({ index, saveIsLearnedResult, isInitialyChecked }:Props) {
    const [isChecked, setIsChecked] = useState(isInitialyChecked);

	const handleChange = () => {
        saveIsLearnedResult(!isChecked, index);
    	setIsChecked(prevState => !prevState);
	}

	return (
		<Switch onChange={handleChange} checked={isChecked} onColor='#41dc8e'/>
	)
}
