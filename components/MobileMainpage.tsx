import Card from "./Card";
import Header from "./Header";
import HorizontalCard from "./HorizontalCard";

export default function MobileMainpage(){
    return (
        <div className="h-fit">
            <div className='pb-10 w-dvw'>
                <Header />
            </div>
            <div className='flex flex-col my-md:hidden mb-10'>
                <div id="cardsForGames" className='flex justify-center'>
                    <div className='hidden sm:block'>
                        <HorizontalCard 
                        link='/games/DrawingGame'
                        image='/games/DrawingGame/Car.png'
                        title="Drawing for AI"
                        text="Try to get the AI to guess the category by drawing"
                        />
                    </div>

                    <div className='flex sm:hidden'>
                        <Card 
                        link='/games/DrawingGame'
                        image='/games/DrawingGame/Car.png'
                        title="Drawing for AI"
                        text="Try to get the AI to guess the category by drawing"
                        />
                    </div>
                </div>
                <div className='flex justify-center'>
                    <div className='hidden sm:block'>
                        <HorizontalCard 
                        link='/games/Chess'
                        image='/games/Chess/ChessImage.png'
                        title="Chess"
                        text="Play a friend or challenge our algorithm in this classic game"
                        />
                    </div>

                    <div className='flex sm:hidden'>
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