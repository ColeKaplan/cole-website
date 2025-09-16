import React, { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { Montserrat } from 'next/font/google';
import { FaGithub } from 'react-icons/fa';
import Image from 'next/image'

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '500', '700', '900'],
});

interface Particle {
    x: number;
    y: number;
    r: number;
    g: number;
    b: number;
    a: number;
    fading: boolean;
    fadeSpeed: number;
}

interface ReAppearParticle {
    x: number;
    y: number;
    r: number;
    // toR: number
    g: number;
    // toG: number;
    b: number;
    // toB: number;
    a: number;
    toA: number;
    appearing: boolean;
    appearSpeed: number;
}

function DissolvingCard(props: any) {
    const isTextRight = props.isTextRight // for legacy purposes

    const divRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [dissolving, setDissolving] = useState(false);
    const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
    const [particles, setParticles] = useState<Particle[] | null>(null);
    const [dissolved, setDissolved] = useState(false);
    const [reappearing, setReappearing] = useState(false);
    const [reappeared, setReappeared] = useState(false);
    const [reappearParticles, setReappearParticles] = useState<ReAppearParticle[] | null>(null);
    const [reappearSnapshot, setReappearSnapshot] = useState<HTMLCanvasElement | null>(null);

    const handleDissolve = async () => {

        // 1. Snapshot
        let disappearDiv = document.querySelector('#to-disappear') as HTMLElement
        const canvasSnapshot = await html2canvas(disappearDiv, {
            scale: 1,
            useCORS: true,      // allows cross-origin images
            backgroundColor: null,
        });
        const ctxSnapshot = canvasSnapshot.getContext('2d');
        if (!ctxSnapshot) return;

        const { width, height } = canvasSnapshot;
        const imgData = ctxSnapshot.getImageData(0, 0, width, height);

        // Build snapshot for reappearing
        let reappearDiv = document.querySelector('#to-reappear') as HTMLElement
        if (reappearDiv != null) {
            const reappearSnapshot = await html2canvas(reappearDiv, {
                scale: 1,
                useCORS: true,      // allows cross-origin images
                backgroundColor: null,
            });
            setReappearSnapshot(reappearSnapshot);
        }

        // 2. Build particle data
        const newParticles: Particle[] = [];
        const step = 1;
        for (let y = 0; y < height; y += step) {
            for (let x = 0; x < width; x += step) {
                const idx = (y * width + x) * 4;
                const r = imgData.data[idx];
                const g = imgData.data[idx + 1];
                const b = imgData.data[idx + 2];
                const a = imgData.data[idx + 3];
                if (a > 0) {
                    newParticles.push({
                        x,
                        y,
                        r,
                        g,
                        b,
                        a,
                        fading: false,
                        fadeSpeed: 20,
                    });
                }
            }
        }

        // 3. Hide div + trigger canvas render
        disappearDiv.style.opacity = '0';
        disappearDiv.style.pointerEvents = 'none';
        setParticles(newParticles);
        setCanvasSize({ width, height });
        setDissolving(true);
    };

    // 4. Run animation after <canvas> exists
    useEffect(() => {
        if (!dissolving || !canvasRef.current || !particles) return;

        const canvas = canvasRef.current;
        canvas.width = canvasSize.width;
        canvas.height = canvasSize.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const animate = () => {
            console.log("animating")
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (const p of particles) {
                if (p.a > 0 && !p.fading && Math.random() < 0.1) {
                    p.fading = true;
                }
                if (p.a > 0 && p.fading) {
                    p.a -= p.fadeSpeed;
                    p.fadeSpeed = Math.max(p.fadeSpeed - 1, 2)
                }

                ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${p.a / 255})`;
                ctx.fillRect(p.x, p.y, 4, 4);
            }

            if (particles.some(p => p.a > 0)) {
                requestAnimationFrame(animate);
            } else {
                // Animation is done
                setDissolving(false);
                setDissolved(true);
                // handleReappear();

            }
        };

        animate();
    }, [dissolving, particles]);






    // FOR REAPPEARING



    const handleReappear = async () => {

        console.log("reappearing")
        // 1. Snapshot
        const canvasSnapshot = reappearSnapshot;
        if (!canvasSnapshot) return;
        const ctxSnapshot = canvasSnapshot.getContext('2d');
        if (!ctxSnapshot) return;

        const { width, height } = canvasSnapshot;
        const imgData = ctxSnapshot.getImageData(0, 0, width, height);


        // 2. Build particle data
        const newParticles: ReAppearParticle[] = [];
        const step = 1;
        for (let y = 0; y < height; y += step) {
            for (let x = 0; x < width; x += step) {
                const idx = (y * width + x) * 4;
                const r = imgData.data[idx];
                const g = imgData.data[idx + 1];
                const b = imgData.data[idx + 2];
                const toA = imgData.data[idx + 3];
                if (toA > 0) {
                    newParticles.push({
                        x,
                        y,
                        toA,
                        r,
                        g,
                        b,
                        a: 0,
                        appearing: false,
                        appearSpeed: 10,
                    });
                }
            }
        }

        // 3. Hide div + trigger canvas render
        setReappearParticles(newParticles);
        // setCanvasSize({ width, height });
        setReappearing(true);
    };

    // 4. Run animation after reappearParticles exists
    useEffect(() => {
        console.log("use effect for reappearing")
        console.log(reappearing, reappearParticles, canvasRef.current)
        if (!reappearing || !canvasRef.current || !reappearParticles) return;

        const canvas = canvasRef.current;
        canvas.width = canvasSize.width;
        canvas.height = canvasSize.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        let count = 0;

        const animate = () => {
            console.log("appearing")
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const speed = .00001 + count / 100000
            console.log("speed", speed)
            for (const p of reappearParticles) {
                if (!p.appearing && p.a < p.toA && Math.random() < speed) {
                    p.appearing = true;
                    count += 1;
                    // console.log(count)
                }
                if (p.appearing) {
                    if (p.a >= p.toA) {
                        p.appearing = false;
                    } else {
                        p.a += p.appearSpeed;
                        p.appearSpeed = Math.max(p.appearSpeed / 2, 4)
                    }
                }

                ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${p.a / 255})`;
                ctx.fillRect(p.x, p.y, 4, 4);
            }


            if (reappearParticles.some(p => p.a < p.toA)) {
                requestAnimationFrame(animate);
            } else {
                // Animation is done
                setReappeared(true);
                setReappearing(false);

            }
        };

        animate();
    }, [reappearing, reappearParticles]);


    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            
            {/*
            <div
                ref={divRef}
                id='to-disappear'
                className="div-to-dissolve"
                style={{
                    padding: '20px',
                    background: '#f0c',
                    color: '#fff',
                    borderRadius: '10px',
                    textAlign: 'center',
                    transition: 'opacity 0.1s',
                    zIndex: 10,
                    position: 'relative',
                }}
            >
                <h2>Hello World</h2>
                <p>This div will dissolve into particles!</p>
                <button onClick={handleDissolve}>Dissolve</button>
            </div>
            */}


            <div /* Should be an <a> tag but it doesn't let me nest <a> tags */
                id='to-disappear'
                onClick={handleDissolve}
                className='bg-[#c2e2f9] border-2 rounded-xl shadow-xl p-3 m-3 text-center
                    active:bg-[#82cbff] active:text-black hover:bg-[#9fd7ff] hover:text-black max-w-xl
                    grow relative z-10'>
                <div className={`flex ${isTextRight ? 'flex-row-reverse' : 'flex-row'} items-center`}>
                    <div className="">
                        <Image className='rounded-md max-w-60 max-h-40' src={props.image} width={420} height={320} alt={`${props.title} picture`} priority={true}></Image>
                    </div>
                    <div className="ml-4 mr-4">
                        <h2 className={`${montserrat} font-black text-2xl`}>{props.title}</h2>
                        <p className={`text-sm`}>{props.text}</p>
                        {props.githubLink &&
                            <a
                                href={props.githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-[#676767] absolute bottom-2 right-2 active:text-[#949494]"
                            >
                                <FaGithub size={30} />
                            </a>
                        }
                    </div>
                </div>
            </div>
            {(dissolving || reappearing) && (
                <canvas
                    ref={canvasRef}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        pointerEvents: 'none',
                        zIndex: 10
                    }}
                />
            )}
            {false && ((dissolved && reappeared) || (!dissolving && !dissolved && !reappeared)) && ( // To make it appear after instead of during, remove "dissolving ||"
                <div
                    id="to-reappear"
                    className="absolute top-0 left-0 w-full h-full z-0"
                    style={{
                        padding: '20px',
                        background: '#f0c',
                        color: '#fff',
                        borderRadius: '10px',
                        textAlign: 'center',
                        transition: 'opacity 0.1s',
                    }}
                >
                    <h2>This is a new thing</h2>
                    <p>Yay</p>
                    {/* <img
          src="https://via.placeholder.com/100"
          alt="placeholder"
          style={{ display: 'block', margin: '10px auto' }}
        /> */}
                    {/* <button onClick={handleDissolve}>Dissolve</button> */}
                </div>
            )}
        </div>
    );
};

export default DissolvingCard;
