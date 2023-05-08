w= 1600
h = 2000
marg = 0

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


//declarations
bezPts = []
legNums = []


//parameters
numColors = 5//randomInt(3, 5)
numLayers = 30//randomInt(3, 10)
numPasses = 4//3//randomInt(3, 8)//randomInt(2, 6)
totalDis = 0.1
rotAmt = 360//1.4//randomVal(1, 5)
offAmt = 0.02//0.04//randomVal(0.005, 0.05)//totalDis/numPasses
fullness = 1000//randomInt(10, 30)
rot = 180*randomInt(0, 1)//randomVal(0, 360)

cloudSz = w*0.25//randomVal(w*0.15, w*0.333)
numLegs = 4

//populate leg array
for(let i = 0; i < fullness; i++) {
  numLegs[i] = randomInt(0, 4)
}

shuffLegs = shuff(legNums)

function setup() {
  var isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oraßn|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|verßi|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
    isMobile = true;
}
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
  g = createGraphics(w, h)
  angleMode(DEGREES)
  p.angleMode(DEGREES)
  c.angleMode(DEGREES)
  noLoop()
  p.noLoop()
  c.noLoop()
  // p.noSmooth()
  // c.noSmooth()

  center = createVector(randomVal(0, w), randomVal(0, h))
}

function draw() {
  background(bgc)
  p.background('white')
  c.background(80)
  c.translate(w/2, h/2)
  c.rotate(rot)
  c.translate(-w/2, -h/2)

  //Sketch

  //Build the gradient LUT
  gradLUT()
  //gradient background
  // gradBG()
  paintBG()

  //setting safe to draw area/cutout
  // cWave()
  // bezScrib()
  c.noStroke()
  // cShaper(w/2, h/2, w*0.9)
  // cSpotLight(w/2, h/2, w*0.5)
  
  // c.fill(200)
  // c.circle(randomVal(0, w), randomVal(0, h*0.333), 150)
  // for(let i = 0; i < 5; i++) {
  //   dis = map(i, 0, 5, 0.75, 0)
  //   val = map(i, 0, 5, 255, 0)
  //   c.fill(val)
  //   placard(dis)
  // }
  
  // //subject
  // centerX = w*0.5//randomVal(w*0.5, w*0.75)
  // xOff = 0//randomVal(-300, 300)
  // for(let i = 0; i < fullness; i++) {
    
    
  //   here = ptFromAng(centerX, h*0.5, randomVal(0, 360), randomVal(0, cloudSz))
  //   anchor = createVector(randomVal(centerX+(cloudSz*1.75), centerX-(cloudSz*1.75)), h)
  //   midAmt = randomVal(0.25, 0.85)
  //   midPt = createVector(randomVal(centerX+(cloudSz*1.5), centerX-(cloudSz*1.5)), map(midAmt, 0, 1, here.y, anchor.y))

  //   //raindrops
  //   // for(let i = 0; i < 5; i++) {
  //   //   // c.drawingContext.setLineDash([randomVal(100, 300), randomVal(100, 300)])
  //   //   xMod = randomVal(-10, 10)
  //   //   c.push()
  //   //   c.stroke(randomVal(150, 255))
  //   //   c.strokeWeight(randomVal(0.25, 1))
  //   //   // c.line(here.x+xMod, here.y, here.x+xMod+xOff, h)
  //   //   c.bezier(here.x, here.y, here.x, here.y, midPt.x, midPt.y, anchor.x, anchor.y, anchor.x, anchor.y)
  //   //   c.pop()
  //   // }
    

  //   //cloud
  //   c.fill(randomVal(180, 255))//180, 255
  //   cShaper(here.x, here.y, randomVal(100, w*0.25))    
    

  //   // there = ptFromAng(w/2, h/2, randomVal(180, 360), randomVal(0, w*0.1))
  //   // cShaper(here.x, here.y, randomVal(100, w*0.5))   
  // }

  
  //bg waves
  wave(60, 100)
  wave(120, 150)

  //ships
  for(let i = 0; i < 5; i++) {
    here = ptFromAng(w/2, h/2, randomVal(0, 360), randomVal(w*0.25, w*0.75))
    wid = randomVal(10, 50)
    hei = wid*2
    ship(here.x, here.y, wid, hei)
  }

  //final wave
  wave(180, 255)
   

  // for(let i = 0; i< 10; i++) {
  //   building()
  // }
 
  

  //draw design
  for(let i = 0; i < numLayers; i++) {
    p.push()
    p.translate(w/2, h/2)
    p.scale(1.25)
    p.rotate(map(i, 0, numLayers, 0, 360))
    p.translate(-w/2, -h/2)
    sineWave()
    p.pop()
    // p.fill(chroma('black').alpha(0.05).hex())
    // p.circle(w/2, h/2, randomVal(100, w/2))
  }
  


  //Post processing
  //  recur.copy(p, 0, 0, w, h, 0, 0, w, h)
   lastPass = false
   bgc = color(bgc)
   recur.shader(shade)
   shade.setUniform("u_resolution", [w, h]);
   shade.setUniform("p", p);
   shade.setUniform("g", g);
   shade.setUniform("c", c);
   shade.setUniform("offsetAmt", offAmt)
   shade.setUniform("rotAmt", rotAmt)
   shade.setUniform("offsetVals", randomInt(1, 5))
   shade.setUniform("center",[center.x/w, center.y/h]);
   shade.setUniform("seed", randomVal(0, 10));
   shade.setUniform("marg", map(marg, 0, w, 0, 1));
   shade.setUniform("lastPass", lastPass)
   shade.setUniform("angThisPass", randomVal(0, 1))
   shade.setUniform("bgc", [
     bgc.levels[0] / 255,
     bgc.levels[1] / 255,
     bgc.levels[2] / 255,
   ]);

   //recursive passes
   
   for(let i = 0; i < numPasses; i++) {//6
    if(i == 0) {
      firstPass = true
    } else {
      firstPass = false
    }
    shade.setUniform("firstPass", firstPass)
    // gradLUT()
    shade.setUniform("intens", 1)
    shade.setUniform("p", p)    
    dir = plusOrMin(1)
    shade.setUniform("dir", dir)
    recur.rect(0, 0, w, h)
    p.image(recur, 0, 0)
   }
   //final display
   lastPass = true
   shade.setUniform("lastPass", lastPass)
   shade.setUniform("p", p)
  //  shade.setUniform("g", p);
  //  shade.setUniform("g", p)
   recur.rect(0, 0, w, h)
   image(recur, -w/2, -h/2)

   
   


   fxpreview()

  //  setTimeout(() => {
  //   window.location.reload();
  // }, "1500");
}
