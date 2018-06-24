let target = document.getElementById("result");

function DisplayValue(value){
    let div = document.createElement("div");
    target.appendChild(div);
    div.innerHTML = value;
}