import {
  createMatrix,
  clearMatrix,
  search,
} from './common.js'; 

import {

} from './helpers.js'; 

export function main()
{
  const setStartBtn = document.getElementById('setStartBtn');
  const setFinishBtn = document.getElementById('setFinishBtn');
  const clearPathBtn = document.getElementById('clearPathBtn');
  const makePathBtn = document.getElementById('makePathBtn');
  const inputFileds =  document.querySelectorAll('input.number-input');

  let startRow = null;
  let startCol = null;
  let finishRow = null;
  let finishCol = null;
  let matrix = createMatrix();

  for (var i = 0; i < inputFileds.length; i++) {
    inputFileds[i].onfocus = function() {
      clearCellsSelection(inputFileds);
      this.select();
      if (this.value > 0){
        enableStartFinish();
        selectCell(this);
      } else{
        disableStartFinish();
      }

    };

    inputFileds[i].onkeydown = function(e) {

      if (!e.key.match(/^[0-9]+$/))
        e.preventDefault();
      else{
        let indexArr = this.id.match(/[0-9]+/g);
        matrix[indexArr[0]][indexArr[1]].weight = parseInt(e.key);
        if (e.key < 1){
          disableStartFinish();
          clearCellsSelection(inputFileds);
        }else {
          selectCell(this);
          enableStartFinish();
        }
      } 
    };

  }


  setStartBtn.onclick = function() { 
    let indexArr = setStartFinishCells('start');
    startRow = indexArr[0];
    startCol = indexArr[1];
    checkIfEndPointsSet(startRow, startCol, finishRow, finishCol);
  };
  setFinishBtn.onclick = function() { 
    let indexArr = setStartFinishCells('finish');
    finishRow = indexArr[0];
    finishCol = indexArr[1];
    checkIfEndPointsSet(startRow, startCol, finishRow, finishCol);
  };
  clearPathBtn.onclick = function() { 
    
    matrix =clearPath(matrix);

  };
  makePathBtn.onclick = function() { 

    matrix =clearPath(matrix);
   
    if (matrix[startRow][startCol].weight > 0 && matrix[finishRow][finishCol].weight > 0)
      matrix = search(matrix, finishRow, finishCol, startRow, startCol);
    else console.log('smth is 0');

    console.log(matrix);

    let lastElm = matrix[finishRow][finishCol];
    printSumInfo(lastElm.sumWeight());

    let currentElm = lastElm;

    if (currentElm.prevElm === undefined || currentElm.prevElm === null) {
      printErrorInfo('Cant find');
      return false;
    }
    while (currentElm.prevElm !== undefined && currentElm.prevElm.index != '['+startRow+']['+startCol+']'){
      currentElm = currentElm.prevElm;
      try {
        document.getElementById('number'+currentElm.index).parentElement.classList.add('path-cell');
      } catch (error) {
        printErrorInfo('Cant paint path');
      }
      
    }

  };

}






function selectCell(elm)
{
  elm.classList.add('fw-bold');
  elm.classList.add('text-primary');
  elm.classList.add('selected-cell');
}

function clearCellsSelection(inputFileds)
{
  inputFileds.forEach(function(elm){
    elm.classList.remove('fw-bold');
    elm.classList.remove('text-primary');
    elm.classList.remove('selected-cell');
  });
}
function checkIfEndPointsSet(startRow, startCol, finishRow, finishCol)
{
  for (let i = 0; i < arguments.length; i++) {
    if (!arguments[i]) {
      makePathBtn.disabled = true;
      return false;
    }
  }
  makePathBtn.disabled = false;
}

function disableStartFinish()
{
  setStartBtn.disabled = true;
  setFinishBtn.disabled = true;
}

function enableStartFinish()
{
  setStartBtn.disabled = false;
  setFinishBtn.disabled = false;
}

function printSumInfo(msg)
{
  document.querySelector('.sumWarpper span').innerHTML = msg;
}

function printErrorInfo(msg)
{
  document.querySelector('.errorWarpper').innerHTML = msg;
}


function clearPath(matrix)
{
  printErrorInfo('');
  document.querySelectorAll('.path-cell').forEach(function(elm){
    elm.classList.remove('path-cell');
  });
  matrix = clearMatrix(matrix);
  printSumInfo('');
  return matrix;
}

function setStartFinishCells(point)
{
  let selectedCell = document.querySelectorAll('input.selected-cell');
  if (selectedCell === null) return false;
  let indexArr = selectedCell[0].id.match(/[0-9]+/g);

  document.querySelectorAll('.'+point+'-cell').forEach(function(elm){
    elm.classList.remove(point+'-cell');
  });

  selectedCell[0].parentElement.classList.add(point+'-cell');
  return indexArr;
  startRow = indexArr[0];
  startCol = indexArr[1];
  checkIfEndPointsSet(startRow, startCol, finishRow, finishCol);

}