import Phaser from 'phaser'
import { Preload } from './Preload'

export class Playground extends Phaser.Scene {
  constructor() {
    super({ key: 'Playground' })
  }

  preload() {
    this.load.tilemapTiledJSON('map', 'assets/sprites/crystal_world_map.json')
    this.load.image('tiles-1', 'assets/sprites/main_lev_build_1.png')
    this.load.image('tiles-2', 'assets/sprites/main_lev_build_2.png')
  }

  create() {
    const map = this.make.tilemap({key: "map"})
    const tielset = map.addTilesetImage('main_lev_build_1', 'tiles-1')
    // const tielset2 = map.addTilesetImage('main_lev_build_2', 'tiles-2')

    map.createLayer('environment', tielset)
    map.createLayer('platforms', tielset)
  } 
}

export default Playground
