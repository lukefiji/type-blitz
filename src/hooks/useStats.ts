import { UserInput } from '@/hooks/usePrompter';
import { useCallback, useEffect, useMemo, useState } from 'react';

const ONE_MINUTE = 60;
const AVERAGE_PER_WORD = 5;

interface Props {
  userInput: UserInput;
  numErrors: number;
}

type UseStatsReturn = {
  wordsPerMinute: number;
  accuracy: number;
  resetTimer: VoidFunction;
};

function useStats({ userInput, numErrors }: Props): UseStatsReturn {
  const [timer, setTimer] = useState<number>(() => Date.now());
  const [timerStarted, setTimerStarted] = useState<boolean>(false);

  useEffect(() => {
    if (timerStarted || userInput.length === 0) return;
    setTimerStarted(true);
    setTimer(Date.now());
  }, [userInput, timerStarted]);

  // To calculate WPM, take the number of words typed
  // in a minute without typos and divide by five
  const wordsPerMinute = useMemo(() => {
    const secondsElapsed = (Date.now() - timer) / 1000;

    const inputWithoutErrors = userInput.length - numErrors;
    const wordsInElapsedTime = inputWithoutErrors / AVERAGE_PER_WORD;

    const wpmInElapsedTime = Number(
      ((ONE_MINUTE / secondsElapsed) * wordsInElapsedTime).toFixed(2)
    );

    return !isNaN(wpmInElapsedTime) ? wpmInElapsedTime : 0;
  }, [userInput, numErrors, timer]);

  // Number of correct characters typed divided
  // by the total number, then multiply by 100
  const accuracy = useMemo(() => {
    const inputLength = userInput.length;
    const totalInput = numErrors + inputLength;
    const runningAccuracy = Math.round((inputLength / totalInput) * 100);
    return !isNaN(runningAccuracy) ? runningAccuracy : 100;
  }, [userInput, numErrors]);

  const resetTimer = useCallback(() => {
    setTimerStarted(false);
  }, []);

  return { wordsPerMinute, accuracy, resetTimer };
}

export default useStats;
