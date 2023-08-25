function colorPromise() {
    return new Promise ( (resolve,reject) => {
        setTimeout(() => { 
            resolve();
    },1000);
    })
}
async function isgraphcyclictracepath(graphcomponentmatxix,cycleresponse) {
    //dependency -> visted , dfsvisted (2D array)
    let [srcr,srcc] = cycleresponse;
    let visited = [];
    let dfsvisted = [];

    for(let i=0;i<rows;i++)
    {
     let visitedrow = [];
     let dfsvistedrow = [];
     for(let j=0;j<cols;j++)
     {
         visitedrow.push(false);
         dfsvistedrow.push(false);

     }
     visited.push(visitedrow);
     dfsvisted.push(dfsvistedrow);  
    }

    let response =   await dfscycledetectiontracepath(graphcomponentmatxix,srcr,srcc, visited,dfsvisted);
    if(response === true) return Promise.resolve(true);
    return Promise.resolve(false);
}


//coloring cell for tracking 
 async function dfscycledetectiontracepath(graphcomponentmatxix,srcr,srcc,visited,dfsvisted)
{
   visited[srcr][srcc]=true;
   dfsvisted[srcr][srcc]=true;

   let cell = document.querySelector(`.cell[rid="${srcr}"][cid="${srcc}"]`);
   cell.style.backgroundColor = "lightblue";
   await colorPromise(); //1 sec finshed 
  

  for (let children = 0; children < graphcomponentmatxix[srcr][srcc].length; children++) {
 let [nbrr, nbrc] = graphcomponentmatxix[srcr][srcc][children];

 if (visited[nbrr][nbrc] == false) {
     let response =  await dfscycledetectiontracepath(graphcomponentmatxix, nbrr, nbrc, visited, dfsvisted);
     if (response == true)
     { 
      //  cell.style.backgroundColor = "transparent";
      cell.style.backgroundColor = "transparent";
       await colorPromise();
        return Promise.resolve(true);
     }
 } else if (visited[nbrr][nbrc] == true && dfsvisted[nbrr][nbrc] == true) {

    let cyclicell = document.querySelector(`.cell[rid="${nbrr}"][cid="${nbrc}"]`);
  
   
    cyclicell.style.backgroundColor = "lightsalmon";
   await colorPromise();
    cyclicell.style.backgroundColor = "transparent";
   await colorPromise();
   cell.style.backgroundColor = "transparent";
    return Promise.resolve(true);
 }
}

   
   dfsvisted[srcr][srcc]=false;
   return Promise.resolve(false);

}