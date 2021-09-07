function iniciarModal (modalID){
    const modal = document.getElementById(modalID);
    
    if(modal){
        modal.classList.add('mostrar');

        modal.addEventListener('click', (e) => {
            if(e.target.id == modalID || e.target.className == 'fechar'){
                modal.classList.remove('mostrar');
            }
        });
    }
}

const logo = document.querySelector('.logo');
logo.addEventListener('click', () => iniciarModal('modal-box'));

