import './Tile.css';
import Image from 'next/image';

export default function Tile(props: any) {

    let color = "";
    if ((props.x + props.y) % 2 == 0) {
        color = "white-tile";
    } else {
        color = "black-tile";
    }


    return (<div className={color}>
        {props.image != null && <Image src={props.image} alt='chess piece' className='image' width={60} height={60} />}
    </div>);
}