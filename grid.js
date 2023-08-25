let rows=100;
let cols=26;

let addcolCont=document.querySelector(".add-col-cont");
let addrowCont=document.querySelector(".add-row-cont");
let cellcont=document.querySelector(".cell-cont");
let addbar=document.querySelector(".address-bar");
for(let i=0;i<rows;i++)
{
    let addcol=document.createElement("div");
    addcol.setAttribute("class","add-col");
    addcol.innerText=i+1;
    addcolCont.appendChild(addcol);
}
for(let i=0;i<cols;i++)
{
    let addrow=document.createElement("div");
    addrow.setAttribute("class","add-row");
    addrow.innerText=String.fromCharCode(65+i);
    addrowCont.appendChild(addrow);
}

for(let i=0;i<rows;i++)
{
    let rowcont=document.createElement("div");
    rowcont.setAttribute("class","row-cont");
    for(let j=0;j<cols;j++)
    {
        let cell=document.createElement("div");
        cell.setAttribute("class","cell");
        cell.setAttribute("contenteditable","true");

        cell.setAttribute("rid",i);
        cell.setAttribute("cid",j);
        cell.setAttribute("spellcheck",false);
        rowcont.appendChild(cell);
        addlistenbar(cell,i,j);


    }
    cellcont.appendChild(rowcont);
}

function addlistenbar(cell,i,j){

    cell.addEventListener("click", (e) =>{
          let rowid=i+1;
          let colid=String.fromCharCode(65+j);
          addbar.value = `${colid}${rowid}`;
    })


}


let firstcell=document.querySelector(".cell");
firstcell.click();

