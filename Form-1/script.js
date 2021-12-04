class Cadastro{
	
    constructor(){
        this.id = 1;
        this.listaCadastro = [];
    }
    
    armazenar(){
        let cadastro = this.lerDados();
      
        this.add(cadastro);
        this.addTabela();
    }
    
    add(cadastro){
        this.listaCadastro.push(cadastro);
        this.id++;
    }
    
    addTabela(){
        let tbody = document.getElementById('tbody');
        tbody.innerText = '';
      
        for(let i = 0; i < this.listaCadastro.length; i++){
            let linha = tbody.insertRow();
        
            let col_id = linha.insertCell();
            let col_nome = linha.insertCell();
            let col_breed = linha.insertCell();
            let col_idade = linha.insertCell();
            let col_categoria = linha.insertCell();
        
            col_id.innerText = this.listaCadastro[i].id;
            col_nome.innerText = this.listaCadastro[i].nome;
            col_breed.innerText = this.listaCadastro[i].breed;
            col_idade.innerText = this.listaCadastro[i].idade;
            col_categoria.innerText = this.listaCadastro[i].categoria;
        }
    }
    
    lerDados(){
        let cadastro = {};
        cadastro.id = this.id;
        cadastro.nome = document.getElementById('nome').value;
        cadastro.breed = document.getElementById('breed').value;
        cadastro.idade = document.getElementById('idade').value;
        cadastro.categoria = document.getElementById('categoria').value;
      
        return cadastro;
    }
}
  
const form = document.getElementById('form');
var cadastro = new Cadastro();
  
form.addEventListener('submit', function(event){
    event.preventDefault();
});