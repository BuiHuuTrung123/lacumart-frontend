// hooks/useIntersectionObserver.js
import { useState, useEffect, useRef } from 'react';

const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Kiểm tra ngay lập tức xem element có trong viewport không
    const checkInitialPosition = () => {
      const rect = element.getBoundingClientRect();
      const isInViewport = (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0 &&
        rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
        rect.right >= 0
      );

      if (isInViewport && !hasAnimated) {
        setIsIntersecting(true);
        setHasAnimated(true);
        return true;
      }
      return false;
    };

    // Kiểm tra ngay khi component mount
    const isInitiallyVisible = checkInitialPosition();

    // Nếu không visible ngay lập tức, thì setup Intersection Observer
    if (!isInitiallyVisible) {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsIntersecting(true);
          setHasAnimated(true);
          observer.disconnect(); // Ngừng observe sau khi đã animate
        }
      }, {
        threshold: 0.1,
        rootMargin: '50px',
        ...options
      });

      observer.observe(element);

      return () => {
        if (element) {
          observer.unobserve(element);
        }
      };
    }
  }, [options, hasAnimated]);

  return [elementRef, isIntersecting];
};

export default useIntersectionObserver;