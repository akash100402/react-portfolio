import React, { useState, useEffect } from 'react';
import { getImageUrl } from '../../utils';
import styles from './Hero.module.css';
import myResume from '../../../assets/resume.pdf';

export const Hero = () => {
  const openPdfInNewWindow = () => {
    window.open(myResume, '_blank');
  };

  const roles = ['Fullstack Developer', 'UI Designer'];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentRoleText, setCurrentRoleText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const role = roles[currentRoleIndex];
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex <= role.length) {
        setCurrentRoleText(role.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsTyping(false);

        setTimeout(() => {
          setIsTyping(true);
          // Ensure the next role is different from the current one
          let nextRoleIndex = currentRoleIndex;
          while (nextRoleIndex === currentRoleIndex) {
            nextRoleIndex = Math.floor(Math.random() * roles.length);
          }
          setCurrentRoleIndex((currentRoleIndex + 1) % roles.length);
        }, 2000); // Delay before switching to the next role
      }
    }, 200); // Typing speed (adjust as needed)

    return () => clearInterval(typingInterval);
  }, [currentRoleIndex, isTyping]);

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          Hi I'm Akash <br /><span className={styles.span}>I'm a</span><span className={styles.role}> {currentRoleText}</span>
        </h1>
        <p className={styles.description}>
          I am a skilled MERN Stack Developer with a passion for crafting dynamic and user-centric web applications. My objective is to leverage my expertise in MongoDB, Express.js, React, and Node.js to build innovative, high-performance, and scalable web solutions that meet and exceed the needs of clients and end-users.
        </p>
        <div className={styles.btns}>
          <a href="mailto:aakash10aj@gmail.com" className={styles.contactBtn}>
            Contact me
          </a>
          <button onClick={openPdfInNewWindow} className={styles.contactBtn}>
            View Resume
          </button>
        </div>
      </div>
      <img
        src={getImageUrl('hero/heroImage.png')}
        alt="Profile-Photo"
        className={styles.heroImg}
      />
      <div className={styles.topBlur} />
      <div className={styles.bottomBlur} />
    </section>
  );
};
