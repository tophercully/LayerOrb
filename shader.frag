#ifdef GL_ES
precision highp float;
#endif

// grab texcoords from vert shader
varying vec2 vTexCoord;

//textures and uniforms from p5
uniform sampler2D p;
uniform sampler2D g;
uniform sampler2D c;
uniform vec2 u_resolution;
uniform float seed;
uniform float dir;
uniform float intens;
uniform vec3 bgc;
uniform vec2 center;
uniform float marg;
uniform float offsetAmt;
uniform float rotAmt;
uniform bool firstPass;
uniform bool lastPass;

float map(float value, float inMin, float inMax, float outMin, float outMax) {
  return outMin + (outMax - outMin) * (value - inMin) / (inMax - inMin);
}

float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

vec3 adjustContrast(vec3 color, float value) {
  return 0.5 + (1.0 + value) * (color - 0.5);
}
vec3 adjustExposure(vec3 color, float value) {
  return (1.0 + value) * color;
}
vec3 adjustSaturation(vec3 color, float value) {
  const vec3 luminosityFactor = vec3(0.2126, 0.7152, 0.0722);
  vec3 grayscale = vec3(dot(color, luminosityFactor));

  return mix(grayscale, color, 1.0 + value);
}
vec3 adjustBrightness(vec3 color, float value) {
  return color + value;
}

float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    // Smooth Interpolation

    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f*f*(3.0-2.0*f);
    // u = smoothstep(0.,1.,f);

    // Mix 4 coorners percentages
    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

mat2 rotate(float angle){
    return mat2(cos(angle),-sin(angle),sin(angle),cos(angle));
}


void main() {
  vec2 uv = vTexCoord*u_resolution;
  vec2 st = vTexCoord;
  vec2 stB = vTexCoord;
  vec2 stPaper = vTexCoord;

  //flip the upside down image
  st.y = 1.0 - st.y;
  stPaper.y = 1.0 - st.y;

  //form noise
  st.xy += map(random(st.xy), 0.0, 1.0, -0.0005, 0.0005);
  float warp = map(noise(seed+st.xy*5.0), 0.0, 1.0, -0.01, 0.01);
  //st.xy += warp;

  if(lastPass == true) {
    //Shrink to fit inside margins
    float margX = marg;
    float margY = margX*0.8;
    st.x = map(st.x, 0.0, 1.0, -margX, 1.0+margX);
    st.y = map(st.y, 0.0, 1.0, -marg, 1.0+marg);
    stB.x = map(stB.x, 0.0, 1.0, -margX, 1.0+margX);
    stB.y = map(stB.y, 0.0, 1.0, -marg, 1.0+marg);
  }
  


  //offset matrix
  vec4 sampTexP = texture2D(p, st);
  vec3 contrastSampP = adjustContrast(sampTexP.rgb, 0.2);
  vec2 sampLum = vec2(0.0, 0.0);
  
  sampLum = vec2(0.5, contrastSampP.r);
  
  
  
  vec4 sampColVal = texture2D(g, sampLum);
  
  float offAmt = offsetAmt;//0.008
  if(st.y > 0.5) {
    // offAmt *= 0.5;
  }
  
  float rotMult = rotAmt;
  float rotMod = map(st.y, 0.0, 1.0, 0.0, 1.0);
  if(st.y > 0.0+map(sampColVal.g, 0.0, 1.0, -offAmt, offAmt)) {
    st.x -= center.x;
    st.y -= center.y;
    st.xy *= rotate(map(sampColVal.b, 0.0, 1.0, -0.0174533*rotMult, 0.0174533*rotMult)*dir);
    st.x += center.x;
    st.y += center.y;
  } else {
    st.x -= 0.5;
    st.y -= 1.0;
    // st.xy *= rotate(map(sampColVal.b, 0.0, 1.0, -0.0174533*rotMult, 0.0174533*rotMult));
    st.x += 0.5;
    st.y += 1.0;
  }
  
  st.x += map(sampColVal.r, 0.0, 1.0, -offAmt, offAmt)*dir;
  st.y += map(sampColVal.g, 0.0, 1.0, -offAmt, offAmt)*dir;

  //paper texture params
  float noiseRot = 0.0;//noise(seed+(stB.xy*10.0))*(0.0174533*10.0);
  stPaper.xy *= rotate(sampTexP.r*(0.0174533*360.0*3.0)+noiseRot+seed);
  //scale x axis
  stPaper.x *= 40.0;
  //squeeze y axis
  stPaper.y *= 1000.0;
  // float noiseMod = noise(stPaper.x, stPaper.x);
  float paperVal = noise((seed+(stB.y*100.0))+stPaper.xy);
  

  vec4 texC = texture2D(c, st);
  vec4 texG = texture2D(g, st);
  vec4 texP = texture2D(p, st);
  vec3 contrastP = adjustContrast(texP.rgb, 0.1);
  vec2 lum = vec2(0.5, contrastP.r);
  // vec3 gradCol = vec3(sampTexG.r, sampTexG.g, sampTexG.b);

  vec4 colVal = texture2D(g, lum);
  //color noise
  float noiseGray = random(st.xy)*0.15;

  vec3 color = vec3(0.0);
  vec3 final = vec3(0.0);
  

  if(lastPass == false) {
    color = texP.rgb;
  } else {
    color = colVal.rgb;
  }

  //debug p layer
  // color = vec3(texP.r, texP.g, texP.b);

  //Draw margin
  // float margX = marg;
  // float margY = margX*0.8;
  if(stB.x < 0.0 || stB.x > 1.0 || stB.y < 0.0 || stB.y > 1.0) {
    color = vec3(bgc.r, bgc.g, bgc.b);
  }

  
  // if(texC.r == 0.0) {
  //   color = bgc.rgb;
  // }
  if(lastPass == false && texC.r < 0.5) {
    color = mix(bgc.rgb, color.rgb, texC.r);
  }

  if(lastPass == true) {
    color = mix(bgc.rgb, color.rgb, texC.r);
  
    if(color.rgb != bgc.rgb && texP.r > 0.5) {
      if(texC.r < 1.0) {
        color = adjustContrast(color, 0.5);
        color = adjustSaturation(color, 1.0);
      }
    
      
      if(paperVal > 0.7 && paperVal < 1.0) {
        
        // color = adjustExposure(color, noise(stB.xy*10.0)*0.1);
      } else if(paperVal < 0.4 && paperVal > 0.2) {
        
        // color = adjustExposure(color, noise(stB.xy*10.0)*-0.5);
      }
    } else if(texP.r < 0.5){
      // color = adjustContrast(color, -1.0);
      // color = mix(bgc, color, 0.1);
    }
    color += noiseGray;

    
  }
  
  
  
  // color.rgb = texG.rgb;
  // color.rgb = texP.rgb;
  // color.rgb = texC.rgb;


  gl_FragColor = vec4(color, 1.0);
}
