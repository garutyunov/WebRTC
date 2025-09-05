import { useState } from 'react';

interface CopyState {
  [key: string]: boolean;
}

export const useCopyIndication = () => {
  const [copyStates, setCopyStates] = useState<CopyState>({});

  const copyWithIndication = async (text: string, key: string = 'default') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyStates(prev => ({ ...prev, [key]: true }));
      setTimeout(() => {
        setCopyStates(prev => ({ ...prev, [key]: false }));
      }, 2000);
      return true;
    } catch (error) {
      console.error('Failed to copy:', error);
      return false;
    }
  };

  const isCopied = (key: string = 'default') => copyStates[key] || false;

  return { copyWithIndication, isCopied };
};

export default useCopyIndication;
