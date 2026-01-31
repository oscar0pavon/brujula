class MenuPrincipal extends Phaser.Scene {

  constructor() {
    super('MenuPrincipal');
  }

  preload() {
    // Cargamos el fondo y el logo
    this.load.image('oceano', 'activos/oceano/oceano1.jpg')
    this.load.image('fondo_menu', 'activos/fondo_menu/fondo_menu.png');
    this.load.image('logo', 'activos/logo-juego.png');
  }

  create() {
    // imagen de fondo 
    this.fondoMenu = this.add.tileSprite(0, 0, 1280, 720, 'oceano').setOrigin(0, 0);
    let fondo = this.add.image(640, 360, 'fondo_menu');
    fondo.setDisplaySize(1280, 720);

    //logo
    let logo = this.add.image(640, 250, 'logo').setScale(0.4);


    // Botón de EMPEZAR
    let botonEmpezar = this.add.text(640, 450, ' EMPEZAR JUEGO ', {
      fontSize: '40px',
      fill: '#ffffff',
      backgroundColor: '#0077be', // Color azul océano
      padding: { x: 20, y: 10 },
      fontStyle: 'bold'
    })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true }); // Cambia el cursor a una manito

    //eventos del boton

    // Inicia la escena de la Brújula
    botonEmpezar.on('pointerdown', () => {
      this.scene.start('Brujula');
    });

    // Efecto al pasar el mouse 
    botonEmpezar.on('pointerover', () => {
      botonEmpezar.setStyle({ fill: '#ff0', backgroundColor: '#005a8e' });
    });

    // Efecto al sacar el mouse
    botonEmpezar.on('pointerout', () => {
      botonEmpezar.setStyle({ fill: '#fff', backgroundColor: '#0077be' });
    });

  }
  update() {
    // Movimiento suave del océano en el menú para que no sea estático
    this.fondoMenu.tilePositionX += 0.06;
    this.fondoMenu.tilePositionY += 0.06;
  }
}