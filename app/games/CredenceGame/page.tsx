'use client'
import Header from '@/components/Header';
import React, { useEffect, useState } from 'react';
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import questions from '@/public/games/CredenceGame/Questions';
import { Question } from '@/types/Question';

export default function CredenceGame() {

    {/* <!-- Google Tag Manager --> */ }
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-MMJ89G6J';
        script.async = true;
        document.head.appendChild(script);
        return () => {
            document.head.removeChild(script);
        };
    }, [])
    {/* <!-- End Google Tag Manager --> */ }

    const marks = [
        { value: 0, label: "50" },
        { value: 20, label: "60" },
        { value: 40, label: "70" },
        { value: 60, label: "80" },
        { value: 80, label: "90" },
        { value: 100, label: "100" },
    ];


    const [score, setScore] = useState(0);
    const [guess, setGuess] = useState(-1);
    const [availableQuestions, setAvailableQuestions] = useState<Question[]>([]);
    const [questionA, setQuestionA] = useState<Question | null>(null);
    const [questionB, setQuestionB] = useState<Question | null>(null);
    const [correctAnswer, setCorrectAnswer] = useState<number>(0);
    const [confidence, setConfidence] = useState(.5);

    const submitGuess = () => {
        if (guess === correctAnswer) {
            setScore(score + Math.round(100 * (.25 - ((1 - confidence) ** 2))));
        }
        else {
            setScore(score - Math.round(100 * (((confidence) ** 2) - .25)));
        }

        updateQuestions();

    }

    const isComparable = (magnitudeA: number, magnitudeB: number) => {
        const diff = Math.abs(magnitudeA - magnitudeB);
        const bigger = Math.max(magnitudeA, magnitudeB);

        if (bigger <= 1) {
            if (diff <= 0) return true;
            return false
        }
        else if (bigger <= 6) {
            if (diff <= 1) return true;
            return false
        }
        else if (bigger <= 11) {
            if (diff <= 2) return true;
            return false
        }
        else if (bigger <= 15) {
            if (diff <= 3) return true;
            return false
        }
        else {
            if (Math.min(magnitudeA, magnitudeB) >= 12) return true;
            return false
        }
    }

    useEffect(() => {
        let loop = true;
        let a = questions[0], b = questions[0];

        while (loop) {
            const indexA = Math.floor(Math.random() * questions.length);
            let indexB = Math.floor(Math.random() * questions.length);

            while (indexB === indexA && questions.length > 1) {
                indexB = Math.floor(Math.random() * questions.length);
            }

            a = questions[indexA];
            b = questions[indexB];

            if (isComparable(a.magnitude, b.magnitude)) {
                loop = false;
            }
        }

        setQuestionA(a);
        setQuestionB(b);
        setCorrectAnswer(a.amount > b.amount ? 0 : 1);
        setAvailableQuestions([...questions]);

    }, [questions]);

    const updateQuestions = () => {
        availableQuestions.splice(availableQuestions.indexOf(questionA!), 1);
        availableQuestions.splice(availableQuestions.indexOf(questionB!), 1);

        let loop = true;
        let a = availableQuestions[0], b = availableQuestions[0];
        while (loop) {

            const indexA = Math.floor(Math.random() * availableQuestions.length);
            let indexB = Math.floor(Math.random() * availableQuestions.length);

            while (indexB === indexA && availableQuestions.length > 1) {
                indexB = Math.floor(Math.random() * availableQuestions.length);
            }

            a = availableQuestions[indexA];
            b = availableQuestions[indexB];

            if (isComparable(a.magnitude, b.magnitude)) {
                loop = false;
            }

        }

        setQuestionA(a)
        setQuestionB(b)
        setCorrectAnswer(a.amount > b.amount ? 0 : 1);

        setGuess(-1);
    }

    function valuetext(value: number) {
        return `${value}`;
    }

    return (
        <div className='bg-slate-500 h-auto'>

            <title>Credence Game</title>
            <meta name="description" content="Test and improve your confidence skills" />
            <link rel="canonical" href="http://colekaplan.dev/games/CredenceGame" />

            <header className='pb-10 min-w-full'>
                <Header />
            </header>
            <div className='flex flex-col items-center'>
                <p className='text-white'>Score: {score}</p>

                <div className='text-white'>
                    <p className='mt-8'>Which is Larger? </p>
                    <p>A: {questionA?.title}</p>
                    <p>B: {questionB?.title}</p>
                </div>

                <div className='flex gap-5 mt-24'>
                    <input className={`border-2 p-2 rounded-md 
                        ${guess === 0 ? 'bg-[#6fc8ff]' : 'bg-[#FFFFFF] hover:bg-[#a5d9f9]'}
                        `} type="button" value="A" onClick={() => {
                            setGuess(0);
                        }} />
                    <input className={`border-2 p-2 rounded-md 
                        ${guess === 1 ? 'bg-[#6fc8ff]' : 'bg-[#FFFFFF] hover:bg-[#a5d9f9]'}
                        `} type="button" value="B" onClick={() => {
                            setGuess(1);
                        }} />
                </div>

                <div>
                    <Box sx={{ width: 300 }}>
                        <Slider
                            aria-label="Custom marks"
                            defaultValue={0}
                            getAriaValueText={valuetext}
                            step={20}
                            marks={marks}
                            onChange={(_, value) => setConfidence((value as number / 2 + 50) / 100)}
                        />
                    </Box>
                </div>

                <input className="mt-8 border-2 p-2 rounded-md bg-[#FFFFFF] hover:bg-[#a5d9f9]" type="button" value="Submit" onClick={() => submitGuess()} />

                <div className='text-white'>
                    <p className='mt-8'>Debugging </p>
                    <p>A: {questionA?.title}={questionA?.amount} and magnitude = {questionA?.magnitude}</p>
                    <p>B: {questionB?.title}={questionB?.amount} and magnitude = {questionB?.magnitude}</p>
                    <p>Correct Answer: {correctAnswer ? "B" : "A"}</p>
                    <p>Confidence: {confidence}</p>
                </div>

            </div>
        </div>
    );
}
