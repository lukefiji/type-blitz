import { UserInput } from '@/hooks/usePrompter';
import { MutableRefObject, useEffect, useRef, useState } from 'react';

type CursorPosition = {
  display: 'none' | 'block';
  top: number;
  left: number;
  height: number;
};

function useCursor(userInput: UserInput): {
  cursorRef: MutableRefObject<HTMLDivElement | null>;
  characterRef: MutableRefObject<HTMLSpanElement | null>;
  cursorPosition: CursorPosition;
} {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const characterRef = useRef<HTMLSpanElement | null>(null);
  const [cursorPosition, setCursorPosition] = useState<CursorPosition>({
    display: 'none',
    top: 0,
    left: 0,
    height: 0,
  });

  useEffect(() => {
    function updateCursorPosition() {
      const character = characterRef?.current;
      const cursor = cursorRef?.current;
      if (!character) {
        setCursorPosition({
          display: 'none',
          top: 0,
          left: 0,
          height: 0,
        });
        return;
      }

      const newPosition = character.getBoundingClientRect();

      setCursorPosition({
        display: 'block',
        top: newPosition.top,
        left: newPosition.left - 2,
        height: newPosition.height,
      });
    }
    updateCursorPosition();

    const resizeObserver = new ResizeObserver(updateCursorPosition);
    resizeObserver.observe(document.body);

    return () => {
      resizeObserver.disconnect();
    };
  }, [userInput]);

  return { characterRef: characterRef, cursorPosition };
}

export default useCursor;
