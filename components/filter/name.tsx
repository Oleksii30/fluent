
type Props = {
  name: string,
	onChangeName: (value:string) => void
}

export default function Name({ onChangeName, name }:Props) {
  const handleChange = (event:any) => {
    onChangeName(event.target.value)
  }
  return (
		<input onChange={handleChange} style={{height:38}} value={name}/>
  )
}
