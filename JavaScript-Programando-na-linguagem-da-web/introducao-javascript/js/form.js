var botaoAdicionarPaciente = document.querySelector('#adicionar-paciente');

botaoAdicionarPaciente.addEventListener('click', function(event){
    event.preventDefault();
 
    var form = document.querySelector('#formAdiciona')

    var paciente = obtemPacientesDoFormulario(form);

    
    var erros = validaPaciente(paciente);

    if(erros.length > 0){
        exibeMensagemDeErros(erros);
        return;
    }

    adicionaPacienteNaTabela(paciente);

    form.reset();
    document.querySelector('#mensagem-erro').textContent = "";

});

function adicionaPacienteNaTabela(paciente){
    
    var pacienteTr = montaTr(paciente);

    var tabelaPacientes = document.querySelector('#tabela-pacientes');

    tabelaPacientes.appendChild(pacienteTr);
}

function obtemPacientesDoFormulario(form){
    var paciente = {
        nome: form.nome.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value,
        imc: calculaImc(form.peso.value, form.altura.value)
    }

    return paciente;
}

function montaTr(paciente){
    var pacienteTr = document.createElement('tr');
    pacienteTr.classList.add('paciente');

    pacienteTr.appendChild(montaTd(paciente.nome, 'info-nome'));
    pacienteTr.appendChild(montaTd(paciente.peso, 'info-peso'));
    pacienteTr.appendChild(montaTd(paciente.altura, 'info-altura'));
    pacienteTr.appendChild(montaTd(paciente.gordura, 'info-gordura'));
    pacienteTr.appendChild(montaTd(paciente.imc, 'info-imc'));

    return pacienteTr;
}

function montaTd(dado, classe){
    var td = document.createElement('td');
    td.textContent = dado;
    td.classList.add(classe);

    return td;
}

function validaPaciente(paciente){

    var erros = [];

    if(paciente.nome.length == 0) erros.push('Nome não pode está em branco.');

    if(paciente.peso.length == 0) erros.push('Peso não pode está em branco.');

    if(paciente.altura.length == 0) erros.push('altura não pode está em branco.');

    if(paciente.gordura.length == 0) erros.push('Gordura não pode está em branco.');

    if(paciente.peso.length > 0 && !validaPeso(paciente.peso)) erros.push('Peso invalido.');   

    if(paciente.altura.length > 0 && !validaAltura(paciente.altura)) erros.push('Altura Invalida.');    

    return erros;
}

function exibeMensagemDeErros(erros){
    var ul = document.querySelector('#mensagem-erro');
    ul.innerHTML = "";
    
    erros.forEach(function(erro) {
        var li = document.createElement('li');
        li.textContent = erro;  
        ul.appendChild(li);
    });
}