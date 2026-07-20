const numbersCount = document.getElementById('numbers-count');
const minNumber = document.getElementById('numbers-min');
const maxNumber = document.getElementById('numbers-max');
const toggleButton = document.getElementById('toggle-btn');
const form = document.getElementById('form');
const rePick = document.getElementById('again-button');
const resultsContainer = document.getElementById('results-container');
const resultsList = document.getElementById('results-list');
const goButton = document.getElementById('btn-go');
const infos = document.getElementById('infos');
const resultsScreen = document.getElementById('results-screen');
const questionsContainer = document.getElementById('questions-container');

numbersCount.oninput = () => {
    numbersCount.value = numbersCount.value.replace(/\D/g, '');
};
minNumber.oninput = () => {
    minNumber.value = minNumber.value.replace(/\D/g, '');
};
maxNumber.oninput = () => {
    maxNumber.value = maxNumber.value.replace(/\D/g, '');
};

goButton.addEventListener('click', () => {
    form.requestSubmit();
});

form.onsubmit = (event) => {
    event.preventDefault();

    const count = Number(numbersCount.value);
    const min = Number(minNumber.value);
    const max = Number(maxNumber.value);
    const noRepeat = toggleButton.checked; // Verifica se o toggle está ativo
    if (validation(min, max)) return; // Verifica se o max é maior que o min

    if (count === 0 || min === 0 || max === 0) {
        alert(
            'Por favor, preencha todos os campos com valores maiores que zero.'
        );
        return;
    }

    let list;
    if (noRepeat) {
        list = noRepeatNumbers(count, min, max); //
    } else {
        list = repeatNumbers(count, min, max);
    }

    showResults(list);
};

function validation(min, max) {
    if (max < min) {
        alert('O número máximo deve ser maior ou igual ao número mínimo.');
        return true;
    }
    return false;
}

function showResults(numbers) {
    rePick.style.display = 'none';
    rePick.disabled = true;

    infos.classList.remove('infos');
    infos.classList.add('hidden');
    form.classList.add('hidden');
    resultsScreen.classList.remove('hidden');
    questionsContainer.style.display = 'none';
    resultsList.innerHTML = '';

    let index = 0;

    function showNext() {
        if (index >= numbers.length) {
            rePick.style.display = 'flex';
            rePick.disabled = false;
            return;
        }

        const number = numbers[index];

        const li = document.createElement('li');
        li.classList.add('result-number');

        const square = document.createElement('div');
        square.classList.add('animation-box'); // sua animação

        const resultNumber1 = document.createElement('span');
        resultNumber1.classList.add('result-number1');
        resultNumber1.textContent = number;

        li.append(square, resultNumber1);
        resultsList.appendChild(li);

        // Só depois da ANIMAÇÃO do square terminar, exibe o próximo número
        square.addEventListener('animationend', () => {
            index++;
            showNext();
        });
    }

    showNext(); // inicia
}

function cleanForm() {
    numbersCount.value = '';
    minNumber.value = '';
    maxNumber.value = '';
    toggleButton.checked = false;
    numbersCount.focus();
}

function repeatNumbers(count, min, max) {
    const results = [];
    for (let i = 0; i < count; i++) {
        const randonNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        results.push(randonNumber);
    }
    return results;
}

function noRepeatNumbers(count, min, max) {
    const results = [];

    for (let i = min; i <= max; i++) {
        results.push(i);
    }

    for (let i = 0; i < count; i++) {
        const j = Math.floor(Math.random() * results.length);
        const temp = results[i];
        results[i] = results[j];
        results[j] = temp;
    }

    return results.slice(0, count);
}

rePick.onclick = () => {
    cleanForm();
    form.classList.remove('hidden');
    infos.classList.remove('hidden');
    infos.classList.add('infos'); // Oculta as informações

    resultsScreen.classList.add('hidden');
};
