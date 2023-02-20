export const INTERVAL = 10;
export const CANVAS_HEIGHT_MOBILE = 520;
export const CANVAS_HEIGHT = 640;

// clouds
export const PLANETS = new Image();
PLANETS.src = './images/flappy-degen/background.png';
export const CLOUDS_HEIGHT = 280;
export const CLOUDS_WIDTH = 300;
export const CLOUDS_X = 0;
export const CLOUDS_Y = 0;

// bird
export const BIRD = new Image();
BIRD.src = './images/flappy-degen/bird.svg';
export const BIRD_HEIGHT = 65;
export const BIRD_WIDTH = 65;

export const BIRD_FLYING_START = new Image();
BIRD_FLYING_START.src = './images/flappy-degen/bird-flying-start.svg';

export const BIRD_IS_FLYING = new Image();
BIRD_IS_FLYING.src = './images/flappy-degen/bird-is-flying.svg';

export const BIRD_ALMOST_DONE_FLYING = new Image();
BIRD_ALMOST_DONE_FLYING.src =
  './images/flappy-degen/bird-almost-done-flying.svg';

export const BIRD_FLYING_DONE = new Image();
BIRD_FLYING_DONE.src = './images/flappy-degen/bird-flying-done.svg';

// ground
export const GROUND = new Image();
GROUND.src = './images/flappy-degen/ground.png';
export const GROUND_HEIGHT = 110;
export const HEIGHT_GROUND = 100;
export const GROUND_Y = CANVAS_HEIGHT - GROUND_HEIGHT;
export const PIPE_HEIGHT = CANVAS_HEIGHT / 2;
export const PIPE_GAP = 150;

// pipes
export const PIPE = new Image();
PIPE.src = './images/flappy-degen/obstacle.png';
// pipes
export const PIPE_REVERSED = new Image();
PIPE_REVERSED.src = './images/flappy-degen/obstacleReversed.png';
export const PIPE_WIDTH = 60;

// movements
export const JUMP_SPEED = -280;
export const FALL_SPEED = -900;
export const SPEED = 2;
