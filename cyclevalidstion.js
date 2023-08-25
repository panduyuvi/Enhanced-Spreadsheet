// //storage > 2D matxix
 let graphcomponentmatxix = [];

for(let i=0;i<rows;i++)
{
    let row = [];

    for(let j=0;j<cols;j++)
    {

        //why array - more than 1 dependencey 
        row.push([]);

    }

    graphcomponentmatxix.push(row);

}
//true -> cyclic , false -> not cyclic
function isgraphcyclic(graphcomponentmatxix) {
       //dependency -> visted , dfsvisted (2D array)

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


       for(let i=0;i<rows;i++)
       {
        for( let j=0;j<cols;j++)
        {
            if(visited[i][j]=== false)
            {
            let response =  dfscycledetection(graphcomponentmatxix,i,j, visited,dfsvisted);
            if(response == true) return [i,j];
            
            }


        }
       }
       return null;
}
//start - visted(true ) dfsvis(true)
//end - dfsvis(false)
// if vis[true] - alrady visted go back
//cyccle dedtecyion -> if (vis[i][j]==1 && dfsvis[i][j]==1) -> true
function dfscycledetection(graphcomponentmatxix,srcr,srcc,visited,dfsvisted)
{
      visited[srcr][srcc]=true;
      dfsvisted[srcr][srcc]=true;
     for (let children = 0; children < graphcomponentmatxix[srcr][srcc].length; children++) {
    let [nbrr, nbrc] = graphcomponentmatxix[srcr][srcc][children];

    if (visited[nbrr][nbrc] == false) {
        let response = dfscycledetection(graphcomponentmatxix, nbrr, nbrc, visited, dfsvisted);
        if (response == true) return true;
    } else if (visited[nbrr][nbrc] == true && dfsvisted[nbrr][nbrc] == true) {
        return true;
    }
}

      
      dfsvisted[srcr][srcc]=false;
      return false;

}