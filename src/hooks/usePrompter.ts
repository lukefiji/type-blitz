import { RETURN_DISPLAY_KEY, VALID_KEYS } from '@/constants/keys';
import { KeyboardEvent, useCallback } from 'react';
import { useImmerReducer } from 'use-immer';

export type CharData = {
  char: string;
  index: number;
};
export type PromptData = Array<CharData>;
export type UserInput = Array<string>;

type PromptState = {
  promptData: PromptData;
  userInput: UserInput;
  numErrors: number;
  inputLength: number;
};

enum ActionTypes {
  keyDown = 'TYPE',
}

type PromptAction = {
  type: ActionTypes;
  payload: string;
};

function promptReducer(draft: PromptState, action: PromptAction) {
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
    default: {
      break;
    }
  }
}

const initialPromptState = {
  prompt: [],
  userInput: [],
  numErrors: 0,
  inputLength: 0,
};

function getInitialPromptState(message: string): PromptState {
  // Split message into array of characters
  const trimmedMessage = message.trim().split('');

  // Convert each character into PromptChar[]
  const promptData: PromptData = trimmedMessage.map((char, index) => ({
    char,
    index,
  }));

  // Add enter key at end of string
  promptData.push({
    char: RETURN_DISPLAY_KEY,
    index: promptData.length,
  });

  return { ...initialPromptState, promptData };
}

function usePrompter(message: string): {
  promptData: PromptData;
  userInput: UserInput;
  numErrors: number;
  handleKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
} {
  const [{ promptData, userInput, numErrors }, dispatch] = useImmerReducer(
    promptReducer,
    initialPromptState,
    () => getInitialPromptState(message)
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) =>
      dispatch({ type: ActionTypes.keyDown, payload: e.key }),
    [dispatch]
  );

  return { promptData, userInput, numErrors, handleKeyDown };
}

export default usePrompter;
