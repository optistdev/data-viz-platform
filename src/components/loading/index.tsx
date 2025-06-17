import ReactLottie from 'lottie-react';
import lottieLoading from './lottieLoading.json';

/**
 * Loading - A full-screen loading overlay with a centered Lottie animation.
 * Appears as a modal overlay with a blurred dark background.
 */
const Loading = () => {
  return (
    <div className="fixed z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center w-full h-screen">
      <div className="w-[150px]">
        <ReactLottie
          animationData={lottieLoading}
          loop
          autoplay
          className="w-full"
        />
      </div>
    </div>
  );
};

export default Loading;
