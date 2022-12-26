formulael=document.querySelector(".formula input");

for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
        let cell = document.querySelector(`#${String.fromCharCode(65+j)}${i+1}`);
        cell.addEventListener("blur", (e) => {
            [row,column]=getRowColOfActiveCell();
            let cellprop=sheet[row][column];
            let activeCell=document.querySelector("#"+getIdOfActiveCell());
            let enteredData = activeCell.innerText;
            if (enteredData === cellprop.value) return;

            cellprop.value = enteredData;

            removechildren(cellprop.formula);
            cellprop.formula="";
            updatechildren(cellprop.children);
        })
    }
}

formulael.addEventListener("keydown",(e)=>{
    if(e.key=="Enter" && formulael.value!="")
    {
        let inputformula=formulael.value; 
        
        
        [row,column]=getRowColOfActiveCell();
        let cellprop=sheet[row][column];
        if(cellprop.value!="" && cellprop.formula!=inputformula)
        {
            removechildren(cellprop.formula);
        }
        let evaluatedvalue=evaluateFormula(inputformula);
        addChildren(inputformula);
        updateCellAndDB(inputformula,evaluatedvalue);
        updatechildren(cellprop.children);
    }
})

function addChildren(inputformula)
{

    let formulasplit=inputformula.split(" ");
    for(let i=0;i<formulasplit.length;i++)
    {
        let eachel=formulasplit[i];
        if(eachel[0].charCodeAt(0)>=65 && eachel[0].charCodeAt(0)<=90)
        {
            parentrow=Number(eachel[1]-1);
            parentcolumn=Number(eachel[0].charCodeAt(0)-65);
            parentcellprop=sheet[parentrow][parentcolumn];     
            parentcellprop.children.push(getIdOfActiveCell());

        }
    }
}

function removechildren(formula)
{
    if(formula!="")
    {

    let formulasplit=formula.split(" ");
    let child=getIdOfActiveCell();
    for(let i=0;i<formulasplit.length;i++)
    {
        let eachel=formulasplit[i];
        if(eachel[0].charCodeAt(0)>=65 && eachel[0].charCodeAt(0)<=90)
        {
            parentrow=Number(eachel[1]-1);
            parentcolumn=Number(eachel[0].charCodeAt(0)-65);
            parentcellprop=sheet[parentrow][parentcolumn];
            childindex=parentcellprop.children.indexOf(child);
            parentcellprop.children.splice(childindex,1);
        } 
    }
}
}

function updatechildren(childs)
{
    for(let i=0;i<childs.length;i++)
    {
        let eachchild=childs[i];
        let childcell=getCell(eachchild);
        let [childrow,childcolumn]=getrowcolumn(eachchild);
        childprop=sheet[childrow][childcolumn];
        childformula=childprop.formula;
        childevaluatedvalue=evaluateFormula(childformula);
        childprop.value=childevaluatedvalue;
        childcell.innerText=childevaluatedvalue;
        updatechildren(childprop.children);
    }
}

function evaluateFormula(inputformula)
{
    let formulasplit=inputformula.split(" ");
    for(let i=0;i<formulasplit.length;i++)
    {
        let eachel=formulasplit[i];
        if(eachel[0].charCodeAt(0)>=65 && eachel[0].charCodeAt(0)<=90)
        {
            let row=eachel.slice(1)-1;
            let column=Number(eachel[0].charCodeAt(0))-65;
            formulasplit[i]=sheet[row][column].value;
        }
    }
    formulasplit=formulasplit.join(" ");
    return eval(formulasplit);
}

function updateCellAndDB(inputformula,evaluatedvalue)
{
    [row,column]=getRowColOfActiveCell();
    let cell=document.querySelector("#"+getIdOfActiveCell());
    let cellprop=sheet[row][column];

    cellprop.formula=inputformula;
        cellprop.value=evaluatedvalue;
        cell.innerText=evaluatedvalue;
}

function getrowcolumn(address)
{
    row=Number(address.slice(1))-1;
    column=Number(address[0].charCodeAt(0))-65;
    return [row,column];
}

function getCell(address)
{
    let cell=document.querySelector("#"+address);
    return cell;
}