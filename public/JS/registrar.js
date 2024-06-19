const formRegistrar = document.querySelector('#formRegistrar');

formRegistrar.addEventListener('submit', async(e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {};
    
    formData.forEach((valor, chave) => {
        data[chave] = valor;
    });

    await registrar('/registrar', data);

});

async function registrar(url, data) {
    try {
        const response = await fetch (url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if(response.ok) {
            alert('Usuario cadastrado com sucesso');
        } else {
            alert('Email ja cadastrado');
        }
    } catch(err) {    
        console.log('Erro ' + err);
    }
}
