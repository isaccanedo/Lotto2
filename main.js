/*
PROBLEMA: Crie uma aplicação web com html e javascript para controlar apostas da lotofacil
Requisitos:
1. A aplicação deve permitir que multiplos jogos sejam armazenados para conferencia
2. A aplicação deve permitir a entradade de um resultado sorteado (campeão) em formato de string.
3. A aplicação deve permitir que o usuário limpe todo o seu volante.
4. A aplicação deve permitir que o usuário preencha automaticamente os campos, por exemplo, se eu clico nos botões
   1,2,3 a aplicação deve me gerar mais 12 numeros aleatório para preencher aquele jogo.
5. A aplicação deve permitir que o usuário remova um jogo previamente feito da da coluna de apostas feitas.
6. O resultado final do processamento deve exibir o jogo em questão, a quantidade de acertos e os números acertados.
Exemplo: 
 O jogo {1}, teve {3} acertos.
 O jogo {4}, teve {9} acertos.

 Regra da Lotofácil:
 A lotofácil é um jogo que possui 25 números, e desses 25 você deve marcar 15, para ganhar algum premio você precisa acertar 11,12,13,14 ou 15 números.

 Observações:
 - Elementos repitidos priorizem por utilizar a criação do elemento pelo lado do javascript, não estruturando diretamente dentro do html.
 - Qualquer dúvida a respeito dos requisitos fiquem a vontade pra me chamar
 - Não façam o commit no repositório até a avaliação, a avaliação desse teste será na terça-feira (02/11) durante a nossa daily ou se por ventura vocês terminarem antes
 me avisem que eu avalio.
 - O código deve ser o mais sintético e intuitvo possível, englobando definição de funcões, nomes de variáveis e sintaxe (evitando if, else desnecessário)
 - Utilize as validações necessárias para não quebrar a aplicação ou acontecer fluxos indesejáveis
 Bom teste a todos!
*/

(function (win, doc) {
    'use strict';

    let $visor = doc.querySelector('[data-js="visor"]');
    let $visorResult = doc.querySelector('[data-js="visorResult"]');
    let $buttonsNumbers = doc.querySelectorAll('[data-js="btn-numbers"]');
    let $buttonClean = doc.querySelector('[data-js="btn-clean"]');
    let $buttonSave = doc.querySelector('[data-js="btn-save"]');
    let $buttonComplete = doc.querySelector('[data-js="btn-complete"]');
    let $buttonLotto = doc.querySelector('[data-js="btn-lotto"]');
    let $gameSave = doc.querySelector('[data-js="jogo-salvo"]');
    let $gameResult = doc.querySelector('[data-js="game-result"]');

    let aposta = [];
    let arrCompleteNumbers = [];
    let arrLottoNumbers = [];

    Array.prototype.forEach.call($buttonsNumbers, function (button) {
        button.addEventListener('click', handleClickNumber, false);
    });

    $buttonClean.addEventListener('click', handleClickClean, false);
    $buttonSave.addEventListener('click', handleSaveGame, false);
    $buttonComplete.addEventListener('click', handleComplete, false);
    $buttonLotto.addEventListener('click', handleLotto, false);

    function handleClickClean(event) {
        $visor.value = '';
        let $numbers = doc.querySelectorAll('[data-js="btn-numbers"]');
        $numbers.forEach((number) => {
            number.style.background = "#ccc"
            number.disabled = false;
        })
    };

    function handleClickNumber(event) {
        var novoArray = [];
        const number = this.value
        if (!$visor.value.split(',').includes(number)) {
            console.log(number)
            if ($visor.value.split(',').length <= 15 ){
                $visor.value += number +',';
                novoArray = $visor.value.split(",");
                novoArray.pop();
                console.log(novoArray)
                event.target.style.background = "#2bb08e"
            }           
        } else {
            let array = $visor.value.split(',')
            let index = array.findIndex(element => element == number) // Pegar o index do numero repetido que vc digitou
            delete array[index]  // apagar esse numero do array
            let newArray = array.filter(el => el) // remover o "empty" do array e criar um novo array sem esse numero
            $visor.value = newArray.join()+',';
            console.log('na',newArray)
            event.target.style.background = "#ccc"
        }
    };

    function handleComplete() {
        while (arrCompleteNumbers.length <= 15) {
            var random = Math.floor(Math.random() * 25) + 1;
            document.getElementById(random.toString()).style.background = "#2bb08e"
            document.getElementById(random.toString()).style.disabled = true;
            if (arrCompleteNumbers.indexOf(random) == -1)
                arrCompleteNumbers.push(random);
        }
        // console.log('Complete', arrCompleteNumbers);
        $visor.value = arrCompleteNumbers;
        arrCompleteNumbers = [];
        return arrCompleteNumbers
    };

    function handleLotto(event) {
        event.preventDefault(event);
        while (arrLottoNumbers.length < 15) {
            var random = Math.floor(Math.random() * 25).toString();
            if (arrLottoNumbers.indexOf(random) == -1)
                arrLottoNumbers.push(random);
        }
        $visorResult.value = arrLottoNumbers;
        Compare(arrLottoNumbers)
        console.log('Lotto', $visorResult.value);
        $buttonComplete.disabled = true;
        $buttonComplete.style.opacity = ".5"

        // let abc = $visorResult.value 
        // if (  $visorResult.value  = '' ){
        //     alert('É necessário ter um jogo completo');
        //     window.location="/index.html";
        // }
    };

    function Compare(resultLotofacil) {
        var apostas = aposta;
        var todasApostas = []

        for (aposta of apostas) {
            todasApostas.push(aposta.split(','))
        }
        todasApostas.forEach((jogo, i) => {
            var result = [];
            resultLotofacil.forEach((numero) => {
                if (jogo.includes(numero))
                    result.push(numero);
            });
            var childP = document.createElement("p");
            var node = document.createTextNode(`O jogo ${i + 1}, teve ${result.length} acertos ${result}`);
            childP.appendChild(node);
            var element = $gameResult
            element.appendChild(childP);
        });
    };

    function myFunction() {
        alert("é necessário adicionar 15 números");
      }

    function handleSaveGame(selection) {
        selection = $visor.value;
        var childP = document.createElement("p");
        var node = document.createTextNode(selection);
        childP.appendChild(node);
        var element = $gameSave

        var childButon = document.createElement("button");
        var node1 = document.createTextNode('x');
        childButon.appendChild(node1);
        var element1 = $gameSave
        childButon.setAttribute('class', 'btn-close')

        childButon.addEventListener('click', function (e) {
            childP.parentNode.removeChild(childP);
            e.target.remove();
        }, false);
        handleClickClean()


        console.log('aposta', aposta)
        aposta.push(selection)

        console.log(selection.length)
        if (selection.length >= 36) {
            element1.appendChild(childButon);
            element.appendChild(childP);
        } else {
           
            aposta = [];
           
            myFunction()
        }
    };
  
})(window, document)