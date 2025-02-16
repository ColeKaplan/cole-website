import Header from "./Header";
import HorizontalCard from "./HorizontalCard";

export default function BrowserMainpage(){
    return (
        <div className="min-h-screen pb-10">
            <header className='pb-10 w-dvw'>
                <Header />
            </header>
            <div className='flex flex-col justify-center items-center'>
                <div id="cardsForGames" className='flex justify-center'>
                    <div className='w-1/2'>
                        <HorizontalCard
                        link='/games/FishOnLand'
                        image='/games/FishOnLand/FishImage.png'
                        title="Fish On Land"
                        text="Help a lost fish return to his home in the ocean"
                        />
                    </div>
                    <div className='w-1/2'>
                        <HorizontalCard 
                        link='/games/DrawingGame'
                        image='/games/DrawingGame/Car.png'
                        title="Draw for AI"
                        text="Try to get the AI to guess the category by drawing"
                        />
                    </div>
                </div>
                <div className='flex justify-center'>
                    <div className='w-1/2'>
                        <HorizontalCard 
                        link='/games/Footprints'
                        image='/games/Footprints/Footprints.png'
                        title="Footprints"
                        text="AR project using Snap Spectacles. Winner of Spectacles track of MIT Reality Hack 2025!"
                        />
                    </div>
                    <div className='w-1/2'>
                        <HorizontalCard 
                        link='/games/BoyMoon'
                        image='/games/BoyMoon/BoyOnMoon.png'
                        title="BoyOnMoon"
                        text="3D Graphic created originally in OpenGL and converted to WebGL with Three.js"
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
                        link='/games/WalledOff'
                        image='/games/WalledOff/WalledOffImage.png'
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