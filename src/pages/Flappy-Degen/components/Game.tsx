import { useEffect, useRef, useState } from 'react';
import useEventListener from '@use-it/event-listener';
import EndDialog from './EndDialog';
import StartDialog from './StartDialog';
import { useWallet } from '@solana/wallet-adapter-react';
import {
  GROUND_HEIGHT,
  HEIGHT_GROUND,
  BIRD_WIDTH,
  BIRD_HEIGHT,
  PIPE_WIDTH,
  JUMP_SPEED,
  PLANETS,
  GROUND,
  BIRD,
  BIRD_FLYING_START,
  BIRD_IS_FLYING,
  BIRD_ALMOST_DONE_FLYING,
  BIRD_FLYING_DONE,
  PIPE_REVERSED,
  PIPE,
  SPEED,
  INTERVAL,
  FALL_SPEED
} from './constants';

let score = 0;
let bestScore = parseInt(localStorage.getItem('bestScore') || '0');

const checkCollision = (circle: any, rect: any) => {
  if (
    circle.x + circle.radius >= rect.x &&
    circle.x - circle.radius <= rect.x + rect.width
  ) {
    if (
      circle.y < 0 ||
      (circle.y + circle.radius >= rect.y &&
        circle.y - circle.radius <= rect.y + rect.height)
    ) {
      return true;
    }
  }
  return false;
};

