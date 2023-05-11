w= 1600
h = 2000
marg = 100

let shade;
function preload() {
  shade = loadShader("shader.vert", "shader.frag");
}
url = new URL(window.location.href)
urlParams = new URLSearchParams(url.search)
if(url.searchParams.has('size') == true) {
  pxSize = url.searchParams.get('size')
} else {
  url.searchParams.append('size', 1);
}
pxSize = url.searchParams.get('size')

//parameters
numLayers = 30
numPasses = 4
totalDis = 0.1
rotAmt = 360
offAmt = 0.02
fullness = 1200
rot = 180*randomInt(0, 1)
numShips = randomInt(1, 10)

if(rot == 180) {
  direction = "Above"
} else {
  direction = "Below"
}


$fx.features({
  "Palette": palName,
  "Origin": direction,
  "# Ships": numShips
})

function setup() {
  createCanvas(w, h, WEBGL);
  if(pxSize == 1) {
    pixelDensity(1)
  } else if (pxSize == 2) {
    pixelDensity(2)
  } else if (pxSize == 3) {
    pixelDensity(3)
  }
  recur = createGraphics(w, h, WEBGL)
  canv = createGraphics(w, h)
  p = createGraphics(w, h)
  c = createGraphics(w, h)
  b = createGraphics(w, h)
  g = createGraphics(w, h)
  angleMode(DEGREES)
  p.angleMode(DEGREES)
  c.angleMode(DEGREES)
  noLoop()
  p.noLoop()
  c.noLoop()
}

function draw() {
  background(bgc)
  p.background('white')
  c.background(0)

  //Sketch

  //Build the gradient LUT
  gradLUT()
  //gradient background
  gradBG()
  //cloudy texture
  paintBG()

  //bg waves
  c.noStroke()
  wave(81, 120)
  wave(120, 150)

  //ships
  shipPlacer()

  //final wave
  c.noStroke()
  wave(180, 255)

  //draw design to p
  for(let i = 0; i < numLayers; i++) {
    p.push()
    p.translate(w/2, h/2)
    p.scale(1.25)
    p.rotate(map(i, 0, numLayers, 0, 360))
    p.translate(-w/2, -h/2)
    sineWave()
    p.pop()
  }

  //if rotating image
  c.translate(w/2, h/2)
  c.rotate(rot)
  c.translate(-w/2, -h/2)
  c.image(c, 0, 0)


  //Post processing
   lastPass = false
   bgc = color(bgc)
   recur.shader(shade)
   shade.setUniform("u_resolution", [w, h]);
   shade.setUniform("pxSize", pxSize)
   shade.setUniform("p", p);
   shade.setUniform("g", g);
   shade.setUniform("c", c);
   shade.setUniform("offsetAmt", offAmt)
   shade.setUniform("rotAmt", rotAmt)
   shade.setUniform("offsetVals", randomInt(1, 5))
   shade.setUniform("seed", randomVal(0, 10));
   shade.setUniform("marg", map(marg, 0, w, 0, 1));
   shade.setUniform("lastPass", lastPass)
   shade.setUniform("rot", map(rot, 0, 360, 0, 6.28319))
   shade.setUniform("bgc", [
     bgc.levels[0] / 255,
     bgc.levels[1] / 255,
     bgc.levels[2] / 255,
   ]);

   //recursive passes
   for(let i = 0; i < numPasses; i++) {
    if(i == 0) {
      firstPass = true
    } else {
      firstPass = false
    }

    shade.setUniform("firstPass", firstPass)
    shade.setUniform("p", p)
    recur.rect(0, 0, w, h)
    p.image(recur, 0, 0)
   }

   //final display pass
   lastPass = true
   shade.setUniform("lastPass", lastPass)
   shade.setUniform("p", p)
   recur.rect(0, 0, w, h)
   image(recur, -w/2, -h/2)

   //render preview
   fxpreview()
}
