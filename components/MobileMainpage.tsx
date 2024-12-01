import Card from "./Card";
import HorizontalCard from "./HorizontalCard";

export default function MobileMainpage(){
    return (
        <div>
            <div className='flex flex-col my-md:hidden'>
                <div id="cardsForGames" className='flex justify-center'>
                    <div className='w-full hidden sm:block'>
                        <HorizontalCard 
                        link='/games/DrawingGame'
                        image='/games/DrawingGame/Car.png'
                        title="Drawing for AI"
                        text="Try to get the AI to guess the category by drawing"
                        />
                    </div>

                    <div className='w-full flex sm:hidden'>
                        <Card 
                        link='/games/DrawingGame'
                        image='/games/DrawingGame/Car.png'
                        title="Drawing for AI"
                        text="Try to get the AI to guess the category by drawing"
                        />
                    </div>
                </div>
                <div className='flex justify-center'>
                    <div className='w-full hidden sm:block'>
                        <HorizontalCard 
                        link='/games/Chess'
                        image='/games/Chess/ChessImage.png'
                        title="Chess"
                        text="Play a friend or challenge our algorithm in this classic game"
                        />
                    </div>

                    <div className='w-full flex sm:hidden'>
                        <Card 
                        link='/games/Chess'
                        image='/games/Chess/ChessImage.png'
                        title="Chess"
                        text="Play a friend or challenge our algorithm in this classic game"
                        />
                    </div>
                </div>
            </div>
        </div>
    );

}