// Define a scene for your game
class MainScene extends Phaser.Scene {
    preload() {
        // Load assets here (images, sounds, etc.)
        //Cargar assets
        this.load.image('logo', 'assets/phaser-logo.png'); // You need to have this asset in an assets folder
    }

    create() {
        // Initialize game objects and settings here
        this.add.image(400, 300, 'logo'); // Add the loaded image to the scene

        // Example of adding physics to a sprite
        // const player = this.physics.add.sprite(100, 100, 'player'); 
    }

    update() {
        // Game logic that runs every frame (e.g., player movement, collision checks)
    }
}

// Configuration for the Phaser game instance
const config = {
    type: Phaser.AUTO, // Use WebGL if available, otherwise Canvas
    width: 800,
    height: 600,
    parent: 'game-container', // Attach the game to the 'game-container' div in index.html
    scene: MainScene, // The scene to use
    physics: {
        default: 'arcade', // Use the Arcade physics engine
        arcade: {
            gravity: { y: 300 }, // Optional gravity
            debug: false
        }
    }
};

// Create the main game instance when the window loads
window.onload = () => {
    var game = new Phaser.Game(config);
};
