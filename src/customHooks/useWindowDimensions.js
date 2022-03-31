// import { useState, useEffect } from "react";

import { useEffect,  useState } from "react";

const getWindowDimensions = () => {
  const { innerHeight: height, innerWidth: width } = window;
  return [height, width];
}

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimenstions] = useState(getWindowDimensions());

  function handleResize() {
    setWindowDimenstions(getWindowDimensions());

  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

export default useWindowDimensions;