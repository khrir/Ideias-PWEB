const url_categoria_economica = '../database/Despesas_CE.csv';
const url_favorecido = '/database/Despesas_PF.csv';
const url_municipio = '../database/Repasses_M.csv';



async function getData(url){
    // fetch data
    const response = await fetch(url);
    // process data
    const rawData = await response.text();

    // convert to json
    let arrayOne = rawData.split("\r\n");
    let header = arrayOne[0].split(",");
    let noOfRow = arrayOne.length;
    let noOfCol = header.length;
    let jsonData = [];
    
    // loop (rows)
    for(let i = 1; i < noOfRow - 1; i++){
        let obj = {};
        let newLine = arrayOne[i].split(",");
        // loop (column)
        for(let j = 0; j < noOfCol; j++){
            obj[header[j]] = newLine[j];
        }
        // generate json
        jsonData.push(obj)
    }
    jsonString = JSON.stringify(jsonData);

    // Initialize
    let children = jsonData;
    let table = document.createElement("table");

    // function to generate table header row
    function addHeader(table, keys){
        let row = table.insertRow();
        for (let i = 0; i < keys.length; i++){
            let cell = row.insertRow();
            cell.appendChild(document.createTextNode(keys[i]));
        }
    }

    // generate table
    for(let i = 0; i < children.length; i++){
        let child = children[i];
        if(i === 0){
            addHeader(table, Object.keys(child));
        }
        let row = table.insertRow();
        Object.keys(child).forEach(k => {
            let cell = row.insertCell();
            cell.appendChild(document.createTextNode(child[k]));
        });
    }
    
    // publish table
    document.getElementById('content-local').appendChild(table);
}

getData(url_favorecido);

