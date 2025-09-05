import React from 'react';
import useCopyIndication from '../hooks/useCopyIndication';
import styles from './CopyButton.module.scss';

interface CopyButtonProps {
  text: string;
  buttonText?: string;
  copiedText?: string;
  copyKey?: string;
  className?: string;
  style?: React.CSSProperties;
  size?: 'small' | 'medium' | 'large';
}

const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  buttonText = 'Copy',
  copiedText = 'Copied',
  copyKey = 'default',
  className = '',
  style = {},
  size = 'medium'
}) => {
  const { copyWithIndication, isCopied } = useCopyIndication();
  const copied = isCopied(copyKey);

  const handleCopy = () => {
    copyWithIndication(text, copyKey);
  };

  return (
    <button
      className={`${styles['copy-button']} ${styles[size]} ${copied ? styles.copied : ''} ${className}`}
      onClick={handleCopy}
      style={style}
    >
      <span className={styles.icon}>
        {copied ? '✓' : '📋'}
      </span>
      <span className={styles.text}>
        {copied ? copiedText : buttonText}
      </span>
    </button>
  );
};

export default CopyButton;
