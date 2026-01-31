class MenuPrincipal extends Phaser.Scene {

  constructor() {
    super('MenuPrincipal');
  }

  preload() {
    // Cargamos el fondo y el logo
    this.load.image('fondo_menu', 'activos/fondo_menu/fondo_menu.png');
  }

  create() {
    // imagen de fondo 
    let fondo = this.add.image(640, 360, 'fondo_menu');
    fondo.setDisplaySize(1280, 720);


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
}