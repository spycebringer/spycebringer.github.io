
// Global variables
/* WIDTH and HEIGHT should be divisible by SPRITE_SIZE for best visual */
// 640 = 20 cells(400 spaces)
export const WIDTH = window.innerWidth < 600 || window.innerHeight < 800 ? 320 : 640;
export const HEIGHT = WIDTH;
export const SPRITE_SIZE = 32;
export const COLS = WIDTH/SPRITE_SIZE;
export const ROWS = HEIGHT/SPRITE_SIZE;
export const MAX_BODY = (WIDTH/SPRITE_SIZE)*(HEIGHT/SPRITE_SIZE)-1;
export const ASSETSIZE = 4;
export const isMobile = navigator.userAgent.match(/Android/i,/webOS/i,/iPhone/i,/iPad/i,/iPod/i,/BlackBerry/i,/Windows Phone/i);