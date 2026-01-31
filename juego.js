// Define la escena del juego Brujula

class MainScene extends Phaser.Scene {

    preload() {
        //Cargar los activos aqui (imagenes, sonidos, etc)
        //Cargar assets
        this.load.image('oceano', 'activos/oceano/oceano1.jpg')
        this.load.image('logo', 'activos/logo-juego.png');
        this.load.image('jugador', 'activos/barco/frente.png');
        this.load.image('brujula', 'activos/brujula/brujula.png');
        this.load.image('isla_imagen', 'activos/isla/isla1.png');

        this.load.image('rocas_clave', 'activos/rocas/roca1.png')

        this.load.image('jugador_costado', 'activos/barco/costado1.png');

        this.load.image('corazon', 'activos/hud/corazon.png');
    }



    // Funcion de cargar initializar

    create() {
        // Initializar los objetos de juegos y configuraciones aqui
        // Los numeros son la posicion de la imagen
        let logo = this.add.image(40, 40, 'logo');
        logo.setScale(0.1);


        this.vidas = this.add.group();

      const cantidad_de_vidas = 3;



        var dimension_oceano = 2000;
        this.oceano = this.add.tileSprite(0, 0, dimension_oceano,
            dimension_oceano, "oceano").setOrigin(0, 0);

        this.cameras.main.setBounds(0, 0, dimension_oceano, dimension_oceano);

        //isla
        this.isla = { x: 1000, y: 1000 };
        this.isla_imagen = this.add.image(this.isla.x, this.isla.y, 'isla_imagen') ;

        this.isla_imagen.setScale(0.2);
        this.isla_imagen = this.physics.add.sprite(this.isla.x, this.isla.y, 'isla_imagen');
        this.isla_imagen.setScale(0.2);
        this.isla_imagen.setImmovable(true);
        this.isla_imagen.body.setSize(this.isla_imagen.width * 0.5, this.isla_imagen.height * 0.5);



        this.jugador = this.physics.add.sprite(640, 360, 'jugador');
        this.jugador.setScale(0.2);
        this.jugador.body.setSize(600,300);


        //this.jugador.setCollideWorldBounds(true); // Para que no se salga de la pantalla

        this.cameras.main.startFollow(this.jugador, true, 0.1, 0.1);


        this.rocas = this.physics.add.staticGroup();

        for(let i = 0; i < 20; i++){
          let x = Phaser.Math.Between(0, dimension_oceano);
          let y = Phaser.Math.Between(0, dimension_oceano);

          let piedra = this.rocas.create(x,y, 'rocas_clave');

          piedra.setScale(0.2);

          piedra.body.setSize(100, 100);


          piedra.refreshBody();

        }
        
      //HUD

        // brujula
        this.brujula = this.add.image(1200, 640, 'brujula'); // Posición relativa a la ventana
        this.brujula.setScale(0.2);
        this.brujula.setScrollFactor(0);


      //vidad
      for(let i = 0; i < cantidad_de_vidas; i++){
          let pisicion_x = 50 + (i * 50);
          let vida_imagen = this.vidas.create(pisicion_x, 50, 'corazon')
          vida_imagen.setScale(0.3);
      }
        


        //Entrada de teclado 
        this.teclas = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });

        //colisiones
        this.physics.add.collider(this.jugador, this.isla_imagen, this.colisionarConIsla, null, this);
        this.physics.add.collider(this.jugador, this.rocas);


    }

  esta_chocando(barco, roca){
    let vidas_actuales = this.vidas.getChildren();
    
    if(vidas_actuales.length > 0){
     
      let ultimo_corazon = vidas_actuales[vidas_actuales.length - 1];

      ultimo_corazon.destroy();

      if( vidas_actuales.length === 0 ){
        //mostrar "Juego Perdido"
      }

    }

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

        //aplicar rotacion a la brujula
        this.brujula.rotation = anguloAlaIsla + 1.57;


        this.jugador.setVelocity(0);
        if (this.teclas.left.isDown) {
            this.jugador.setVelocityX(-velocidad);
            this.jugador.setTexture('jugador_costado');
            this.jugador.setFlipY(true);
        } else if (this.teclas.right.isDown) {
            this.jugador.setVelocityX(velocidad);
            this.jugador.setTexture('jugador_costado');
            this.jugador.setFlipY(false);
        }

        if (this.teclas.up.isDown) {
            this.jugador.setVelocityY(-velocidad);
            this.jugador.setTexture('jugador');
        } else if (this.teclas.down.isDown) {
            this.jugador.setVelocityY(velocidad);
            this.jugador.setTexture('jugador');
        }
    }

    //funcion de colision con isla
    colisionarConIsla(jugador, isla) {
        this.physics.pause();
        // Creacion del texto flotante
        let textoGanaste = this.add.text(640, 360, 'GANASTE', {
            fontSize: '64px',
            fill: '#ffffff',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 6,
            fontFamily: 'Arial'
        });

        // Configuraciones
        textoGanaste.setOrigin(0.5);
        textoGanaste.setScrollFactor(0);
        textoGanaste.setDepth(1000);
        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.restart();
        });

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
            gravity: { y: 0 }, // Optional gravity
            debug: false
        }
    }
};

// Create la escena principal cuando la ventana carga
window.onload = () => {
    var juego = new Phaser.Game(configuracion);
};
