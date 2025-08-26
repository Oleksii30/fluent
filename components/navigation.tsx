import { ArrowRightCircle, ArrowLeftCircle } from 'react-feather';
import IconButton from 'components/buttons/icon';
import Link from 'next/link';

type Props = {
	rightLabel?: string,
	leftLabel?: string,
	routeRight?: URL,
	routeLeft?: URL,
}

export default function Navigation({rightLabel, leftLabel, routeRight, routeLeft}:Props) {

	return (
		<div style={{display: 'flex', alignItems: 'center', fontSize: 12, fontWeight: 'normal'}}>
				{routeLeft && <>
				<Link href={routeLeft}>
					<IconButton size={50} onClick={()=>{}}>
						<ArrowLeftCircle/>
					</IconButton>
				</Link>
				<span style={{marginRight: 15, marginLeft: 5, fontStyle:'italic'}}>{leftLabel}</span>
			</>}
			{routeRight && <>
				<span style={{marginRight: 5, marginLeft: 15, fontStyle:'italic'}}>{rightLabel}</span>
				<Link href={routeRight}>
					<IconButton size={50} onClick={()=>{}}>
						<ArrowRightCircle/>
					</IconButton>
				</Link>
			</>}
		</div>
	)
}
