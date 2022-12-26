


let sheet=[];

for(let i=0;i<100;i++)
{
    let sheetrow=[];
    for(let j=0;j<26;j++)
    {
        cellprop={
            fontFamily:"Times New Roman",
            fontSize:"12",
            bold:false,
            italic:false,
            underline:false,
            align:"left",
            fontColor:"black",
            bgColor:"transparent",
            value:"",
            formula:"",
            children:[]
        }
        sheetrow.push(cellprop);
    }
    sheet.push(sheetrow);
}

fontfamilyel=document.querySelector(".fontselect");
fontSizeel=document.querySelector(".fontsize");
boldel=document.querySelector(".bold");
underlineel=document.querySelector(".underline");
italicel=document.querySelector(".italic");
alignel=document.querySelectorAll(".align");
leftAlignel=alignel[0];
leftAlignel.style.backgroundColor="lightgray"
centerAlignel=alignel[1];
rightAlignel=alignel[2];
fontColorel=document.querySelector(".fontcolor");
bgColorel=document.querySelector(".bgcolor");
formulael=document.querySelector(".formula input")

let allcellsel=document.querySelectorAll(".grid-cell");
allcellsel.forEach((eachcell)=>
{
    eachcell.addEventListener("click",()=>
    {
        intializeProperties(eachcell);
    })
})

function intializeProperties(cell)
{
    [row,column]=getRowColOfActiveCell();
    cellprop=sheet[row][column];
    boldel.style.backgroundColor=cellprop.bold?"lightgray":"#ecf0f1";
    italicel.style.backgroundColor=cellprop.italic?"lightgray":"#ecf0f1";
    underlineel.style.backgroundColor=cellprop.underline?"lightgray":"#ecf0f1";
    fontfamilyel.value=cellprop.fontFamily;
    fontSizeel.value=cellprop.fontSize;
    fontColorel.value=cellprop.fontColor;
    bgColorel.value=cellprop.bgColor;
    formulael.value=cellprop.formula;
    let tempalign=cellprop.align;

    switch(tempalign)
    {
        case "left":
            leftAlignel.style.backgroundColor="lightgray";
            centerAlignel.style.backgroundColor="#ecf0f1";
            rightAlignel.style.backgroundColor="#ecf0f1";
            break;
        case "center":
            leftAlignel.style.backgroundColor="ecf0f1";
            centerAlignel.style.backgroundColor="lightgray";
            rightAlignel.style.backgroundColor="#ecf0f1";
            break;
        case "right":
            leftAlignel.style.backgroundColor="ecf0f1";
            centerAlignel.style.backgroundColor="#ecf0f1";
            rightAlignel.style.backgroundColor="lightgray";
            break;
    }

}



boldel.addEventListener("click",() =>
{
    [row,column]=getRowColOfActiveCell();
    let cell=document.querySelector("#"+getIdOfActiveCell());
    cellprop=sheet[row][column];
    cellprop.bold=!cellprop.bold;
    cell.style.fontWeight=cellprop.bold?"bold":"normal";
    boldel.style.backgroundColor=cellprop.bold?"lightgray":"#ecf0f1";

})

italicel.addEventListener("click",() =>
{
    [row,column]=getRowColOfActiveCell();
    let cell=document.querySelector("#"+getIdOfActiveCell());
    cellprop=sheet[row][column];
    cellprop.italic=!cellprop.italic;
    cell.style.fontStyle=cellprop.italic?"italic":"normal";
    italicel.style.backgroundColor=cellprop.italic?"lightgray":"#ecf0f1";
    console.log(cellprop);
})

underlineel.addEventListener("click",() =>
{
    [row,column]=getRowColOfActiveCell();
    let cell=document.querySelector("#"+getIdOfActiveCell());
    cellprop=sheet[row][column];
    cellprop.underline=!cellprop.underline;
    cell.style.textDecoration=cellprop.underline?"underline":"none";
    underlineel.style.backgroundColor=cellprop.underline?"lightgray":"#ecf0f1";
})

leftAlignel.addEventListener("click",() =>
{
    [row,column]=getRowColOfActiveCell();
    let cell=document.querySelector("#"+getIdOfActiveCell());
    cellprop=sheet[row][column];
    cellprop.align="left";
    cell.style.textAlign="left";
    leftAlignel.style.backgroundColor="lightgray";
    centerAlignel.style.backgroundColor="#ecf0f1";
    rightAlignel.style.backgroundColor="#ecf0f1";
})

centerAlignel.addEventListener("click",() =>
{
    [row,column]=getRowColOfActiveCell();
    let cell=document.querySelector("#"+getIdOfActiveCell());
    cellprop=sheet[row][column];
    cellprop.align="center";
    cell.style.textAlign="center";
    leftAlignel.style.backgroundColor="#ecf0f1";
    centerAlignel.style.backgroundColor="lightgray";
    rightAlignel.style.backgroundColor="#ecf0f1";
})

rightAlignel.addEventListener("click",() =>
{
    [row,column]=getRowColOfActiveCell();
    let cell=document.querySelector("#"+getIdOfActiveCell());
    cellprop=sheet[row][column];
    cellprop.align="right";
    cell.style.textAlign="right";
    leftAlignel.style.backgroundColor="#ecf0f1";
    centerAlignel.style.backgroundColor="#ecf0f1";
    rightAlignel.style.backgroundColor="lightgray";
})

fontfamilyel.addEventListener("change",(e)=>
{
    [row,column]=getRowColOfActiveCell();
    let cell=document.querySelector("#"+getIdOfActiveCell());
    cellprop=sheet[row][column];
    cellprop.fontFamily=fontfamilyel.value;
    cell.style.fontFamily=fontfamilyel.value;    
})

fontSizeel.addEventListener("change",(e)=>
{
    [row,column]=getRowColOfActiveCell();
    let cell=document.querySelector("#"+getIdOfActiveCell());
    cellprop=sheet[row][column];
    cellprop.fontSize=fontSizeel.value;
    cell.style.fontSize=fontSizeel.value+"px"; 
})

fontColorel.addEventListener("change",(e)=>
{
    [row,column]=getRowColOfActiveCell();
    let cell=document.querySelector("#"+getIdOfActiveCell());
    cellprop=sheet[row][column];
    cellprop.fontColor=fontColorel.value;
    cell.style.color=fontColorel.value;
})

bgColorel.addEventListener("change",(e)=>
{
    [row,column]=getRowColOfActiveCell();
    let cell=document.querySelector("#"+getIdOfActiveCell());
    cellprop=sheet[row][column];
    cellprop.bgColor=bgColorel.value;
    cell.style.backgroundColor=bgColorel.value;
})

function getRowColOfActiveCell()
{
    let addressel=document.querySelector(".formula-cont .rc");
    let activecell=addressel.innerText;
    let row=activecell.slice(1)-1;
    let column=Number(activecell[0].charCodeAt(0))-65;
    return [row,column];
}

function getIdOfActiveCell()
{
    let addressel=document.querySelector(".formula-cont .rc");
    return addressel.innerText;
}
