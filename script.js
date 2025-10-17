
const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')

// Todos botoes em um "array"
const botoes = document.querySelectorAll('.app__card-button')

// imagens
const banner = document.querySelector('.app__image')


const title = document.querySelector('.app__title')

// musica
const musicFocoInput = document.querySelector('#alternar-musica')
const music = new Audio('./sons/luna-rise-part-one.mp3') 
music.loop = true;

//sons
const musicPlay = new Audio('./sons/play.wav')
const musicPause = new Audio('./sons/pause.mp3')
const musicTempoFinalizado = new Audio('./sons/beep.mp3')

// Variável que vai armazenar o temporizador
let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

// Botao "começar"
const startPauseBt = document.querySelector('#start-pause') 
const iniciarOuPausarBt = document.querySelector('#start-pause span')

// Imagem play e pause
//const imgPlay = 

// Temporizador
const temoporizador = document.querySelector('#timer')

musicFocoInput.addEventListener('change', () => {
    if(music.paused) {
        music.play()
    } else {
        music.pause();
    }
})


focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    mostrarTempo()
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    mostrarTempo()
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    mostrarTempo()
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto(contexto) {
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto) 
    banner.setAttribute('src', './imagens/' + contexto + '.png')
    switch(contexto) {
        case "foco":
            title.innerHTML = 'Otimize sua produtividade,<br> <strong class="app__title-strong">mergulhe no que importa.</strong>'
        break;

        case "descanso-curto":
            title.innerHTML = 'Está na hora de relaxar,<br> <strong class="app__title-strong">mergulhe na sua respiração.</strong>'
        break;

        case "descanso-longo":
            title.innerHTML = 'Precisa de mais tempo?,<br> <strong class="app__title-strong">tranquilize sua mente.</strong>'
        break;

        default:
            break;
    }
}

startPauseBt.addEventListener('click', iniciarOuPausar)

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0) {
        zerar()
        musicTempoFinalizado.play()
        return
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo()
}

function iniciarOuPausar () {
    if(intervaloId) {
        musicPause.play()
        zerar()
        return
    }
    musicPlay.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent = "Pausar"
}

function zerar() {
    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent = "Começar"
    intervaloId = null
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    temoporizador.innerHTML = tempoFormatado
}

mostrarTempo()