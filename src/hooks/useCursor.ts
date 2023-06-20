import { UserInput } from '@/hooks/usePrompter';
import { MutableRefObject, useEffect, useRef } from 'react';

function useCursor(userInput: UserInput): {
  cursorRef: MutableRefObject<HTMLDivElement | null>;
  characterRef: MutableRefObject<HTMLSpanElement | null>;
} {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const characterRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    function updateCursorPosition() {
      const cursor = cursorRef?.current;
      const character = characterRef?.current;

      if (!cursor) return;

      // Hide cursor when character ref points to `null`
      if (!character) {
        cursor.style.display = 'none';
        return;
      }

      // Update cursor position
      const newPosition = character.getBoundingClientRect();
      cursor.style.display = 'block';
      cursor.style.height = `${newPosition.height - 8}px`;
      cursor.style.transform = `translate3d(${newPosition.left - 2}px, ${
        newPosition.top + 4
      }px, 0px)`;
    }

    updateCursorPosition();

    // Update cursor position on resize
    const resizeObserver = new ResizeObserver(updateCursorPosition);
    resizeObserver.observe(document.body);

    return () => {
      resizeObserver.disconnect();
    };
  }, [userInput]);

  return { characterRef, cursorRef };
}

export default useCursor;
