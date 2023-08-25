let sheetDB = [];
for (let i = 0; i < rows; i++) {
  let sheetRow = [];
  for (let j = 0; j < cols; j++) {
    let cellprop = {
      bold: false,
      italic: false,
      underline: false,
      alignment: "left",
      fontFamily: "monospace",
      fontsize: "14",
      fontcolor: "#000000",
      BGcolor: "#000000",
      value: "",
      formula: "",
      children: [],
    };

    sheetRow.push(cellprop);
  }

  sheetDB.push(sheetRow);
}

let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let fontsize = document.querySelector(".font-size-prop");
let fontcolor = document.querySelector(".font-color-prop");
let fontFamily = document.querySelector(".font-family-prop");
let BGcolor = document.querySelector(".BGcolor-prop");
let alignment = document.querySelectorAll(".alignment");
let leftalign = alignment[0];
let centeralign = alignment[1];
let rightalign = alignment[2];

let activecellprop = "#d1d8e0";
let inactivecellprop = "#ecf0f1";

bold.addEventListener("click", (e) => {
  let address = addbar.value;
  let [cell, cellprop] = activecell(address);

  cellprop.bold = !cellprop.bold;
  cell.style.fontWeight = cellprop.bold ? "bold" : "normal";
  bold.style.backgroundColor = cellprop.bold ? activecellprop : inactivecellprop;
});

italic.addEventListener("click", (e) => {
  let address = addbar.value;
  let [cell, cellprop] = activecell(address);

  cellprop.italic = !cellprop.italic;
  cell.style.fontStyle = cellprop.italic ? "italic" : "normal";
  italic.style.backgroundColor = cellprop.italic ? activecellprop : inactivecellprop;
});

underline.addEventListener("click", (e) => {
  let address = addbar.value;
  let [cell, cellprop] = activecell(address);

  cellprop.underline = !cellprop.underline;
  cell.style.textDecoration = cellprop.underline ? "underline" : "none";
  underline.style.backgroundColor = cellprop.underline ? activecellprop : inactivecellprop;
});

fontsize.addEventListener("change", (e) => {
  let address = addbar.value;
  let [cell, cellprop] = activecell(address);

  cellprop.fontsize = fontsize.value;
  cell.style.fontSize = `${cellprop.fontsize}px`;
  fontsize.value = cellprop.fontsize;
});

fontFamily.addEventListener("change", (e) => {
  let address = addbar.value;
  let [cell, cellprop] = activecell(address);

  cellprop.fontFamily = fontFamily.value;
  cell.style.fontFamily = cellprop.fontFamily;
  fontFamily.value = cellprop.fontFamily;
});

fontcolor.addEventListener("change", (e) => {
  let address = addbar.value;
  let [cell, cellprop] = activecell(address);

  cellprop.fontColor = fontcolor.value;
  cell.style.color = cellprop.fontColor;
  fontcolor.value = cellprop.fontColor;
});

BGcolor.addEventListener("change", (e) => {
  let address = addbar.value;
  let [cell, cellprop] = activecell(address);

  cellprop.BGcolor = BGcolor.value;
  cell.style.backgroundColor = cellprop.BGcolor;
  BGcolor.value = cellprop.BGcolor;
});


alignment.forEach((alignElem) => {
  alignElem.addEventListener("click", (e) => {
    let address = addbar.value;
    let [cell, cellprop] = activecell(address);

    let alignValue = e.target.classList[0];
    cellprop.alignment = alignValue;
    cell.style.textAlign = cellprop.alignment;

    switch (alignValue) {
      case "left":
        leftalign.style.backgroundColor = activecellprop;
        centeralign.style.backgroundColor = inactivecellprop;
        rightalign.style.backgroundColor = inactivecellprop;
        break;
      case "center":
        leftalign.style.backgroundColor = inactivecellprop;
        centeralign.style.backgroundColor = activecellprop;
        rightalign.style.backgroundColor = inactivecellprop;
        break;
      case "right":
        leftalign.style.backgroundColor = inactivecellprop;
        centeralign.style.backgroundColor = inactivecellprop;
        rightalign.style.backgroundColor = activecellprop;
        break;
    }
   

  });
});


let allcells = document.querySelectorAll(".cell");
for(let i=0;i<allcells.length;i++)
{
  addlistnertoattachcellproperties(allcells[i]);
}

function addlistnertoattachcellproperties(cell){
  cell.addEventListener("click", (e) =>{
    let add = addbar.value;
    let [rid , cid] = decoderRIDCIDFromaddress(add);
    let cellprop = sheetDB[rid][cid];

    //Apply cell properties 
    cell.style.fontWeight = cellprop.bold ? "bold" : "normal";
    cell.style.fontStyle = cellprop.italic ? "italic" : "normal";
    cell.style.textDecoration = cellprop.underline ? "underline" : "none";
    cell.style.fontSize = `${cellprop.fontsize}px`;
    cellprop.fontFamily = fontFamily.value;
    cell.style.color = cellprop.fontColor;
    cell.style.backgroundColor = cellprop.BGcolor === "#000000" ? "transparent" : cellprop.BGcolor;
    cell.style.textAlign = cellprop.alignment;


    //Apply properties UI props container 
    bold.style.backgroundColor = cellprop.bold ? activecellprop : inactivecellprop;
    italic.style.backgroundColor = cellprop.italic ? activecellprop : inactivecellprop;
    underline.style.backgroundColor = cellprop.underline ? activecellprop : inactivecellprop;
    fontcolor.value = cellprop.fontColor;
    BGcolor.value = cellprop.BGcolor;
    fontsize.value = cellprop.fontsize;
    fontFamily.value = cellprop.fontFamily;

    switch (cellprop.alignment) {
      case "left":
        leftalign.style.backgroundColor = activecellprop;
        centeralign.style.backgroundColor = inactivecellprop;
        rightalign.style.backgroundColor = inactivecellprop;
        break;
      case "center":
        leftalign.style.backgroundColor = inactivecellprop;
        centeralign.style.backgroundColor = activecellprop;
        rightalign.style.backgroundColor = inactivecellprop;
        break;
      case "right":
        leftalign.style.backgroundColor = inactivecellprop;
        centeralign.style.backgroundColor = inactivecellprop;
        rightalign.style.backgroundColor = activecellprop;
        break;
    }
    let formulabar =document.querySelector(".formula-bar");
    formulabar.value = cellprop.formula;
    cell.value = cellprop.value;
 
  })
}

function activecell(address) {
  let [rid, cid] = decoderRIDCIDFromaddress(address);
  let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
  let cellprop = sheetDB[rid][cid];

  return [cell, cellprop];
}

function decoderRIDCIDFromaddress(address) {
  let rid = Number(address.slice(1) - 1);
  let cid = Number(address.charCodeAt(0)) - 65;
  return [rid, cid];
}
