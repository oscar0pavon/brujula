
// Configuracion de la instacia del juego Phaser framework

const configuracion = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    parent: 'contenedor-juego',
    scene: [MenuPrincipal, Brujula],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    audio: {
        disableWebAudio: false
    }
};


// Create la escena principal cuando la ventana carga
window.onload = () => {
    var juego = new Phaser.Game(configuracion);
};
