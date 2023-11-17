title = "Enlightenment";

description = `
[Tap] up
`;

characters = [
  `
  llll
 lll
lll
lll
 lll
  llll
`,
  `
  lll
 lllll
lll
lll
 lllll
  lll
`,
  `
  ll
 llll
llllll
llllll
 llll
  ll
`,
  `
ll  ll
llllll
ll  ll
`,
  `
ll  ll
llllll
ll  ll
`,
  `
ll
ll
`,
  `
 lll
lll l
l lll
 lll
`,
  `
 lll 
  l
  l
  l
lllll
lllll
`,
];

options = {
  theme: "dark",
  viewSize: { x: 100, y: 50 },
  isPlayingBgm: false,
  isReplayEnabled: true,
  seed: 9,
};

/** @type {{x: number, vx: number}} */
let player;
/** @type {{x: number, eyeVx: number}} */
let enemy;
/** @type {{x: number, isPower: boolean}[]} */
//let dots;
let powerTicks;
let animTicks;
let ypos;
let speed1;
let speed2;
let speed3;
let foodx;
let exerx;
let foody;
let exery;
let gamex;
let gamey;
let get;


function update() {
  if (!ticks) {
    player = { x: 20, vx: 0 };
    enemy = { x: 100, eyeVx: 0 };
    //addDots();
    ypos=[19,30,41];
    powerTicks = animTicks = 0;
    exerx=100
    foodx=100
    gamex=100
    speed1=Math.random()*0.5+0.2
    speed2=Math.random()*0.5+0.2
    speed3=Math.random()*0.5+0.2
    foody=19
    exery=30
    gamey=41
    get=floor(Math.random()*3)
  }
  animTicks += difficulty;
  color("black");
  if(get==0){
    text('gains',3,10);
  }else if(get==1){
    text('hungry',3,10);
  }else{
    text('bored',3,10);
  }
  //text('pacman is deadge',0,45);
  if (input.isJustPressed) {
    if(player.vx<2){
        player.vx+=1;
    }else{
        player.vx=0
    }
  }
  color("blue");
  rect(0, 14, 100, 1);
  rect(0, 23, 100, 1);
  rect(0, 25, 100, 1);
  rect(0, 34, 100, 1);
  rect(0, 36, 100, 1);
  rect(0, 45, 100, 1);
  color("yellow");
  const ai = floor(animTicks / 7) % 4;
  char(addWithCharCode("a", ai === 3 ? 1 : ai), player.x, ypos[player.vx], {
    // @ts-ignore
    mirror: { x: player.vx },
  });
  exerx-=speed1;
  foodx-=speed2;
  gamex-=speed3;
  if(exerx<0){
    exerx=100;
    speed1=Math.random()*0.5+0.2
    exery=floor(Math.random()*3)
    exery=ypos[exery]
  }
  if(foodx<0){
  foodx=100
  speed2=Math.random()*0.5+0.2
  foody=floor(Math.random()*3)
  foody=ypos[foody]
  }
  if(gamex<0){
    gamex=100
    speed3=Math.random()*0.5+0.2
    gamey=floor(Math.random()*3)
    gamey=ypos[gamey]
  }
  
  color(
    "red"
  );
  const c = char(
    addWithCharCode("d", 1),
    exerx,
    exery
  ).isColliding.char;
  color("red");
  const d = char(
    addWithCharCode("f",1),
    foodx,
    foody
  ).isColliding.char;
  const e = char(
    addWithCharCode("g",1),
    gamex,
    gamey
  ).isColliding.char;
  if (enemy.eyeVx === 0 && (c.a || c.b || c.c)) {
      if(get!=0){
      play("explosion");
      end();
      }else{
        exerx=-100
        get=floor(Math.random()*3)
        addScore(1);
      }
  }
  if (enemy.eyeVx === 0 && (d.a || d.b || d.c)) {
    if(get!=1){
    play("explosion");
    end();
    }else{
        foodx=-100
        get=floor(Math.random()*3)
        addScore(1);
      }
}
if (enemy.eyeVx === 0 && (e.a || e.b || e.c)) {
    if(get!=2){
    play("explosion");
    end();
    }else{
        gamex=-100
        get=floor(Math.random()*3)
        addScore(1);
    }
}
}
