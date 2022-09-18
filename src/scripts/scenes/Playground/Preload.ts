import Phaser from 'phaser'

export class Preload extends Phaser.Scene {
  constructor() {
    super({ key: 'PTile' })
  }

  preload() {
    // this.load.tilemapTiledJSON('playground_level', 'assets/platform/platform.json')
    // this.load.image('GRASS', "assets/platform/GRASS.png")
    this.load.image('sky', 'assets/platform/sky.png')
    this.load.image('grass', 'assets/platform/GRASS.png')
  }

  create() {
    // this.add.image(0, 0, 'sky')
    this.scene.start('Playground')
  }
}
