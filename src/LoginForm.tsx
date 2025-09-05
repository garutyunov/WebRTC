import React, { useState } from 'react';
import styles from './LoginForm.module.scss';

interface LoginFormProps {
  onLogin: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Функция для простого кодирования пароля
  const encodePassword = (pass: string): string => {
    return btoa(pass + 'secret_salt').slice(0, 12);
  };

  // Закодированная версия "444VAO"
  const encodedCorrectPassword = encodePassword('1234'); // "NDQ0VkFPc2"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const encodedInput = encodePassword(password);
    
    if (encodedInput === encodedCorrectPassword) {
      onLogin();
    } else {
      setError('Invalid password. Please try again.');
      setPassword('');
    }
  };

  return (
    <div className={styles['login-container']}>
      <div className={styles['login-card']}>
        <form onSubmit={handleSubmit}>
          {error && <div className={styles['error-message']}>{error}</div>}
          <input
            className={styles.input}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className={styles.button} type="submit" disabled={!password}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
