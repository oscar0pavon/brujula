// Define la escena del juego Brujula

class MainScene extends Phaser.Scene {

    preload() {
        //Cargar los activos aqui (imagenes, sonidos, etc)
        //Cargar assets
        this.load.image('oceano', 'activos/oceano/oceano1.jpg')
        this.load.image('logo', 'activos/logo-juego.png');
        this.load.image('jugador', 'activos/barco/frente.png');
        this.load.image('brujula', 'activos/brujula/brujula.png');
      
    }



    // Funcion de cargar initializar

    create() {
        // Initializar los objetos de juegos y configuraciones aqui
        // Los numeros son la posicion de la imagen
        let logo = this.add.image(40, 40, 'logo');
        logo.setScale(0.1);

        this.brujula = this.add.image(1200, 600, 'brujula');
        this.brujula.setScale(0.2);
        var dimension_oceano = 2000;
        this.oceano = this.add.tileSprite(0,0, dimension_oceano,
          dimension_oceano, "oceano").setOrigin(0,0);

        this.cameras.main.setBounds(0, 0 , dimension_oceano, dimension_oceano);


        this.jugador = this.physics.add.sprite(640, 360, 'jugador');
        this.jugador.setScale(0.2);
        //this.jugador.setCollideWorldBounds(true); // Para que no se salga de la pantalla

        this.teclas = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });
        
        this.cameras.main.startFollow(this.jugador, true, 0.1, 0.1);

        //isla
        this.isla = { x: 3600, y: 600 };

        // Agregar fisicas al jugador (sprite)
        // const jugador = this.physics.add.sprite(100, 100, 'jugador'); 
    }

    //Funcion que se repite cada frame
    update() {

        var velocidad_movimiento_olas = 0.06;

        this.oceano.tilePositionX += velocidad_movimiento_olas;
        this.oceano.tilePositionY += velocidad_movimiento_olas;

        // Velocidad constante
        const velocidad = 300;

        if (this.jugador.body.velocity.length() > 90) {
            this.jugador.rotation = this.jugador.body.angle;
        }

        let anguloAlaIsla = Phaser.Math.Angle.Between(
            this.jugador.x, this.jugador.y,
            this.isla.x, this.isla.y
        );

        // Aplicamos la rotación a la brújula (sumamos 1.57 por que la imagen de brújula apunta originalmente a la derecha)
        this.brujula.rotation = anguloAlaIsla + 1.57;


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
