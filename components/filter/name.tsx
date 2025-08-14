import { ChangeEvent } from "react"

type Props = {
  name: string,
	onChangeName: (value:string) => void
}

export default function Name({ onChangeName, name }:Props) {
  const handleChange = (event:ChangeEvent) => {
    if(!event.target){
      return
    }
    onChangeName((event.target as HTMLInputElement).value)
  }
  return (
		<input onChange={handleChange} style={{height:38}} value={name}/>
  )
}
