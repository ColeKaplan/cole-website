'use client'
import Header from '@/components/Header';
import React, { useEffect, useState } from 'react';
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

    const [score, setScore] = useState(0);
    const [guess, setGuess] = useState(-1);
    const [availableQuestions, setAvailableQuestions] = useState<Question[]>([]);
    const [questionA, setQuestionA] = useState<Question | null>(null);
    const [questionB, setQuestionB] = useState<Question | null>(null);
    const [correctAnswer, setCorrectAnswer] = useState<number>(0);
    const [confidence, setConfidence] = useState(50);
    const [showingAnswer, setShowingAnswer] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [wasCorrect, setWasCorrect] = useState(false);

    // Track confidence statistics: { confidence: { total: number, correct: number } }
    const [confidenceStats, setConfidenceStats] = useState<Record<number, { total: number, correct: number }>>({
        50: { total: 0, correct: 0 },
        60: { total: 0, correct: 0 },
        70: { total: 0, correct: 0 },
        80: { total: 0, correct: 0 },
        90: { total: 0, correct: 0 },
        100: { total: 0, correct: 0 },
    });
    const [questionNumber, setQuestionNumber] = useState(1);

    const submitGuess = () => {
        if (guess === -1) return;

        const confidenceDecimal = confidence / 100;
        const correct = guess === correctAnswer;
        setWasCorrect(correct);

        // Update confidence statistics
        setConfidenceStats(prev => ({
            ...prev,
            [confidence]: {
                total: prev[confidence].total + 1,
                correct: prev[confidence].correct + (correct ? 1 : 0)
            }
        }));

        if (correct) {
            setScore(score + Math.round(100 * (.25 - ((1 - confidenceDecimal) ** 2))));
        } else {
            setScore(score - Math.round(100 * (((confidenceDecimal) ** 2) - .25)));
        }

        setShowingAnswer(true);

        setTimeout(() => {
            setShowingAnswer(false);
            updateQuestions();
            setQuestionNumber(questionNumber + 1);
        }, 2000);
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

    }, []);

    const updateQuestions = () => {
        availableQuestions.splice(availableQuestions.indexOf(questionA!), 1);
        availableQuestions.splice(availableQuestions.indexOf(questionB!), 1);

        // Check if we have enough questions left
        if (availableQuestions.length < 2) {
            setGameOver(true);
            return;
        }

        let loop = true;
        let a = availableQuestions[0], b = availableQuestions[0];
        let attempts = 0;
        const maxAttempts = 40; // Prevent infinite loops

        while (loop && attempts < maxAttempts) {
            attempts++;

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

        // If we couldn't find comparable questions, just end the game
        if (attempts >= maxAttempts) {
            setGameOver(true);
            return;
        }

        setQuestionA(a)
        setQuestionB(b)
        setCorrectAnswer(a.amount > b.amount ? 0 : 1);

        setGuess(-1);
        setConfidence(50);
    }

    const formatNumber = (num: number) => {
        return num.toLocaleString();
    }

    return (
        <div className='min-h-screen bg-[#d4edff]'>
            <header className='pb-10 min-w-full'>
                <Header />
            </header>

            <div className='flex flex-col items-center px-4 pb-20'>
                {gameOver ? (
                    /* Game Over Screen */
                    <div className='w-full max-w-3xl bg-white rounded-3xl p-12 border border-slate-200 shadow-xl text-center'>
                        <h1 className='text-5xl font-bold text-slate-800 mb-4'>Game Complete!</h1>
                        <p className='text-slate-600 text-lg mb-8'>You&apos;ve answered all available questions</p>

                        <div className='bg-slate-100 rounded-2xl p-8 mb-8 border border-slate-200'>
                            <p className='text-slate-600 text-sm font-medium mb-2'>Final Score</p>
                            <p className='text-7xl font-bold text-slate-800'>{score}</p>
                        </div>

                        {/* Calibration Chart */}
                        <div className='bg-slate-100 rounded-2xl p-8 mb-8 text-left border border-slate-200'>
                            <h2 className='text-2xl font-bold text-slate-800 mb-4 text-center'>Confidence Calibration</h2>
                            <p className='text-slate-600 text-sm mb-6 text-center'>How accurate were you at each confidence level?</p>

                            <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
                                {[50, 60, 70, 80, 90, 100].map(conf => {
                                    const stats = confidenceStats[conf];
                                    const percentage = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
                                    const hasData = stats.total > 0;

                                    return (
                                        <div key={conf} className='bg-white rounded-xl p-4 border border-slate-200'>
                                            <div className='flex justify-between items-center mb-2'>
                                                <span className='text-slate-800 font-semibold'>{conf}% Confidence</span>
                                                <span className='text-slate-600 text-sm'>
                                                    {hasData ? `${stats.correct}/${stats.total} correct (${percentage}%)` : 'No answers'}
                                                </span>
                                            </div>
                                            {hasData && (
                                                <div className='w-full bg-slate-200 rounded-full h-3 overflow-hidden'>
                                                    <div
                                                        className={`h-full rounded-full transition-all duration-500 ${percentage >= conf - 5 && percentage <= conf + 5
                                                            ? 'bg-green-500'
                                                            : percentage < conf - 10
                                                                ? 'bg-red-500'
                                                                : 'bg-yellow-500'
                                                            }`}
                                                        style={{ width: `${percentage}%` }}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            <div className='mt-6 text-xs text-slate-500 text-center'>
                                <p>🟢 Green = Well calibrated | 🟡 Yellow = Slightly off | 🔴 Red = Poorly calibrated</p>
                            </div>
                        </div>

                        <button
                            onClick={() => window.location.reload()}
                            className='bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg'
                        >
                            Play Again
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Score Display */}
                        <div className='mb-8 text-center'>
                            <div className='inline-block bg-white rounded-2xl px-8 py-4 border border-slate-200 shadow-lg'>
                                <p className='text-slate-600 text-sm font-medium mb-1'>Score</p>
                                <p className='text-5xl font-bold text-slate-800 transition-all duration-300'>{score}</p>
                                <p className='text-slate-500 text-xs mt-2'>Question {questionNumber}</p>
                            </div>
                        </div>

                        {/* Main Game Card */}
                        <div className='w-full max-w-3xl bg-white rounded-3xl p-8 border border-slate-200 shadow-xl transition-all duration-500'>
                            <h2 className='text-3xl font-bold text-slate-800 text-center mb-8'>
                                Which is Larger?
                            </h2>

                            {/* Questions */}
                            <div className='space-y-4 mb-8'>
                                {/* Option A */}
                                <button
                                    onClick={() => !showingAnswer && setGuess(0)}
                                    disabled={showingAnswer}
                                    className={`w-full p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-[1.02] ${showingAnswer
                                        ? correctAnswer === 0
                                            ? 'bg-green-50 border-green-500 shadow-md'
                                            : guess === 0
                                                ? 'bg-red-50 border-red-500 shadow-md'
                                                : 'bg-slate-50 border-slate-200'
                                        : guess === 0
                                            ? 'bg-blue-50 border-blue-500 shadow-md'
                                            : 'bg-slate-50 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                                        }`}
                                >
                                    <div className='flex items-center justify-between'>
                                        <div className='flex items-center gap-4'>
                                            <span className='text-4xl font-bold text-slate-700'>A</span>
                                            <span className='text-xl text-slate-800 font-medium text-left'>{questionA?.title}</span>
                                        </div>
                                        {showingAnswer && (
                                            <span className={`text-sm font-semibold ${correctAnswer === 0 ? 'text-green-700' : 'text-slate-600'}`}>
                                                {correctAnswer === 0 && '✓ '}{formatNumber(questionA?.amount || 0)}
                                            </span>
                                        )}
                                    </div>
                                </button>

                                {/* Option B */}
                                <button
                                    onClick={() => !showingAnswer && setGuess(1)}
                                    disabled={showingAnswer}
                                    className={`w-full p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-[1.02] ${showingAnswer
                                        ? correctAnswer === 1
                                            ? 'bg-green-50 border-green-500 shadow-md'
                                            : guess === 1
                                                ? 'bg-red-50 border-red-500 shadow-md'
                                                : 'bg-slate-50 border-slate-200'
                                        : guess === 1
                                            ? 'bg-blue-50 border-blue-500 shadow-md'
                                            : 'bg-slate-50 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                                        }`}
                                >
                                    <div className='flex items-center justify-between'>
                                        <div className='flex items-center gap-4'>
                                            <span className='text-4xl font-bold text-slate-700'>B</span>
                                            <span className='text-xl text-slate-800 font-medium text-left'>{questionB?.title}</span>
                                        </div>
                                        {showingAnswer && (
                                            <span className={`text-sm font-semibold ${correctAnswer === 1 ? 'text-green-700' : 'text-slate-600'}`}>
                                                {correctAnswer === 1 && '✓ '}{formatNumber(questionB?.amount || 0)}
                                            </span>
                                        )}
                                    </div>
                                </button>
                            </div>

                            {/* Confidence Slider */}
                            {!showingAnswer && (
                                <div className='mb-8 bg-slate-50 rounded-2xl p-6 border border-slate-200'>
                                    <label className='block text-slate-800 text-lg font-semibold mb-4 text-center'>
                                        Confidence: {confidence}%
                                    </label>
                                    <input
                                        type="range"
                                        min="50"
                                        max="100"
                                        step="10"
                                        value={confidence}
                                        onChange={(e) => setConfidence(Number(e.target.value))}
                                        className='w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer slider'
                                        style={{
                                            background: `linear-gradient(to right, #2563eb 0%, #1d4ed8 ${(confidence - 50) * 2}%, #e2e8f0 ${(confidence - 50) * 2}%, #e2e8f0 100%)`
                                        }}
                                    />
                                    <div className='flex justify-between text-slate-500 text-sm mt-2'>
                                        <span>50%</span>
                                        <span>60%</span>
                                        <span>70%</span>
                                        <span>80%</span>
                                        <span>90%</span>
                                        <span>100%</span>
                                    </div>
                                </div>
                            )}

                            {/* Result Message */}
                            {showingAnswer && (
                                <div className={`mb-6 p-6 rounded-2xl text-center transition-all duration-500 ${wasCorrect
                                    ? 'bg-green-50 border-2 border-green-500'
                                    : 'bg-red-50 border-2 border-red-500'
                                    }`}>
                                    <p className={`text-2xl font-bold ${wasCorrect ? 'text-green-700' : 'text-red-700'}`}>
                                        {wasCorrect ? '🎉 Correct!' : '❌ Incorrect'}
                                    </p>
                                    <p className='text-slate-700 mt-2'>
                                        The answer was <span className='font-bold'>{correctAnswer === 0 ? 'A' : 'B'}</span>
                                    </p>
                                </div>
                            )}

                            {/* Submit Button */}
                            {!showingAnswer && (
                                <button
                                    onClick={submitGuess}
                                    disabled={guess === -1}
                                    className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform ${guess === -1
                                        ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                                        : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-[1.02] shadow-md hover:shadow-lg'
                                        }`}
                                >
                                    Submit Answer
                                </button>
                            )}
                        </div>
                    </>
                )}
            </div>

            <style jsx>{`
                .slider::-webkit-slider-thumb {
                    appearance: none;
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    background: #2563eb;
                    cursor: pointer;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    transition: all 0.2s;
                }
                
                .slider::-webkit-slider-thumb:hover {
                    transform: scale(1.1);
                    background: #1d4ed8;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
                }
                
                .slider::-moz-range-thumb {
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    background: #2563eb;
                    cursor: pointer;
                    border: none;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    transition: all 0.2s;
                }
                
                .slider::-moz-range-thumb:hover {
                    transform: scale(1.1);
                    background: #1d4ed8;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
                }
            `}</style>
        </div>
    );
}
