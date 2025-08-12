import { useState, useEffect } from 'react';
import useSound from 'use-sound';
import boopSfx from '../assets/beep.mp3'; // Import your sound file
import { Config } from './Config'


export function Pomodoro() {
    const [playBeep] = useSound(boopSfx);
    const [configuredTime, setConfiguredTime] = useState(1500) // 1500 Seconds = 25 minutes 
    const [configuredRelaxTime, setConfiguredRelaxTime] = useState(300) // 300 Seconds = 5 minutes 
    const [timeLeft, setTimeLeft] = useState(configuredTime);
    const [isRunning, setIsRunning] = useState(false);
    const [mode, setMode] = useState('focus');

    //TODO: Add Notification when its done

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (isRunning && timeLeft > 0) {

            document.title = formatTime(timeLeft) + " - " + (mode.charAt(0).toUpperCase()
  + mode.slice(1)) + " | POMO"; 
            //Reduces the time left by a second every second
            interval = setInterval(() => {
                setTimeLeft(prevTime => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            // Play sound queue when its done
            playBeep();
            clearInterval(interval);
            setIsRunning(false);

            if (mode == "focus") {
                setMode('relax');
                setTimeLeft(configuredRelaxTime); // Reset to relax time
            } else {
                setMode('focus');
                setTimeLeft(configuredTime); // Reset to focus time
            }
        }
        return () => clearInterval(interval);
    }, [isRunning, timeLeft, mode]);

    useEffect(() => {
        const container = document.getElementById('container');
        const statusText = document.getElementById('statusText');
        if (!container) return;
        if (!statusText) return;

        container.classList.remove('bg-leaf');
        container.classList.remove('bg-onyx');
        container.classList.remove('bg-tomato');

        if (isRunning && mode == "focus") {

            //If in focus mode, changes the background to red
            container.classList.add('bg-tomato');
            statusText.textContent = "FOCUS";


        } else if (isRunning && mode == "relax") {

            //If in relax mode, changes the background to green
            statusText.textContent = "RELAX";
            container.classList.add('bg-leaf');

        } else {

            //If paused, changes back to black
            statusText.textContent = "POMO";
            document.title = "POMO | A Pomodoromo Timer"; 
            container.classList.add('bg-onyx');

        }

    }, [isRunning, mode]);

    const formatTime = (seconds: number) => {
        // Calculates the Minutes and Seconds and add a 0 before if it's lower than 10
        const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
        const remainingSeconds = String(timeLeft % 60).padStart(2, "0");
        return `${minutes}:${remainingSeconds}`;
    };

    const handleStartPause = () => {
        setIsRunning(!isRunning);
    };

    const handleReset = () => {
        setIsRunning(false);
        setTimeLeft(configuredTime); // Reset to focus time
        if (mode == "focus") {
            setTimeLeft(configuredTime); // Reset to focus time
        } else {
            setTimeLeft(configuredRelaxTime); // Reset to relax time
        }
    };



    return (
        <>
            <div className="container flex items-center justify-center text-whiteish m-auto mt-16 max-w-8xl px-4 sm:px-6 lg:px-8 py-12 text-center pt-0">
                <div className="grid grid-flow-col grid-rows-2 gap-4">
                    <div className="col-span-2 border-10 md:border-12">
                        <p className="font-russo max-w-sm text-8xl md:text-9xl  border-whiteish p-3">
                            {formatTime(timeLeft)}
                        </p>
                    </div>
                    <div onClick={handleStartPause} className="text-left text-xl">{isRunning ? 'PAUSE' : 'START'}</div>
                    <div onClick={handleReset} className="text-right text-xl">RESET</div>
                </div>
                <Config 
                    configuredTime={configuredTime}
                    setConfiguredTime={setConfiguredTime}
                    configuredRelaxTime={configuredRelaxTime}
                    setConfiguredRelaxTime={setConfiguredRelaxTime}
                    />
            </div>
        </>
    );
}
