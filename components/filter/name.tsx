
type Props = {
	onChangeName: (value:string) => void
}

export default function Name({ onChangeName }:Props) {
  const handleChange = (event:any) => {
    onChangeName(event.target.value)
  }
  return (
		<input onChange={handleChange} style={{height:38}}/>
  )
}