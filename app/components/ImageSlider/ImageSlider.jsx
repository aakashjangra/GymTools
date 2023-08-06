import React, { useState } from 'react';
import styles from './ImageSlider.module.css';

const ImageSlider = ({ className: cName , images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const showNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const showPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className={`${styles.slider} ${cName}`}>
      <div className={styles.slides}>
        {images.map((image, index) => (
          <div
            key={index}
            className={index === currentIndex ? styles.slideActive : styles.slide}
          >
            <img src={image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>
      <button className={styles.prevBtn} onClick={showPrevSlide}>
        {`<`}
      </button>
      <button className={styles.nextBtn} onClick={showNextSlide}>
        {'>'}
      </button>
    </div>
  );
};

export default ImageSlider;
