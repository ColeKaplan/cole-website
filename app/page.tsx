import Card from '@/components/Card';
import React from 'react';

export default function Home(){
    return(
        <div className='flex flex-col justify-items-start items-center min-h-screen py-10 bg-slate-500'>
            <div className='flex justify-center'>
                <h1 className='text-4xl font-bold text-[#FFFFFF] mb-4'>Welcome to the Games Page</h1>
            </div>
            <div className='lg:block md:hidden'>
                <div className='flex justify-center'>
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
                </div>
                <div className='flex justify-center'>
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
                </div>
            </div>
            <div className='flex justify-center mt-10'>
                <h1 className='text-4xl font-bold text-[#FFFFFF] mb-4 2xl:hidden xl:hidden lg:hidden'>Please increase your screen size</h1>
            </div>
        </div>
    );
}
