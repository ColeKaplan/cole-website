import DissolvingCard from "./DissolvingCard";
import Header from "./Header";
import HorizontalCard from "./HorizontalCard";

export default function BrowserMainpage() {
    return (
        <div className="min-h-screen pb-10">
            <header className='pb-10 w-dvw'>
                <Header />
            </header>
            <div className='flex flex-col justify-center items-center'>
                <div id="cardsForGames" className='flex justify-center'>
                    <div className='w-1/2'>
                        <DissolvingCard
                            // link='/games/DrawingGame'
                            // image='/games/DrawingGame/Car.png'
                            // title="Draw for AI"
                            // text="Try to get the AI to guess the category by drawing"
                            // githubLink="https://github.com/ColeKaplan/AI_Drawing/tree/main"
                        />
                    </div>
                    <div className='w-1/2'>
                        <HorizontalCard
                            link='/games/BoyOnTheMoon'
                            image='/games/BoyMoon/BoyOnMoon.png'
                            title="Boy On The Moon"
                            text="3D Graphic created originally in OpenGL and converted to WebGL with Three.js"
                            githubLink="https://github.com/CaydeXI/Computer-Graphics-Final/tree/main"
                        />
                    </div>
                </div>
                <div className='flex justify-center'>
                    <div className='w-1/2'>
                        <HorizontalCard
                            link='/games/MazeOfTheLostKey'
                            image='/games/MazeOfTheLostKey/LostMazeImage.png'
                            title="Maze Of The Lost Key"
                            text="Collect the keys and escape the dungeon"
                            
                        />
                    </div>
                     <div className='w-1/2'>
                        <HorizontalCard
                            link='/games/FishOnLand'
                            image='/games/FishOnLand/FishImage.png'
                            title="Fish On Land"
                            text="Help a lost fish return to his home in the ocean"
                            githubLink="https://github.com/ColeKaplan/FishOnLand"
                        />
                    </div>
                </div>
                <div className='flex justify-center'>
                     <div className='w-1/2'>
                        <HorizontalCard
                            link='/games/Footprints'
                            image='/games/Footprints/Footprints.png'
                            title="Footprints"
                            text="AR project using Snap Spectacles. Winner at MIT Reality Hack 2025!"
                            githubLink="https://github.com/ColeKaplan/Footprints"
                        />
                    </div>
                    <div className='w-1/2'>
                        <HorizontalCard
                            link='/games/WalledOff'
                            image='/games/WalledOff/WalledOffImage.png'
                            title="Walled Off"
                            text="Avoid the skeletons and collect coins using walls"
                            githubLink="https://github.com/ColeKaplan/GCPL"
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
                            githubLink="https://github.com/ColeKaplan/ScoreSpaceGameJam"
                        />
                    </div>
                    <div className='w-1/2'>
                        <HorizontalCard
                            link='/games/KnightsJourney'
                            image='/games/KnightsJourney/KnightImage.png'
                            title="Knight's Journey"
                            text="Dungeon Crawler, try to get past the enemies"
                            githubLink="https://github.com/BenjaminChern/gameJam"
                        />
                    </div>
                </div>
                <div className='flex justify-center'>
                    <HorizontalCard
                        link='/games/Chess'
                        image='/games/Chess/ChessImage.png'
                        title="Chess"
                        text="Play a friend in this classic game"
                        githubLink="https://github.com/ColeKaplan/Chess-Game"
                    />
                </div>
            </div>
        </div >
    );

}