import Card from '@/components/Card';
import React from 'react';
import SocialsLinks from '@/components/SocialsLinks';

export default function Home(){
    return(
        <div id="columnDivForPage" className='flex flex-col min-h-screen items-center py-10 bg-slate-500'>
            <div className='flex justify-center items-center flex-col text-[#FFFFFF]'>
                <h1 className='text-4xl font-bold text-[#FFFFFF] mb-4 text-center'>Welcome to my portfolio!</h1>
                <div className='flex flex-col text-lg text-center p-5'>
                    <p>
                        I am a computer science student at Georgia Tech going into my third year with a focus in graphics and cybersecurity.
                    </p>
                    <p className='pt-5 lg:pt-0'>
                        As you can see below, I love to make games! I also have other projects that I am in the process of transitioning to React.
                    </p>
                </div>
            </div>
            <div className='hidden lg:block'>
                <div id="cardsForGames" className='flex justify-center'>
                    <div>
                        <Card 
                        link='/games/WildRanger'
                        image='/games/WildRanger/BankImage.png'
                        title="Wild Ranger"
                        text="Cowboy themed Shoot 'Em Up' with a live leaderboard"
                        />
                    </div>
                    <div>
                        <Card 
                        link='/games/KnightsJourney'
                        image='/games/KnightsJourney/KnightImage.png'
                        title="Knight's Journey"
                        text="Dungeon Crawler, try to get past the enemies"
                        />
                    </div>
                    <div>
                        <Card 
                        link='/games/FishOnLand'
                        image='/games/FishOnLand/FishImage.png'
                        title="Fish on Land"
                        text="Help a lost fish return to his home in the ocean"
                        />
                    </div>
                    <div>
                        <Card 
                        link='/games/WalldOff'
                        image='/games/WalldOff/WalldOffImage.png'
                        title="WalldOff"
                        text="Avoid the skeletons and collect coins using walls"
                        />
                    </div>
                </div>
                {/* <div className='flex justify-center'>
                    <div>
                        <Card 
                        link='/games/DrawingGame'
                        image='/games/DrawingGame/Car.png'
                        title="Drawing for AI"
                        text="Try to get the AI to guess the category by drawing"
                        />
                    </div>
                    <div>
                        <Card 
                        link='/games/Chess'
                        image='/games/KnightsJourney/KnightImage.png'
                        title="Chess"
                        text="Play a friend or challenge our algorithm"
                        />
                    </div>
                    <div>
                        <Card 
                        link='/games/FishOnLand'
                        image='/games/FishOnLand/FishImage.png'
                        title="Unknown"
                        text="Maybe Android Studio class game"
                        />
                    </div>
                </div> */}
            </div>
            <div className='flex mt-10'>
                <h1 className='text-4xl text-center font-bold text-[#FFFFFF] mb-4 2xl:hidden xl:hidden lg:hidden'>Please increase screen size to view games</h1>
            </div>
            <SocialsLinks/>
            
        </div>
    );
}
