import Phaser from 'phaser'
import Player from './Player'

export class Playground extends Phaser.Scene {
  cursors: null | Phaser.Types.Input.Keyboard.CursorKeys
  player: null | Phaser.Physics.Arcade.Sprite
  makho: null | Phaser.Physics.Arcade.Sprite

  constructor() {
    super({ key: 'Playground' })
    this.cursors = null
  }

  preload() {
    this.load.image('tiles-2', 'assets/sprites/grass.png')
    this.load.image('sky', 'assets/sprites/sky.png')
    this.load.tilemapTiledJSON('map', 'assets/sprites/omotemplate.json')
    this.load.image('makho', 'assets/sprites/makho.png')
    this.load.image('player', 'assets/sprites/player/movements/idle01.png')
    this.cursors = this.input.keyboard.createCursorKeys()
  }

  create() {
    this.add.image(0, 0, 'sky').setScale(4).setScrollFactor(0)

    const map = this.make.tilemap({ key: 'map' })
    const tileset = map.addTilesetImage('grass_template', 'tiles-2')
    const platform = map.createLayer('platforms', tileset)

    this.makho = this.physics.add.sprite(600,500, 'makho')
    this.physics.add.collider(this.makho, platform)

    platform.setCollisionByExclusion([-1], true)

    this.player = this.createPlayer()
    this.physics.add.collider(this.player, platform)

    this.cursors = this.input.keyboard.createCursorKeys()

    this.followCamera(this.player)
  }

  createPlayer() {
    this.player = new Player(this, 100, 250)
    this.player.setGravityY(500)
    this.player.setScale(0.1)
    return this.player
  }

  followCamera(player: Phaser.Physics.Arcade.Sprite) {
    this.cameras.main.startFollow(player).setZoom(2)
  }

  update(): void {
    const { left, right, space } = this.cursors as Phaser.Types.Input.Keyboard.CursorKeys

    if (this.player?.body.touching)
      if (left.isDown) {
        this.player?.setVelocityX(-200)
        this.player!.flipX = true
      }
    if (right.isDown) {
      this.player?.setVelocityX(200)
      this.player!.flipX = false
    }
    if (space.isDown) {
      this.player?.setVelocityY(-200)
    }
  }
}

export default Playground
