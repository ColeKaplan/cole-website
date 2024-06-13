import React from 'react';
import Image from 'next/image';
import './ChessSquare.css';

// Define the props for the Square component
interface ChessSquare {
  piece?: string; // URL of the piece image or empty if no piece
  position: string; // e.g., 'a1', 'b2', etc.
}

export default function ChessSquare(props: any) {
  const isDark = (props.position.charCodeAt(0) + parseInt(props.position[1])) % 2 === 1;
  const backgroundColor = isDark ? 'bg-dark' : 'bg-light';

  return (
    <div className= {`w-20 h-20 justify-center items-center ${backgroundColor}`}>
      <Image src={'/games/Chess/blackbishop.png'} width={20} height={20} alt="chess piece" className='w-20 h-20' />
    </div>
  );
};
