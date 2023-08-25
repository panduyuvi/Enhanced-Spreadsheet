for(let i=0;i<rows;i++)
{
    for(let j=0;j<cols;j++)
    {
        let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);

        cell.addEventListener("blur", (e) =>{
            let address = addbar.value;

            let [activeCell, cellprop]=activecell(address);
            let entereddata = activeCell.innerText;
            if(entereddata === cellprop.value) return;
            cellprop.value=entereddata;
            // if data is modifies , removes p-c relation , formula empty , update children with new hardcoded (modified) value 

            REMOVECHILDFROMPARENT(cellprop.formula);
            cellprop.formula="";
            updatechildrencells(address);
           
        })
    }
}


let formulabar = document.querySelector(".formula-bar");
formulabar.addEventListener("keydown", async(e)=>{
    let inputformula = formulabar.value;
    if(e.key == "Enter" && inputformula){
        let evaluatedvalue = evaluateformula(inputformula);
      // if change in formula , break old P-C relation , eval new formula ,add new p-c relation
        let address = addbar.value;
        let [cell, cellprop]= activecell(address);
        if(inputformula !== cellprop.formula) REMOVECHILDFROMPARENT(cellprop.formula);


        adchildtographcomponent(inputformula,address);
        //check cycle validation
        let cycleresponse = isgraphcyclic(graphcomponentmatxix);

        if(cycleresponse)
        {
           // alert("Your formula leads to cyclic");
           let respone = confirm(" your formula is cyclic , do you wish  trace your path ?");
           while(respone ===true)
           {
            // kepp on track color until user is done
           await isgraphcyclictracepath(graphcomponentmatxix,cycleresponse); // i want to complete iteration of volor tracking attaching wait here also
            respone = confirm(" your formula is cyclic , do you esnt trace your path ?");
           }
            removechildfromgraphcomponent(inputformula,address);
            return;
        }
        // To update sheetDB
        setcelluiandcellprop(evaluatedvalue,inputformula,address);
        addChildToParent(inputformula);
       // console.log(sheetDB);
       updatechildrencells(address);
    }
})

function adchildtographcomponent(formula, childaddress)
{
    let [crid,ccid]=decoderRIDCIDFromaddress(childaddress);
    let encodedformula = formula.split(" ");

    for(let i=0;i<encodedformula.length;i++)
    {
        let asciivalue = encodedformula[i].charCodeAt(0);
        if(asciivalue >=65 && asciivalue <= 90)
        {
            let [prid,pcid]=decoderRIDCIDFromaddress(encodedformula[i]);
            graphcomponentmatxix[prid][pcid].push([crid,ccid]);
        }
    }
}

function removechildfromgraphcomponent(formula,childaddress)
{
    let [crid,ccid]=decoderRIDCIDFromaddress(childaddress);
    let encodedformula = formula.split(" ");

    for(let i=0;i<encodedformula.length;i++)
    {
        let asciivalue = encodedformula[i].charCodeAt(0);
        if(asciivalue >=65 && asciivalue <= 90)
        {
            let [prid,pcid]=decoderRIDCIDFromaddress(encodedformula[i]);
            graphcomponentmatxix[prid][pcid].pop();
        }
    }
}

 function updatechildrencells (parentaddress)
 {
    let [parentcell,parentcellprop] = activecell(parentaddress);
    let children = parentcellprop.children;

    for( let i=0; i<children.length;i++)
    {
        let childaddress = children[i];
        let [childcell, childcellprop]=activecell(childaddress);
        let childformula = childcellprop.formula;
        let evaluatedvalue = evaluateformula(childformula);
        setcelluiandcellprop(evaluatedvalue,childformula,childaddress);
        updatechildrencells(childaddress);

    


    }
 }
function addChildToParent(formula)
{
    let childaddress = addbar.value;
    let encodedformula = formula.split(" ")
   for(let i=0;i<encodedformula.length;i++)
   {
    let asciivalue = encodedformula[i].charCodeAt(0);
    if(asciivalue>=65 && asciivalue <=90)
    {
        let [parentcell, parentcellprop] = activecell(encodedformula[i]);
        parentcellprop.children.push(childaddress);
    }
   }

 



}

function REMOVECHILDFROMPARENT(formula)
{
    let childaddress = addbar.value;
    let encodedformula = formula.split(" ")
   for(let i=0;i<encodedformula.length;i++)
   {
    let asciivalue = encodedformula[i].charCodeAt(0);
    if(asciivalue>=65 && asciivalue <=90)
    {
        let [parentcell, parentcellprop] = activecell(encodedformula[i]);
        let idx = parentcellprop.children.indexOf(childaddress);
        parentcellprop.children.splice(idx,1);
    }
   }
}
function evaluateformula(formula) {
    let encodedformula = formula.split(" ");
    
    for (let i = 0; i < encodedformula.length; i++) {
        let asciivalue = encodedformula[i].charCodeAt(0);
        if (asciivalue >= 65 && asciivalue <= 90) {
            let [cell, cellprop] = activecell(encodedformula[i]);
            let [rid, cid] = decoderRIDCIDFromaddress(encodedformula[i]);
            encodedformula[i] = cellprop.value; // Use cellprop value here
        }
    }

    let decodedformula = encodedformula.join(" ");
  
    return eval(decodedformula);
}


function setcelluiandcellprop(evaluatedvalue,formula , address){
    
    let [cell,cellprop] = activecell(address);
    cell.innerText = evaluatedvalue;
    cellprop.value = evaluatedvalue;
    cellprop.formula = formula;
}