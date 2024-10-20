import './Tile.css';
import Image from 'next/image';

export default function Tile(props: any) {

    let color = "";
    if ((props.x + props.y) % 2 == 0) {
        color = "white-tile"
    } else {
        color = "black-tile"
    }

    if (props.piece?.selected) {
        color += " selected"
    }

    if (props.piece?.highlighted) {
        color += " highlighted"
    }



    return (<div className={color} onClick={props.onClick}>
        {/* {props.piece?.highlighted} */}
        {props.piece.empty == false && <Image src={props.piece.image} alt='chess piece' className='image z-20' width={60} height={60} />}
        {/* <h1> {props.piece?.selected ? "yes" : "no"}</h1> */}
    </div>);
}