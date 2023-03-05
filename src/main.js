import {
  createMatrix,
  search,
} from './common.js'; 

import {
  selectCell,
  clearCellsSelection,
  checkIfEndPointsSet,
  disableStartFinish,
  enableStartFinish,
  printSumInfo,
  printErrorInfo,
  clearPath,
  setStartFinishCells,
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

