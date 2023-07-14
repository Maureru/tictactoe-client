const Duration = {
  veryFast: 0.3,
  fast: 0.6,
  normal: 0.8,
  slow: 1.2,
  verySlow: 1.8,
};
const easing = [0.6, -0.05, 0.01, 0.99];

const scale = {
  initial: {
    scale: 0,
    opacity: 0,
  },
  up: {
    opacity: [0, 1],
    scale: [0, 1],
    transition: {
      duration: Duration.verySlow,
      ease: easing,
    },
  },
  down: {
    opacity: [0, 1],
    scale: [1, 0],
    transition: {
      duration: Duration.verySlow,
      ease: easing,
    },
  },
};

const homeHero = {
  hide: {
    y: ['0%', '-20%', '130%'],
    opacity: [1, 0],

    transition: {
      duration: Duration.fast,
      ease: easing,
    },
  },
  show: {
    y: ['130%', '-10%', '0%'],
    opacity: [1],
    transition: {
      duration: Duration.veryFastfast,
      ease: easing,
      delay: 1,
    },
  },
};

const gameHero = {
  initial: {
    opacity: 0,
  },
  hide: {
    y: ['0%', '-10%', '130%'],
    opacity: [1, 0],
    transition: {
      duration: Duration.fast,
      ease: easing,
    },
  },
  show: {
    y: ['130%', '-10%', '0%'],
    opacity: [0, 1],
    transition: {
      duration: Duration.fast,
      ease: easing,
      delay: 0.5,
    },
  },
};

const gameData = {
  hide: {
    x: ['0%', '20%', '-150%'],
    opacity: [1, 0],
    transition: {
      duration: Duration.fast,
      ease: easing,
    },
  },
  show: {
    x: ['-150%', '20%', '0%'],
    opacity: [0, 1],
    transition: {
      duration: Duration.fast,
      ease: easing,
      delay: 1,
    },
  },
};
const gameDataMobile = {
  hide: {
    x: ['0%', '20%', '-150%'],
    opacity: [1, 0],
    transition: {
      duration: Duration.fast,
      ease: easing,
    },
  },
  show: {
    x: ['-150%', '20%', '0%'],
    opacity: [0, 1],
    transition: {
      duration: Duration.fast,
      ease: easing,
      delay: 0.2,
    },
  },
};

const playerScore = {
  hide: {
    x: ['0%', '20%', '-180%'],
    opacity: [1],
    transition: {
      duration: Duration.fast,
      ease: easing,
    },
  },
  show: {
    x: ['-180%', '20%', '0%'],
    opacity: [0, 1],
    transition: {
      duration: Duration.fast,
      ease: easing,
      delay: 1,
    },
  },
};

const playersModal = {
  initial: {
    y: 50,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: Duration.normal,
      ease: easing,
    },
  },
};

const developer = {
  show: {
    x: '-50%',
    opacity: 1,
    transition: {
      duration: Duration.normal,
      ease: easing,
    },
  },
  hide: {
    x: -500,
    opacity: 0,
    transition: {
      duration: Duration.normal,
      ease: easing,
    },
  },
};

export {
  developer,
  scale,
  homeHero,
  gameData,
  gameDataMobile,
  gameHero,
  playerScore,
  playersModal,
};
