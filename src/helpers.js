export function selectCell(elm)
{
  elm.classList.add('fw-bold');
  elm.classList.add('text-primary');
  elm.classList.add('selected-cell');
}

export function clearCellsSelection(inputFileds)
{
  inputFileds.forEach(function(elm){
    elm.classList.remove('fw-bold');
    elm.classList.remove('text-primary');
    elm.classList.remove('selected-cell');
  });
}
export function checkIfEndPointsSet(startRow, startCol, finishRow, finishCol)
{
  for (let i = 0; i < arguments.length; i++) {
    if (!arguments[i]) {
      makePathBtn.disabled = true;
      return false;
    }
  }
  makePathBtn.disabled = false;
}

export function disableStartFinish()
{
  setStartBtn.disabled = true;
  setFinishBtn.disabled = true;
}

export function enableStartFinish()
{
  setStartBtn.disabled = false;
  setFinishBtn.disabled = false;
}

export function printSumInfo(msg)
{
  document.querySelector('.sumWarpper span').innerHTML = msg;
}

export function printErrorInfo(msg)
{
  document.querySelector('.errorWarpper').innerHTML = msg;
}


export function clearPath(matrix)
{
  printErrorInfo('');
  document.querySelectorAll('.path-cell').forEach(function(elm){
    elm.classList.remove('path-cell');
  });
  matrix = clearMatrix(matrix);
  printSumInfo('');
  return matrix;
}

export function setStartFinishCells(point)
{
  let selectedCell = document.querySelectorAll('input.selected-cell');
  if (selectedCell === null) return false;
  let indexArr = selectedCell[0].id.match(/[0-9]+/g);

  document.querySelectorAll('.'+point+'-cell').forEach(function(elm){
    elm.classList.remove(point+'-cell');
  });

  selectedCell[0].parentElement.classList.add(point+'-cell');
  return indexArr;
}

function clearMatrix(matrix){

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