import HorizontalCard from "./HorizontalCard";

export default function BrowserMainpage(){
    return (
        <div>
            <div className='flex justify-center items-center flex-col text-[#FFFFFF]'>
                <h1 className='text-3xl font-bold text-[#000000] mb-1 text-center'></h1>
            </div>
            <div className='hidden my-md:block'>
                <div id="cardsForGames" className='flex justify-center'>
                    <div className='w-1/2'>
                        <HorizontalCard
                        link='/games/FishOnLand'
                        image='/games/FishOnLand/FishImage.png'
                        title="Fish on Land"
                        text="Help a lost fish return to his home in the ocean"
                        />
                    </div>
                    <div className='w-1/2'>
                        <HorizontalCard 
                        link='/games/DrawingGame'
                        image='/games/DrawingGame/Car.png'
                        title="Drawing for AI"
                        text="Try to get the AI to guess the category by drawing"
                        />
                    </div>
                </div>
                <div className='flex justify-center'>
                    <div className='w-1/2'>
                        <HorizontalCard 
                        link='/games/Chess'
                        image='/games/Chess/ChessImage.png'
                        title="Chess"
                        text="Play a friend or challenge our algorithm in this classic game"
                        />
                    </div>
                    <div className='w-1/2'>
                        <HorizontalCard 
                        link='/games/WalldOff'
                        image='/games/WalldOff/WalldOffImage.png'
                        title="Walled Off"
                        text="Avoid the skeletons and collect coins using walls"
                        />
                    </div>
                    
                </div>
                <div className='flex justify-center'>
                    
                    <div className='w-1/2'>
                        <HorizontalCard 
                        link='/games/WildRanger'
                        image='/games/WildRanger/BankImage.png'
                        title="Wild Ranger"
                        text="Cowboy themed Shoot 'Em Up' with a live leaderboard"
                        />
                    </div>
                    <div className='w-1/2'>
                        <HorizontalCard 
                        link='/games/KnightsJourney'
                        image='/games/KnightsJourney/KnightImage.png'
                        title="Knight's Journey"
                        text="Dungeon Crawler, try to get past the enemies"
                        />
                    </div>
                </div>
            </div>
        </div>
    );

}