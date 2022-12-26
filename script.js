
let gridcolcont=document.querySelector(".gridcolcont");
let gridrowaddresscont=document.querySelector(".gridaddressrowcont");
let gridcellcontel=document.querySelector(".gridrowcont");
let displayselectecellel=document.querySelector(".formula-cont .rc");

let columns=26;
let rows=100;

for(let i=0;i<rows;i++)
{
    let addressrowel=document.createElement("div");
    addressrowel.classList.add("address-row");
    addressrowel.innerText=`${i+1}`;
    gridcolcont.appendChild(addressrowel);
}


for(let i=0;i<columns;i++)
{
    let addresscolel=document.createElement("div");
    addresscolel.classList.add("address-col");
    addresscolel.innerText=String.fromCharCode(65+i);
    gridrowaddresscont.appendChild(addresscolel);
}

for(let i=0;i<rows;i++)
{
    let gridrowel=document.createElement("div");
    gridrowel.classList.add("gridaddressrowcont");
    for(let j=0;j<columns;j++)
    {

        let gridcellel=document.createElement("div");
        gridcellel.classList.add("grid-cell");
        getselectedcell(gridcellel,i,j);
        gridcellel.setAttribute("contenteditable","true");
        gridcellel.setAttribute("id",`${String.fromCharCode(65+j)}${i+1}`);
        gridrowel.appendChild(gridcellel);
    }
    gridcellcontel.appendChild(gridrowel);
}

function getselectedcell(gridcellel,i,j)
{
    gridcellel.addEventListener("click",()=>
    {
        displayselectecellel.innerText=`${String.fromCharCode(65+j)}${i+1}`;
    });
}

