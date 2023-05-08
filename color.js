bgCols = [
  "#FFF5EE", //seashell
  "#fbf6e3", //canvas
  "#E6E0D4", //white coffee
  "#FDDEBD", //butter white
  "#F6FCFA", //white rose
  "#ECECEE", //christmas white
  "#1F201F", //retro black
  "#212122", //ink black
  "#1B1B1B", //eerie black
  "#242124", //raisin black
];

bgNames = [
  "SeaShell",
  "Canvas",
  "White Coffee",
  "Butter White",
  "White Rose",
  "Christmas White",
  "Retro Black",
  "Ink Black",
  "Eerie Black",
  "Raisin Black",
];
//Background color parameters
bgNum = randomInt(0, 9);
bgc = '#ECECEE'//bgCols[bgNum];
bgName = bgNames[bgNum];

//Make a color that always contrasts bgc
calcBgLum = chroma(bgc).luminance();
if (calcBgLum > 0.5) {
  frameCol = 'black'; //black
} else if( calcBgLum < 0.5) {
  frameCol = 'white'; //white
}

//Palettes
//Always include frameCol instead of black or white so our colors don't blend into bgc
const source = [
  "#A6C8CA",
  "#097857",
  "#F1E8D9",
  "#E3CE61",
  "#E35A7E",
  frameCol,
  "#EE692A",
  "#BFCCD4",
  "#217F96",
  "#EBD5D7",
];

const shepard = [
  "#3D5A80", 
"#98C1D9", 
// "#E0FBFC", 
"#FF4D21", 
"#293241", 
frameCol
];

const toyBlocks = ["#EBB701", "#EA3F23", "#00A2C8", frameCol, "#EAEAEA"];

const mcWoot = ["#ED6A5A", "#636CCE", "#DFB2F4", "#50B386", "#55D6C2", frameCol];

const soft = [
  "#F94144",
  "#F3722C",
  "#F8961E",
  "#F9844A",
  "#F9C74F",
  "#90BE6D",
  "#43AA8B",
  "#4D908E",
  "#577590",
  "#277DA1",
  // frameCol,
  // "white",
];

const jazzy = [
  frameCol,
  "#005f73",
  "#0a9396",
  "#94d2bd",
  "#e9d8a6",
  "#ee9b00",
  "#ca6702",
  "#bb3e03",
  "#ae2012",
  "#9b2226",
];

const ceramic = [
  "#5B476C",
  "#3581AA",
  "#A54B49",
  "#CED8D3",
  "#72BC9C",
  "#D49B8A",
  "#0096C7",
  frameCol,
];

const oilPastel = [
 '#EF2167',
 '#B8DEEE',
 '#F7E1F1',
 '#2B6C71',
 '#FBFAF6',
 '#050E13',
 '#B6C3BA',
 '#EF7F6B'
]

 const mcNay = [
 '#87966B',
 '#D4816F',
 '#617E94',
 '#DAC3B5',
 '#B8C1D0',
 '#BC7B58',
 '#8B8279',
]

 const oKeefe = [
 '#4F4D5C',
 '#E4CDB3',
 '#833828',
 '#B27362',
 '#D7B4A8',
 '#DBAF64',
 '#9D5F00',
 '#B9BAAB',
 '#414A37',
 '#838D7F',
]

 const flowerMarket = [
 '#4F4D5C',
 '#E4CDB3',
 '#833828',
 '#B27362',
 '#D7B4A8',
 '#DBAF64',
 '#9D5F00',
 '#B9BAAB',
 '#414A37',
 '#838D7F',
]

 const oilPaint = [
 '#844E93',
 '#B197C8',
 '#416368',
 '#3B3F42',
 '#69919B',
 '#90774C',
 '#ECEDE7',
]

 const seaFoam = [
 "#22577a", "#38a3a5", "#57cc99", "#80ed99", "#c7f9cc", "#f2f9e8", "#f9f9f9"
] //credit Wouter Missler

const popper = ["#F5D365", "#E66C64", "#92BCC8", "#4F7C9A", frameCol];

