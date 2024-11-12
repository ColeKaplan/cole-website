import './Tile.css';
import Image from 'next/image';

export default function Tile(props: any) {

    let color = "";
    let highlightedColor = "";
    if ((props.x + props.y) % 2 == 0) {
        color = "white-tile"
    } else {
        color = "black-tile"
    }

    if (props.piece?.selected) {
        color += " selected"
    }

    if (props.piece.highlighted) {
        highlightedColor += "highlighted"

        if (props.piece.empty) {
            highlightedColor += " empty"
        }
    }

    // PROMOTION
    const image = props.piece.promotionImage != "" ? props.piece.promotionImage : props.piece.image



    return (<div className={color} onClick={props.onClick}>
        <div className={highlightedColor}>
            {/* {props.x}, {props.y} */}
            {props.piece.empty == false && <Image src={image} alt='chess piece' className='image z-20' width={60} height={60} draggable="false" />}
        </div>
    </div>);
}