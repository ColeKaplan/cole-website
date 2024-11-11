'use client'
import Phaser from "phaser"
import { useEffect } from "react";

class Example extends Phaser.Scene {
    preload ()
    {
        this.load.setBaseURL('https://labs.phaser.io');

        this.load.image('sky', 'assets/skies/space3.png');
        this.load.image('logo', 'assets/sprites/phaser3-logo.png');
        this.load.image('red', 'assets/particles/red.png');
    }

    create ()
    {
        this.add.image(600, 300, 'sky');

        const particles = this.add.particles(0, 0, 'red', {
            speed: 100,
            scale: { start: 1, end: 0 },
            blendMode: 'ADD'
        });

        const logo = this.physics.add.image(400, 100, 'logo');

        logo.setVelocity(100, 200);
        logo.setBounce(1, 1);
        logo.setCollideWorldBounds(true);

        particles.startFollow(logo);
    }
}

export default function PhaserGame(){
    
    useEffect(() => {
        const loadPhaser = async () => {
            window.Phaser = await import(`phaser`);
        };
        loadPhaser();
    }, []);
    
    useEffect(() => {

        const config = {
            type: Phaser.AUTO,
            parent: 'phaser-container',
            width: window.innerWidth,
            height: 600,
            scene: Example,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { x: 0, y: 200 }
                }
            }
        };

        const game = new Phaser.Game(config);

        return () => {};
    }, []);

    return(
        <div className='flex flex-col justify-items-start items-center min-h-screen py-10 bg-slate-500'>
            <div id="phaser-container">
                HHi
            </div>
        </div>
    );
}
    