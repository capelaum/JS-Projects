/* Validador de CPF */

// Algoritmo para geração de CPF - https://www.geradorcpf.com/algoritmo_do_cpf.html

function validacao() {
    console.log('Iniciando Validação de CPF..');

    // Limpa msgs de success/error
    document.getElementById('success').style.display = 'none';
    document.getElementById('error').style.display = 'none';

    let cpf = document.getElementById('cpf_digitado').value;

    // Passa CPF formatada  - sem '.' e '-'
    const resultadoValidacao = validaCPF(removeFormatCPF(cpf));

    if(resultadoValidacao){
        document.getElementById('success').style.display = 'block';
    }else {
        document.getElementById('error').style.display = 'block';
    }
}

function validaCPF(cpf) {
    
    if(cpf.length != 11) {
        return false;
    }else {

        let numeros = cpf.substring(0, 9);
        let digitos = cpf.substring(9, 11);

        // console.log('numeros do cpf: ' + numeros);
        // console.log('digitos verificadores do cpf: ' + digitos);

        // guarda o somatório dos pesos de cada dígito do CPF
        let soma = 0;
        for(let i = 10; i > 1; i--) {
            soma += numeros.charAt(10 - i) * i;
            // console.log('charAt() = ' + numeros.charAt(10-i));
            // console.log('i = ' + i + ' Soma = ' + soma);
        }
        
        //console.log(soma);

        let resultado = (soma % 11) < 2 ? 0 : 11 - (soma % 11);

        // Validação do primeiro digito
        //* Obs: verifica usando comparação entre um numero e uma string!
        if(resultado != digitos.charAt(0)) {
            console.log("primeiro digito inválido!");
            return false;
        }

        soma = 0;

        numeros = cpf.substring(0, 10);

        for(i = 11; i > 1; i--) {
            soma += numeros.charAt(11 - i) * i;
            // console.log('charAt() = ' + numeros.charAt(10-i));
            // console.log('i = ' + i + ' Soma = ' + soma);
        }

        //console.log(soma);

        resultado = (soma % 11) < 2 ? 0 : 11 - (soma % 11);

        // Validação do segundo digito
        if(resultado != digitos.charAt(1)) {
            console.log("segundo digito inválido!");
            return false;
        }

        return true;
    }
}

// Gerador de CPF

function generateCPF() {

    let numbers = "";
    let pos = 0;

    while (numbers.length <= 8) {
        pos = Math.floor(Math.random() * 10);
        numbers += pos.toString();
    }

    let sum = 0,
        mult = 0;

    for (let i = 0; i <= 8; i++) {
        sum = numbers.charAt(i) * (10 - i);
        mult += sum;
    }

    numbers += mult % 11 < 2 ? 0 : 11 - (mult % 11);

    sum = 0;
    mult = 0;

    for (let k = 0; k <= 9; k++) {
        sum = numbers.charAt(k) * (11 - k);
        mult += sum;
    }

    numbers += mult % 11 < 2 ? 0 : 11 - (mult % 11);
    numbers = formatCPF(numbers);

    document.getElementById("cpf_digitado").value = numbers;
    console.log(numbers);
}

function formatCPF(cpf) {
    cpf = cpf.replace(/\D/g, "");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    
    return cpf;
}

// formata CPF sem os 2 pontos '.' e traço '-'
function removeFormatCPF(cpf){
    cpf = cpf.replace(".", "");
    cpf = cpf.replace(".", "");
    cpf = cpf.replace("-", "");
    return cpf;
}

function format() {
    let numbers = document.getElementById("cpf_digitado").value;  
    document.getElementById("cpf_digitado").value = formatCPF(numbers);
}



