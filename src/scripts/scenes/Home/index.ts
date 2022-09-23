import Phaser from 'phaser'
import Player from './Player'

export class Home extends Phaser.Scene {
  cursors: null | Phaser.Types.Input.Keyboard.CursorKeys
  player: null | Phaser.Physics.Arcade.Sprite

  constructor() {
    super('Home')

    this.player = null
  }

  preload() {
    this.load.tilemapTiledJSON('house', 'assets/sprites/house_interior.json')
    this.load.image('player', 'assets/sprites/player/movements/idle01.png')
    this.load.image('tiles-1', 'assets/sprites/house_inside.png')
  }

  create() {
    const map = this.make.tilemap({ key: 'house' })
    const tileset = map.addTilesetImage('house_interior', 'tiles-1')
    const platform = map.createLayer('house_interior_platform', tileset)

    platform.setCollisionByExclusion([-1], true)

    this.player = this.createPlayer()
    this.physics.add.collider(this.player, platform)

    this.cursors = this.input.keyboard.createCursorKeys()

    this.followCamera(this.player)
  }

  createPlayer() {
    const player = new Player(this, 100, 250)
    player.setGravityY(500)
    player.setScale(0.1)
    return player
  }

  followCamera(player) {
    this.cameras.main.startFollow(player).setZoom(2)
  }

  update(): void {
    const { left, right, space } = this.cursors as Phaser.Types.Input.Keyboard.CursorKeys

   if (left.isDown) {
      this.player?.setVelocityX(-200)
    }
    if (right.isDown) {
      this.player?.setVelocityX(200)
    }
    if (space.isDown) {
      this.player?.setVelocityY(-200)
    }
  }
}
