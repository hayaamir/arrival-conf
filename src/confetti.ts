import confetti from "canvas-confetti";

export const DURATION = 3 * 1000;

const DEFAULT_CONFETTI_PARAMS = {
  startVelocity: 30,
  spread: 360,
  ticks: 60,
  zIndex: 0,
};

function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function getRandomOrigin(from: number, to: number) {
  return { x: randomInRange(from, to), y: Math.random() - 0.2 };
}

export function getParticleCount(timeLeft: number) {
  return 50 * (timeLeft / DURATION);
}

export function doConfetti(particleCount: number, from: number, to: number) {
  confetti({
    ...DEFAULT_CONFETTI_PARAMS,
    particleCount,
    origin: getRandomOrigin(from, to),
  });
}