const bau = [
  "#1267b7",
  "#ec3e2b",
  "#f6b81a",
  // "#E4D6C2",
  "#1D1F22",
]

const elliot = [
  "#E73542",
  "#F6A026",
  "#2CA8C4",
  "#EE7140",
  "#289C5B",
  // "#F5E2CC",
  // "#161117"
]
const vint = [
  // 'black',
  // '#FDDEBD',
  '#3255A4',
  '#62A8E5',
  '#FF8E91'
]
const wildberry = [
  'black',
  '#62A8E5',
  '#BB76CF',
  '#407060',
  '#FF6C2F',
  '#fff0e0',
]

const blockA = ["#E4E7E0","#F0829D","#428E8A","#F4E8AE","#109BC4","#1C1E1B"]

const blockB = ["#1D9042","#212322","#0C8ABB","#E2E5DE","#C77B99","#E97D48","#DDC267"]

const blockC = ["#1F1E23","#0068C1","#E7CF63","#F3669A","#D6D8D5"]

const burn = ["#00b4e2","#fd4f92","#ff7b89","#ffa070","#ffd403"]

const scifi = ["#4ea459","#47bc89","#38928a","#e2a48e","#c35548","#33778a","#8bd6e8","#11120a","#f8ddc3","#a7d0c0"]

const yeller = ["#29221c","#8e3b2d","#b27469","#f49f10","#fedb49","#e7d0c0","#ceb29a","#c9ced1","#b0b8bb","#646d4e"]

const overlook = ["#3d4d20","#ad0b08","#1d5473","#798b97","#edd2b7","#b76439","#d2955f","#282723"]

const helmetFace = ["#617a5c","#a3ab86","#accbf9","#f3c9f4","#030305","#cfd9e3","#e3e4e8"]

const fullColor = ["#1f46c8", "#44B8F5", "#EF3C19", "#FFEB00", "#4FA55E", '#b44fd0', "#ea5920", '#FF48B0', '#37cdb2']

const retroBaby = [
  '#8fb886', 
"#e7b763", 
"#46abc7", 
"#9a0603", 
"#fc5207"]

comboA = ["#142e70", "#f74d13"]
comboB = ["#efa738","#3796f0"] //LOVE
comboC = ["#F56905", "#074EE5"] //also love
comboD = ["#2C4CB8","#EF3C19"]// so poppin
comboE = ['#F57103', '#00598D', '#214C25'] //love this

comboF = ['#de3be1', "#e9a32b"]

achro = ['black', 'white']


const pals = [shepard, source, soft, mcWoot, comboE, comboA, comboF];

const palNames = [
  "Commander Shepard",
  "Source",
  "Soft",
  "McWoot",
  "comboE",
  "comboA",
  "comboF",
  "O'Keefe",
  "Flower Market",
  "Oil Paint"
];

//Palette parameters
palNum = randomInt(0, pals.length-1);
pal = pals[palNum];
palName = palNames[palNum];

console.log(palName)

//Setup for the next step
lighterPal = [];
darkerPal = [];
warmerPal = [];
coolerPal = [];

coolTemp = 5000;
warmTemp = 8000;

//Increase color variation by 5x-ing our palette size and making slight adjustments to each copy
for (let i = 0; i < pal.length-1; i++) {
  lighterPal[i] = chroma(pal[i]).brighten(0.35).hex();
  darkerPal[i] = chroma(pal[i]).darken(0.35).hex();
  warmerPal[i] = chroma
    .mix(pal[i], chroma.temperature(coolTemp).hex(), 0.5)
    .saturate()
    .hex();
  coolerPal[i] = chroma
    .mix(pal[i], chroma.temperature(warmTemp).hex(), 0.5)
    .saturate()
    .hex();
}

//Combine palettes and shuffle that full palette
fullPal = [].concat(pal);
truePal = shuff(fullPal);

//Pass our palette back to the CSS spinner
let root = document.documentElement;
root.style.setProperty("--c1", truePal[0]);
root.style.setProperty("--c2", truePal[1]);
root.style.setProperty("--c3", truePal[2]);
root.style.setProperty("--c4", truePal[3]);
