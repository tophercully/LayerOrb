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
    for(let y = 0; y < h; y+=w/scl) {
      nY = map(y, 0, h, 0, 1)
      colScale = chroma.scale(truePal.slice(0, numColors))//.classes(numColors)
      hueCol = colScale(nY).hex()
      col = hueCol
      g.stroke(col)
      g.strokeWeight(h/scl)
      g.line(0, y, w,y)
    }
}

function sineWave() {
  capDecider = randomInt(0, 1)
  if(capDecider == 0) {
    p.strokeCap(SQUARE)
  } else {
    p.strokeCap(ROUND)
  }
  
  
  // p.drawingContext.setLineDash([randomVal(10, 500), randomVal(10, 500)])
  rows = randomInt(2, 30)
  cellH = (h-(marg*2))/rows
  freq = randomVal(1, 4)
  amp = randomVal(0, 1)
  val = randomVal(0, 255)
  wt = cellH/4
  finalCol = chroma(val, val, val).alpha((randomVal(0.2, 0.7))+randomVal(-0.0001, 0.0001)).hex()
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