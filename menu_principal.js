
class MenuPrincipal extends Phaser.Scene {

  constructor() {
        super('MenuPrincipal');
  }

  preload() {

  }

  create() {
    this.add.text(640, 360, 'EMPEZAR', { fill: '#fff' })
            .setInteractive()
            .on('pointerdown', () => this.scene.start('Brujula'));
  }

}
