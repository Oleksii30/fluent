import Switch from "react-switch";

type Props = {
	onChangeNotLearned: (value:boolean) => void;
    isChecked: boolean
}

export default function NotLearned({ onChangeNotLearned, isChecked }:Props) {

	const handleChange = () => {
    	onChangeNotLearned(!isChecked);
	}

	return (
		<Switch onChange={handleChange} checked={isChecked} onColor='#ff5252'/>
	)
}
