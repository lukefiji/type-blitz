import { RETURN_DISPLAY_KEY, VALID_KEYS } from '@/constants/keys';
import { KeyboardEvent, useCallback } from 'react';
import { useImmerReducer } from 'use-immer';

export type CharData = {
  char: string;
  index: number;
};
export type PromptData = Array<CharData>;
export type SentenceData = Array<PromptData>;
export type UserInput = Array<string>;

type PromptState = {
  promptData: PromptData;
  sentenceData: SentenceData;
  userInput: UserInput;
  numErrors: number;
  inputLength: number;
};

enum ActionTypes {
  keyDown = 'TYPE',
  reset = 'RESET',
}

type KeyDownAction = {
  type: ActionTypes.keyDown;
  payload: string;
};

type ResetAction = {
  type: ActionTypes.reset;
  payload: string;
};

type PromptActions = KeyDownAction | ResetAction;

function promptReducer(draft: PromptState, action: PromptActions) {
  switch (action.type) {
    case ActionTypes.keyDown: {
      const key = action.payload;

      if (!VALID_KEYS.has(key)) {
        break;
      }

      // Handle backspace
      if (key === 'Backspace') {
        draft.userInput.pop();
        break;
      }

      if (draft.userInput.length >= draft.promptData.length) {
        break;
      }

      // Handle all other valid keys
      const charIdx = draft.userInput.length;

      // Handle enter
      if (key === 'Enter') {
        // Increment errors if invalid
        if (draft.promptData[charIdx].char !== RETURN_DISPLAY_KEY) {
          draft.numErrors += 1;
        }
        draft.userInput.push(RETURN_DISPLAY_KEY);
        break;
      }

      // Increment errors if invalid
      if (draft.promptData[charIdx].char !== key) {
        draft.numErrors += 1;
      }

      draft.userInput.push(key);
      break;
    }
    case ActionTypes.reset: {
      return getInitialPromptState(action.payload);
    }
    default: {
      break;
    }
  }
}

const initialPromptState: PromptState = {
  sentenceData: [],
  promptData: [],
  userInput: [],
  numErrors: 0,
  inputLength: 0,
};

function getInitialPromptState(message: string): PromptState {
  const sentences = message
    .split('\n')
    .filter(Boolean)
    .map((text) => text.trim().split('').filter(Boolean));
  let counter = 0;
  const sentenceData = sentences.map((sentence) => {
    const newSentence = sentence.map((char) => ({
      char,
      index: counter++,
    }));

    // Add enter key at end of sentence
    newSentence.push({
      char: RETURN_DISPLAY_KEY,
      index: counter++,
    });

    return newSentence;
  });

  const promptData = sentenceData.flat();

  return {
    ...initialPromptState,
    sentenceData,
    promptData,
  };
}

function usePrompter(message: string): {
  sentenceData: SentenceData;
  userInput: UserInput;
  numErrors: number;
  resetPrompter: VoidFunction;
  handleKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
} {
  const [{ sentenceData, userInput, numErrors }, dispatch] = useImmerReducer(
    promptReducer,
    initialPromptState,
    () => getInitialPromptState(message)
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) =>
      dispatch({ type: ActionTypes.keyDown, payload: e.key }),
    [dispatch]
  );

  const resetPrompter = useCallback(() => {
    dispatch({ type: ActionTypes.reset, payload: message });
  }, [dispatch, message]);

  return {
    sentenceData,
    userInput,
    numErrors,
    handleKeyDown,
    resetPrompter,
  };
}

export default usePrompter;
