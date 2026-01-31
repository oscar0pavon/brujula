// Define la escena del juego Brujula

class MainScene extends Phaser.Scene {

    preload() {
        //Cargar los activos aqui (imagenes, sonidos, etc)
        //Cargar assets
        this.load.image('logo', 'activos/logo-juego.png');
        this.load.image('jugador', 'activos/barco/frente.png');
    }



    // Funcion de cargar initializar

    create() {
        // Initializar los objetos de juegos y configuraciones aqui
        // Los numeros son la posicion de la imagen
        let logo = this.add.image(40, 40, 'logo');
        logo.setScale(0.1);

        this.jugador = this.physics.add.sprite(640, 360, 'jugador');
        this.jugador.setScale(0.2);
        this.jugador.setCollideWorldBounds(true); // Para que no se salga de la pantalla

        this.teclas = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });

        // Agregar fisicas al jugador (sprite)
        // const jugador = this.physics.add.sprite(100, 100, 'jugador'); 
    }

    //Funcion que se repite cada frame
    update() {
        // Velocidad constante
        const velocidad = 300;

        if (this.jugador.body.velocity.length() > 90) {
            this.jugador.rotation = this.jugador.body.angle;
        }

        // Resetear velocidad en cada frame para que no se mueva solo
        this.jugador.setVelocity(0);

        if (this.teclas.left.isDown) {
            this.jugador.setVelocityX(-velocidad);
        } else if (this.teclas.right.isDown) {
            this.jugador.setVelocityX(velocidad);
        }

        if (this.teclas.up.isDown) {
            this.jugador.setVelocityY(-velocidad);
        } else if (this.teclas.down.isDown) {
            this.jugador.setVelocityY(velocidad);
        }
    }
}

// Configuracion de la instacia del juego Phaser framework

const configuracion = {
    type: Phaser.AUTO, // Use WebGL if available, otherwise Canvas
    width: 1280,
    height: 720,
    parent: 'contenedor-juego', // Cambiar al nombre del index.html
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
