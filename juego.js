// Define la escena del juego Brujula

class MainScene extends Phaser.Scene {

    preload() {
        //Cargar los activos aqui (imagenes, sonidos, etc)
        //Cargar assets
        this.load.image('logo', 'activos/logo-juego.png');
    }

  

    // Funcion de cargar initializar

    create() {
        // Initializar los objetos de juegos y configuraciones aqui

        this.add.image(400, 300, 'logo'); 

        // Agregar fisicas al jugador (sprite)
        // const jugador = this.physics.add.sprite(100, 100, 'jugador'); 
    }


    //Funcion que se repite cada frame
    update() {
      // Logica del juego, se ejecuta cada frame ( cada actualizacion de images por segundos )
      // Por ejemplo a 30 fps (frame per seconds)
    }
}

// Configuracion de la instacia del juego Phaser framework

const configuracion = {
    type: Phaser.AUTO, // Use WebGL if available, otherwise Canvas
    width: 800,
    height: 600,
    parent: 'game-container', // Cambiar al nombre del index.html
    scene: MainScene, // La escena a usar
    physics: {
        default: 'arcade', // Use the Arcade physics engine
        arcade: {
            gravity: { y: 300 }, // Optional gravity
            debug: false
        }
    }
};

// Create la escena principal cuando la ventana carga
window.onload = () => {
    var juego = new Phaser.Game(configuracion);
};
