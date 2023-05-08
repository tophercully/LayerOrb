function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(fxrand() * (max - min + 1) + min); // The maximum is exclusive and the minimum is inclusive
}
function randomVal(min, max) {
  return fxrand() * (max - min) + min;
}
function map_range(value, low1, high1, low2, high2) {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}

function shuff(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(fxrand() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function setLineDash(list) {
  drawingContext.setLineDash(list);
}

function keyTyped() {
  if (key === "s" || key === "S") {
    save("img.png");
  }
  if (key === "1") {
    window.history.replaceState('', '', updateURLParameter(window.location.href, "size", "1"));
    window.location.reload();
  }
  if (key === "2") {
    window.history.replaceState('', '', updateURLParameter(window.location.href, "size", "2"));
    window.location.reload();
  }
  if (key === "3") {
    window.history.replaceState('', '', updateURLParameter(window.location.href, "size", "3"));
    window.location.reload();
  }
}
function updateURLParameter(url, param, paramVal)
{
    var TheAnchor = null;
    var newAdditionalURL = "";
    var tempArray = url.split("?");
    var baseURL = tempArray[0];
    var additionalURL = tempArray[1];
    var temp = "";

    if (additionalURL) 
    {
        var tmpAnchor = additionalURL.split("#");
        var TheParams = tmpAnchor[0];
            TheAnchor = tmpAnchor[1];
        if(TheAnchor)
            additionalURL = TheParams;

        tempArray = additionalURL.split("&");

        for (var i=0; i<tempArray.length; i++)
        {
            if(tempArray[i].split('=')[0] != param)
            {
                newAdditionalURL += temp + tempArray[i];
                temp = "&";
            }
        }        
    }
    else
    {
        var tmpAnchor = baseURL.split("#");
        var TheParams = tmpAnchor[0];
            TheAnchor  = tmpAnchor[1];

        if(TheParams)
            baseURL = TheParams;
    }

    if(TheAnchor)
        paramVal += "#" + TheAnchor;

    var rows_txt = temp + "" + param + "=" + paramVal;
    return baseURL + "?" + newAdditionalURL + rows_txt;
}

function randColor() {
  return chroma(truePal[randomInt(0, truePal.length-1)]).saturate(0).hex()
}

function angBetween(x1, y1, x2, y2) {
  return Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
}

function ptFromAng(xPosition, yPosition, ang, dis) {
  xMod = cos(ang)*dis
  yMod = sin(ang)*dis

  return createVector((xPosition+xMod), (yPosition+yMod))
}

function plusOrMin(x) {
  chance = fxrand() 
  if(chance < 0.5) {
    mod = 1
  } else {
    mod = -1
  }

  return x*mod
}
////////////////////////////////////////

function gradLUT() {
  scl = 200
  thisPal = ['black', truePal[0], truePal[1],'black']
    for(let y = 0; y < h; y+=w/scl) {
      nY = map(y, 0, h, 0, 1)
      // colScale = chroma.scale(truePal.slice(0, numColors))//.classes(20)
      colScale = chroma.scale(thisPal).padding([-0.8, 0.0])
      hueCol = colScale(nY).hex()
      col = hueCol
      g.stroke(col)
      g.strokeWeight(h/scl)
      g.line(0, y, w,y)
    }
}

function gridLut() {
  scl = 30
  for(let y = 0; y < 30; y+= h/30) {
      nY = randomVal(0, 1)//map(y, 0, h, 0, 1)
      colScale = chroma.scale(truePal.slice(0, numColors))//.classes(numColors)
      hueCol = colScale(nY).hex()
      col = hueCol
      g.stroke(col)
      g.strokeWeight(h/scl)
      // g.line(0, y, w,y)
      g.rect(w/2, y, w, h/30)
  }
}

function sineWave() {
  capDecider = randomInt(0, 1)
  if(capDecider == 0) {
    p.strokeCap(SQUARE)
  } else {
    p.strokeCap(ROUND)
  }
  
  
  p.drawingContext.setLineDash([randomVal(10, 500), randomVal(10, 500)])
  rows = randomInt(5, 20)
  cellH = (h-(marg*2))/rows
  freq = randomVal(1, 10)
  amp = randomVal(0, 1)
  wt = cellH/4
  finalCol = chroma('black').alpha((2/numLayers)+randomVal(-0.0001, 0.0001)).hex()
  p.noFill()
  p.strokeWeight(wt)
  p.stroke(finalCol)
  for(let y = 0; y < rows+1; y++) {
    p.drawingContext.lineDashOffset=randomVal(0, 500)
    p.beginShape()
    for(let x = 0; x < w; x++) {
      fullRot = map(x, 0, w, 0, 360)
      yOff = map(sin(fullRot*freq), -1, 1, -wt*amp, wt*amp)
      // yOff = map(noise(x*0.001), 0, 1, -wt*amp, wt*amp)
      p.vertex(x, (y*cellH+(cellH/2))+yOff)
    } 
    p.endShape()
  }
}

function cWave() {
  capDecider = randomInt(0, 1)
  if(capDecider == 0) {
    c.strokeCap(SQUARE)
  } else {
    c.strokeCap(ROUND)
  }
  
  
  c.drawingContext.setLineDash([randomVal(10, 500), randomVal(10, 500)])
  rows = randomInt(5, 50)
  cellH = (h-(marg*2))/rows
  freq = randomVal(2, 30)
  amp = randomVal(0, 1)
  wt = cellH/4
  finalCol = chroma('black').alpha(randomVal(0.05, 0.3)+randomVal(-0.0001, 0.0001)).hex()
  c.noFill()
  c.strokeWeight(wt)
  c.stroke(finalCol)
  for(let y = 0; y < rows+1; y++) {
    c.drawingContext.lineDashOffset=randomVal(0, 500)
    c.beginShape()
    for(let x = 0; x < w; x++) {
      fullRot = map(x, 0, w, 0, 360)
      yOff = map(sin(fullRot*freq), -1, 1, -wt*amp, wt*amp)
      // yOff = map(noise(x*0.001), 0, 1, -wt*amp, wt*amp)
      c.vertex(x, (y*cellH+(cellH/2))+yOff)
    } 
    c.endShape()
  }
}

function gradBG() {
  
    scl = 200
    thisPal = shuff(['gray', 'black'])
      for(let y = -200; y < h+200; y+=h/scl) {
        nY = map(y, 0, h, 0, 1)
        colScale = chroma.scale(thisPal)//.classes(20)
        hueCol = colScale(nY).hex()
        col = hueCol
        c.stroke(col)
        c.strokeWeight(h/scl)
        c.line(0, y, w,y)
      }
  
}

function paintBG() {
  c.noStroke()
  for(let i = 0; i < 3000; i++) {
    val = randomVal(0, 255*0.3)
    col = chroma(val, val, val).alpha(0.01+randomVal(-0.001, 0.001)).hex()
    c.fill(col)
    c.circle(randomVal(0, w), randomVal(0, h), randomVal(200, 600))
  }
}

function cShaper(x, y, r) {
  startAng = randomVal(0, 360)
  numSides = randomInt(3, 7)
  if(numSides > 6) {
    numSides = 360
  }
  c.beginShape()
  for(let i = 0; i < 360; i+= 360/numSides) {
    xC = cos(startAng+i)*(r/2)
    yC = sin(startAng+i)*(r/2)
    c.vertex(x+xC, y+yC)
  }
  c.endShape(CLOSE)
}

function cFlower(x, y, r) {
  startAng = randomVal(0, 360)
  numSides = randomInt(3, 7)
  if(numSides > 6) {
    numSides = 360
  }
  numPetals = 5
  c.beginShape()
  for(let i = 0; i < 360; i++) {
    sineMod = map(abs(sin(i*numPetals)), 0, 1, 0.5, 1)
    xC = cos(startAng+i)*((r/2)*sineMod)
    yC = sin(startAng+i)*((r/2)*sineMod)
    c.vertex(x+xC, y+yC)
  }
  c.endShape(CLOSE)
}

function cSpotLight(x, y, r) {
  dis = randomVal(0, r/2)
  edge = ptFromAng(x, y, randomVal(0, 360), dis)
  center = createVector(x, y)
  dens = r
  expo = 0.3

  for(let i = 0; i < dens; i++) {

    xC = map(i, 0, dens, center.x, edge.x)
    yC = map(i, 0, dens, center.y, edge.y)
    rad = map(i, 0, dens, r, 0)
    val = map(pow(i, expo), pow(dens*0.1, expo), pow(dens, expo), 0, 1)
    c.fill(chroma('white').alpha(val).hex())
    c.circle(xC, yC, rad)
  }
}

function cScale(x, y, r) {
  dis = randomVal(0, r/2)
  edge = ptFromAng(x, y, randomVal(0, 360), dis)
  center = createVector(x, y)
  dens = r
  expo = 0.1

  for(let i = 0; i < dens; i++) {

    xC = map(i, 0, dens, center.x, edge.x)
    yC = map(i, 0, dens, center.y, edge.y)
    rad = map(i, 0, dens, r, 0)
    val = map(pow(i, expo), pow(dens*0.1, expo), pow(dens, expo), 1, 0)*255
    c.fill(val)
    c.circle(xC, yC, rad)
  }
}

function bezScrib() {
  bezPts[0] = createVector(randomVal(0, w), randomVal(0, h))
  numPts = fullness//randomInt(5, 20)
  c.noFill()
  c.stroke('white')
  c.strokeWeight(10)
  c.beginShape()
  for(let i = 0; i < fullness; i++) {
    c.curveVertex(bezPts[i].x, bezPts[i].y)
  }
  c.endShape()
}

function building() {
  c.fill('white')
  c.rectMode(CENTER)
  c.rect(randomVal(0, w), h*0.75, randomVal(100, 200), randomVal(300, 600))
}

function ship(x, y, wid, hei) {
  ang = randomVal(-90, 90)//angBetween(x, y, w/2, h/2)+90
  shipTrail(x, y, ang+90, randomVal(100, 500))

  val = 255//map(wid, 20, 100, 200, 255)
  c.fill(val)
  c.noStroke()
  c.push()
  c.translate(x, y)
  
  c.rotate(ang)
  startAng = -90//angBetween(x, y, w/2, h/2)-90
  numSides = 3//randomInt(3, 7)
  if(numSides > 6) {
    numSides = 360
  }
  c.beginShape()
  for(let i = 0; i < 360; i+= 360/numSides) {
    xC = cos(startAng+i)*(wid/2)
    yC = sin(startAng+i)*(hei/2)
    c.vertex(xC, yC)
  }
  c.endShape(CLOSE)
  c.pop()

  
}

function shipTrail(x, y, ang, spd) {
  c.noFill()
  c.stroke(100)
  c.strokeWeight(1)
  c.beginShape() 
  // c.curveVertex(x, y)
  here = ptFromAng(x, y, ang+180, spd)
  c.curveVertex(here.x, here.y)
  
  
  for(let i = 0; i < 5; i++) {
    here = ptFromAng(x, y, ang+randomVal(-30, 30), spd*i)

    c.curveVertex(here.x, here.y)

    
  }
  c.endShape()
}

function placard(maxDis) {
  //top layer
  dens = randomInt(3, 10)
  c.beginShape()
  c.vertex(0, 0)
  c.vertex(w, 0)
  for(let i = -1 ; i < dens+1; i++) {
    xPos = map(i, 0, dens, w, 0)
    yPos = map(randomVal(0, maxDis), 0, 1, 0, h)
    c.vertex(xPos, yPos)
  }
  c.endShape(CLOSE)

  //bottom layer
  dens = randomInt(3, 10)
  c.beginShape()
  c.vertex(w, h)
  c.vertex(0, h)
  for(let i = -1 ; i < dens+1; i++) {
    xPos = map(i, 0, dens, 0, w)
    yPos = map(randomVal(0, maxDis), 0, 1, h, 0)
    c.vertex(xPos, yPos)
  }
  c.endShape(CLOSE)
}

function wave(min, max) {
  
  numWaves = 1//randomVal(1, 2)
  yLimMod = randomVal(0, 360)
  yMax = map(max, 0, 255, h, h*0.333)
  waveExpo = 2
  waveDis = plusOrMin(randomVal(100, 400))
  for(let i = 0; i < fullness; i++) {
    c.fill(randomVal(min, max))
    xPos = randomVal(-300, w+300)
    sineX = map(xPos, 0, w, 0, 360)
    
    yLimit = map(sin(((sineX*numWaves)+yLimMod)), -1, 1, 0, yMax)
    xMod = map(pow(yLimit, 0.5), 0, pow(yMax, 0.5), 0, -1000)

    yPos = randomVal(yLimit, 0)
    sineY = map(pow(yPos, waveExpo), 0, pow(yMax, waveExpo), 0, 360)-30
    yOff = map(sin(sineY), -1, 1, 0, waveDis)
    yDrop = map(sin(sineY), -1, 1, 0, yMax*0.3)
    here = createVector(xPos+yOff, h-yPos)

    c.rectMode(CENTER)
    cShaper(here.x, here.y, randomVal(100, w*0.1))
    // cSpotLight(here.x, here.y, randomVal(100, w*0.6))

    // c.fill(randomVal(100, 150))
    // there = ptFromAng(w/2, 0, randomVal(0, 180), randomVal(0, w*0.5))
    // cShaper(there.x, there.y, randomVal(100, w*0.5))
    
  }
}