import { useEffect } from "react";

import { DURATION, doConfetti, getParticleCount } from "./confetti";
import Card from "./Card";
import Form from "./Form";

function App() {
  useEffect(() => {
    const animationEnd = Date.now() + DURATION;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = getParticleCount(timeLeft);
      doConfetti(particleCount, 0.1, 0.3);
      doConfetti(particleCount, 0.7, 0.9);
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div
        className="bg-cover flex justify-center items-center"
        style={{ backgroundImage: `url('./background.png')` }}
      >
        <div className="max-w-lg">
          <figure>
            <img src="yosiHaya.png" alt="Yosi and Chaya" />
          </figure>
          <div className="card bg-white/50 rounded-none">
            <div className="card-dody px-16 pb-16">
              <Card />
              <Form />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
