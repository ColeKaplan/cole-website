import Card from '@/components/Card';
import React from 'react';

export default function Home(){
    return(
        <div className='flex'>
            <div>
                <Card 
                link='/WildRanger'
                image='/games/WildRanger/bank_inside.png'
                title="Wild Ranger"
                text="Cowboy themed Shoot 'Em Up' with a live leaderboard"
                />
            </div>
            <div>
                <Card 
                link='/KnightsJourney'
                image='/games/WildRanger/bank_inside.png'
                title="Knight's Journey"
                text="Dungeon Crawler with advanced movement and animations"
                />
            </div>
            <div>
                <Card 
                link='/FishOnLand'
                image='/games/WildRanger/bank_inside.png'
                title="Fish on Land"
                text="Help a lost fish return to his home in the ocean"
                />
            </div>
        </div>
    );
}
