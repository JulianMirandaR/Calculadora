
const displayValorAnterior = document.getElementById('valor-anterior');
const displayValorActual = document.getElementById('valor-actual');
const botonesNumeros = document.querySelectorAll('.btn-number');
const botonesOperadores = document.querySelectorAll('.btn-operator');
const btnClearAll = document.getElementById('btn-clear-all');
const btnDelete = document.getElementById('btn-delete');
const themeBtn = document.getElementById('theme-btn');

const display = new Display(displayValorAnterior, displayValorActual);

// Event Listeners for Numbers
botonesNumeros.forEach(boton => {
    boton.addEventListener('click', () => display.agregarNumero(boton.innerText));
});

// Event Listeners for Operators
botonesOperadores.forEach(boton => {
    boton.addEventListener('click', () => display.computar(boton.value));
});

// Clear All
if (btnClearAll) {
    btnClearAll.addEventListener('click', () => display.borrarTodo());
}

// Delete / Backspace
if (btnDelete) {
    btnDelete.addEventListener('click', () => display.borrar());
}

// Theme Toggle
const body = document.body;
const themeIcon = themeBtn.querySelector('i');

// Check local storage
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.add('light-theme');
    if (themeIcon) themeIcon.className = 'ri-sun-line';
}

if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        const isLight = body.classList.contains('light-theme');
        if (themeIcon) themeIcon.className = isLight ? 'ri-sun-line' : 'ri-moon-line';
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
}

// Keyboard Support
document.addEventListener('keydown', (e) => {
    const key = e.key;

    // Numbers and Dot
    if (/[0-9]/.test(key)) {
        display.agregarNumero(key);
    } else if (key === '.') {
        display.agregarNumero(key);
    }
    // Operators
    else if (key === '+' || key === '-') {
        const op = key === '+' ? 'sumar' : 'restar';
        display.computar(op);
    } else if (key === '*' || key === 'x') {
        display.computar('multiplicar');
    } else if (key === '/') {
        display.computar('dividir');
    }
    // Equals
    else if (key === 'Enter' || key === '=') {
        e.preventDefault();
        display.computar('igual');
    }
    // Deletion
    else if (key === 'Backspace') {
        display.borrar();
    } else if (key === 'Escape') {
        display.borrarTodo();
    }
});

// Copy to Clipboard feature
const displayContainer = document.querySelector('.display');
displayValorActual.addEventListener('click', () => {
    if (!display.valorActual) return;

    if (navigator.clipboard) {
        navigator.clipboard.writeText(display.valorActual).then(() => {
            // Visual feedback
            displayContainer.classList.add('copied-animation');
            setTimeout(() => {
                displayContainer.classList.remove('copied-animation');
            }, 300);
        }).catch(err => {
            console.error('Failed to copy', err);
        });
    }
});