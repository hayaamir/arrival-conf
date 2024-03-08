import { useEffect } from "react";

import { DURATION, doConfetti, getParticleCount } from "../helpers/confetti";
import Card from "../components/Card";
import Form from "../components/Form";
import Footer from "../components/Footer";

function App() {
  useEffect(() => {
    const animationEnd = Date.now() + DURATION;

    const interval: NodeJS.Timeout = setInterval(() => {
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
        className="bg-cover flex justify-center items-cente"
        style={{ backgroundImage: `url('./background.png')` }}
      >
        <div className="max-w-lg bg-white/60">
          <figure>
            <img src="YH.png" alt="Yosi and Chaya" />
          </figure>
          <div className="card bg-white/50 rounded-none">
            <div className="card-dody px-16 pb-16">
              <Card />
              <Form />
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
