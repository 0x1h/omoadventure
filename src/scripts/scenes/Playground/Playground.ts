import Phaser from 'phaser'

export class Playground extends Phaser.Scene {
  constructor() {
    super({ key: 'Playground' })
  }

  preload() {
    this.load.tilemapTiledJSON('map', 'assets/sprites/omotemplate.json')
    this.load.image('tiles-1', 'assets/sprites/grass.png')
  }

  create() {
    const map = this.make.tilemap({key: "map"})
    const tielset = map.addTilesetImage('grass_template', 'tiles-1')

    map.createLayer('platforms', tielset)
  } 
}

export default Playground
