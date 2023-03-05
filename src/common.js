export function common(text) {
    const div = document.createElement('div');
    div.textContent = `Hello ${text}`;
    document.body.appendChild(div);
  }

export function createMatrix()
{
  let matrix = [];
  let col = 0;
  let row = 0;
  while(document.getElementById("number["+row+"]["+col+"]") != null){
    matrix[row] = [];
    while(document.getElementById("number["+row+"]["+col+"]") != null){
      matrix[row][col] = {
        weight : parseInt(document.getElementById("number["+row+"]["+col+"]").value),
        sumWeight : function(){return 0},
        prevElm : null,
        index : '['+row+']['+col+']',
      };
      col++;
    }
    row++;
    col = 0;
  }
  return matrix;
}

export function search(matrix, finishRow, finishCol, row, col, elm = {sumWeight: function(){return 0}})
{
  
  if ( matrix[row] == undefined || matrix[row][col] == undefined || matrix[row][col].weight < 1 ) return matrix;

  let currentSumWeight = matrix[row][col].sumWeight();
  console.log('['+row+']['+col+']-'+currentSumWeight);

  if (currentSumWeight > 0 && currentSumWeight <= elm.sumWeight() + parseInt(matrix[row][col].weight) ){ 
    // check if we should replace branch
    return matrix;
  }else{
    // set total sumweight
    matrix[row][col].prevElm = elm;
    matrix[row][col].sumWeight = (elm = matrix[row][col].prevElm) => elm.sumWeight() + parseInt(matrix[row][col].weight) ;
    
  }

  if (JSON.stringify([row, col]) === JSON.stringify([finishRow, finishCol])) {
      return matrix;
  }

  //make 4 attempts all directions
  matrix = search(matrix, finishRow, finishCol, parseInt(row), parseInt(col-1), matrix[row][col] );
  matrix = search(matrix, finishRow, finishCol, parseInt(row-1), parseInt(col), matrix[row][col] );
  matrix = search(matrix, finishRow, finishCol, parseInt(row), parseInt(col+1), matrix[row][col] );
  matrix = search(matrix, finishRow, finishCol,  parseInt(row+1), parseInt(col), matrix[row][col] );


  
  return matrix;
}

export function clearMatrix(matrix){

    let col = 0;
    let row = 0;
    while(matrix[row] !== undefined && matrix[row][col] !== undefined){
      while(matrix[row] !== undefined && matrix[row][col] !== undefined){
        matrix[row][col].sumWeight = function(){return 0};
        matrix[row][col].prevElm = null;
        col++;
      }
      row++;
      col = 0;
    }

    return matrix;
}