const Game = () => {
  let hasStarted = useRef(false);
  let hasFinished = useRef(false);
  const { publicKey } = useWallet();
  const user = publicKey?.toString();
  const [startDialog, setStartDialog] = useState(!user);

  // TODO: If you comment next line, game will work

  const [screenSize, getDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  const setDimension = () => {
    getDimension({ width: window.innerWidth, height: window.innerHeight });
  };

  useEffect(() => {
    window.addEventListener('resize', setDimension);

    return () => {
      window.removeEventListener('resize', setDimension);
    };
  }, [screenSize]);

  const [showModal, setShowModal] = useState(false);
  const canvas = useRef(null);

  // Calculate obstacles
  const canvasWidth = screenSize.width;
  const canvasHeight = screenSize.height;

  const obstacleDistance = 300;
  const obstaclesCount = Math.ceil(canvasWidth / obstacleDistance);

  // ground

  const groundY = canvasHeight - GROUND_HEIGHT;

  const pipeGap = 200;
  let groundX = 0;

  // bird
  let birdX = 150;
  let birdY = 220;
  const birdYSpeed = useRef(0);

  const birdImage = useRef(BIRD);

  const fly = () => {
    if (birdYSpeed.current >= 0) {
      birdImage.current = BIRD;
    } else if (birdYSpeed.current < 0 && birdYSpeed.current > -30) {
      birdImage.current = BIRD_FLYING_START;
    } else if (birdYSpeed.current < -30 && birdYSpeed.current > -60) {
      birdImage.current = BIRD_IS_FLYING;
    } else if (birdYSpeed.current < -60 && birdYSpeed.current > -90) {
      birdImage.current = BIRD_ALMOST_DONE_FLYING;
    } else {
      birdImage.current = BIRD_FLYING_DONE;
    }
  };

  let speedIncrementor = 0;

  // obstacles
  const obstacles: Array<{
    obstacleX: number;
    gap: number;
    canGetScore: boolean;
  }> = [];

  console.log(obstaclesCount);
  for (let i = 0; i < obstaclesCount; i++) {
    const randomize = Math.round(Math.random());
    const obstacle = {
      obstacleX: canvasWidth + obstacleDistance * i,
      gap: randomize
        ? pipeGap + Math.floor(Math.random() * pipeGap)
        : pipeGap - Math.floor(Math.random() * pipeGap),
      canGetScore: true
    };
    obstacles.push(obstacle);
  }

  // check if bird has touched a pipe
  const touchedPipe = () => {
    const birdHitbox = {
      x: birdX + BIRD_WIDTH / 2,
      y: birdY + BIRD_HEIGHT / 2 + 5,
      radius: 20
    };

    const resultArray = obstacles.map(({ obstacleX, gap }) => {
      const upperPipe = {
        x: obstacleX,
        y: 0,
        width: PIPE_WIDTH,
        height: gap
      };

      const lowerPipe = {
        x: obstacleX,
        y: gap + pipeGap,
        width: PIPE_WIDTH,
        height: canvasHeight - HEIGHT_GROUND - (gap + pipeGap)
      };

      return (
        checkCollision(birdHitbox, upperPipe) ||
        checkCollision(birdHitbox, lowerPipe)
      );
    });

    return resultArray.includes(true);
  };

  // check if bird has touched the ground
  const fallOut = () => birdY + BIRD_HEIGHT > canvasHeight - HEIGHT_GROUND;

  // stop game
  const reset = () => {
    hasStarted.current = false;
    hasFinished.current = true;
  };

  // bird jump
  const jump = () => {
    if (hasFinished.current) {
      return;
    }

    if (!hasStarted.current) {
      hasStarted.current = true;
    }
    birdYSpeed.current = JUMP_SPEED;
  };

  // enable space button
  const handler = (key: any) => {
    if (hasFinished.current || !user) {
      return;
    }
    if (key.code === 'Space') {
      if (!hasStarted.current) {
        hasStarted.current = true;
      }
      jump();
    }
  };

  useEventListener('keypress', handler);

  const draw = (context: any) => {
    // draw background
    context.drawImage(PLANETS, 0, 0, canvasWidth, canvasHeight);

    context.drawImage(GROUND, groundX, groundY, canvasWidth, GROUND_HEIGHT);
    context.drawImage(
      GROUND,
      groundX + canvasWidth,
      groundY,
      canvasWidth,
      GROUND_HEIGHT
    );

    // // draw bird
    context.drawImage(birdImage.current, birdX, birdY, BIRD_WIDTH, BIRD_HEIGHT);

    if (!hasStarted.current && !hasFinished.current) {
      context.fillStyle = 'white';
      context.font = '24px Jost Regular';
      context.textAlign = 'left';
      context.fillText('Press space, click or tap', canvasWidth / 2 - 100, 50);
    }
    // TRY TO RENDER OBSTACLES

    obstacles.map(({ obstacleX, gap }) => {
      context.drawImage(PIPE_REVERSED, obstacleX, 0, PIPE_WIDTH, gap);
      context.drawImage(
        PIPE,
        obstacleX,
        gap + pipeGap,
        PIPE_WIDTH,
        canvasHeight - HEIGHT_GROUND - (gap + pipeGap)
      );
    });
  };

  useEffect(() => {
    if (canvas.current) {
      const context = (canvas.current as any).getContext('2d');
      if (context) {
        setInterval(() => {
          // dying
          if (touchedPipe() || fallOut()) {
            if (score > bestScore) {
              bestScore = score;
              localStorage.setItem('bestScore', score.toString());
            }
            setShowModal(true);
            reset();
          }

          obstacles.map((obstacle) => {
            if (
              obstacle.canGetScore &&
              birdX > obstacle.obstacleX + PIPE_WIDTH
            ) {
              obstacle.canGetScore = false;
              score++;
            }
          });

          draw(context);

          if (!hasStarted.current) {
            return;
          }

          obstacles.map((obstacle, index) => {
            if (obstacle.obstacleX < -PIPE_WIDTH) {
              const previousIndex =
                index - 1 >= 0 ? index - 1 : obstaclesCount - 1;
              const previous = obstacles[previousIndex];
              let difference = 0;
              if (previous.obstacleX + obstacleDistance > canvasWidth) {
                difference =
                  previous.obstacleX + obstacleDistance - canvasWidth;
              }
              const randomize = Math.round(Math.random());
              obstacle.obstacleX = canvasWidth + difference;
              obstacle.gap = randomize
                ? pipeGap + Math.floor(Math.random() * pipeGap)
                : pipeGap - Math.floor(Math.random() * pipeGap);
              obstacle.canGetScore = true;
            }
          });

          // reset ground
          if (groundX <= -canvasWidth) {
            groundX = 0;
          }

          context.fillStyle = 'white';
          context.font = '40px Jost Regular';
          context.fillText(score.toString(), canvasWidth / 2 - 15, 50);

          obstacles.map(
            (obstacle) => (obstacle.obstacleX -= SPEED + speedIncrementor)
          );

          speedIncrementor = Number(Math.floor(score / 10) / 10);
          groundX -= SPEED + speedIncrementor;
          birdY += birdYSpeed.current * (INTERVAL / 1000);
          birdYSpeed.current -= FALL_SPEED * (INTERVAL / 1000);
          fly();
        }, INTERVAL);
      }
    }
  }, []);

  return (
    <>
      {!user ? (
        <StartDialog showDialog={startDialog} setStartDialog={setStartDialog} />
      ) : null}
      <div onClick={user ? jump : () => {}} onKeyDown={user ? jump : () => {}}>
        <canvas
          ref={canvas}
          width={canvasWidth}
          height={canvasHeight}
          className='canvas'
        />
        {user ? (
          <EndDialog
            showDialog={showModal}
            score={score}
            bestScore={bestScore}
            publicKey={user}
            setShowModal={setShowModal}
            setStartDialog={setStartDialog}
          />
        ) : null}
      </div>
    </>
  );
};

export default Game;
