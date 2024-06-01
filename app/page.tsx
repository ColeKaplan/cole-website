import Card from '@/components/Card';
import React from 'react';

export default function Home(){
    return(
        <div className='flex flex-col items-center justify-center'>
            <div className='flex items-center justify-center'>
                <div>
                    <Card 
                    link='/WildRanger'
                    image='/games/WildRanger/BankImage.png'
                    title="Wild Ranger"
                    text="Cowboy themed Shoot 'Em Up' with a live leaderboard"
                    />
                </div>
                <div>
                    <Card 
                    link='/KnightsJourney'
                    image='/games/KnightsJourney/KnightImage.png'
                    title="Knight's Journey"
                    text="Dungeon Crawler, try to get past the enemies"
                    />
                </div>
                <div>
                    <Card 
                    link='/FishOnLand'
                    image='/games/FishOnLand/FishImage.png'
                    title="Fish on Land"
                    text="Help a lost fish return to his home in the ocean"
                    />
                </div>
            </div>
            <div className='flex items-center justify-center'>
                <div>
                    <Card 
                    link='/WildRanger'
                    image='/games/WildRanger/BankImage.png'
                    title="Wild Ranger"
                    text="Cowboy themed Shoot 'Em Up' with a live leaderboard"
                    />
                </div>
                <div>
                    <Card 
                    link='/KnightsJourney'
                    image='/games/KnightsJourney/KnightImage.png'
                    title="Knight's Journey"
                    text="Dungeon Crawler, try to get past the enemies"
                    />
                </div>
                <div>
                    <Card 
                    link='/FishOnLand'
                    image='/games/FishOnLand/FishImage.png'
                    title="Fish on Land"
                    text="Help a lost fish return to his home in the ocean"
                    />
                </div>
            </div>
        </div>
    );
}
