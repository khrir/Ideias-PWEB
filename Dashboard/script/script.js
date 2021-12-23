const url_categoria_economica = 'https://raw.githubusercontent.com/khrir/Ideias-PWEB/main/Dashboard/database/Despesas_CE.csv';
const url_favorecido = 'https://raw.githubusercontent.com/khrir/Ideias-PWEB/main/Dashboard/database/Despesas_PF.csv';
const url_municipio = 'https://raw.githubusercontent.com/khrir/Ideias-PWEB/main/Dashboard/database/Repasses_M.csv';



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
    var jsonData = [];
    
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
    // var jsonString = JSON.stringify(jsonData);
    return jsonData;
}

function mkTable(url){
    getData(url)
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
    document.querySelector('#content-local').appendChild(table);
}

const xlabel = [];
const ylabel = [];

async function chartIt(url){
    await getDados(url);

    const ctx = document.getElementById('myChart');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: xlabel,
            datasets: [{
                label: 'Valor',
                data: ylabel,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rbga(255, 99, 132, 1',
                borderWidth: 1,
            }]
        }
    })
}

async function getDados(url){
    let response = await fetch(url);
    let data = await response.text();

    let table = data.split('\n').slice(1);
    table.forEach(row => {
        let columns = row.split(',');
        let custeio = columns[0];
        xlabel.push(parseFloat(custeio));
        let secretaria = columns[12];
        ylabel.push(secretaria);
        console.log(custeio, secretaria);
    });
}




