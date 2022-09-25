import { Alert } from './Alert'
import Phaser from 'phaser'
import Player from './Player'

export class Home extends Phaser.Scene {
  cursors: null | Phaser.Types.Input.Keyboard.CursorKeys
  player: null | Phaser.Physics.Arcade.Sprite
  laptop: null | Phaser.GameObjects.Image
  alert: null | Phaser.GameObjects.Text

  constructor() {
    super('Home')

    this.laptop = null
    this.player = null
    this.alert = null
  }

  preload() {
    this.load.image('house_wall', 'assets/sprites/house-interior-wall-test.png')
    this.load.image('laptop', 'assets/sprites/laptop.png')
    this.load.tilemapTiledJSON('house', 'assets/sprites/house_interior.json')
    this.load.image('player', 'assets/sprites/player/movements/idle01.png')
    this.load.image('tiles-1', 'assets/sprites/house_inside.png')
  }

  create() {
    this.add.image(500, 160, 'house_wall')
    this.laptop = this.physics.add.sprite(450, 250, 'laptop')

    this.laptop.setScale(0.1)

    const map = this.make.tilemap({ key: 'house' })
    const tileset = map.addTilesetImage('house_interior', 'tiles-1')
    const platform = map.createLayer('house_interior_platform', tileset)

    platform.setCollisionByExclusion([-1], true)

    this.player = this.createPlayer().setGravityY(200)
    this.physics.add.collider(this.player, platform)
    this.physics.add.collider(this.laptop, platform)

    this.cursors = this.input.keyboard.createCursorKeys()
    this.physics.add.collider(this.player, this.laptop, () => {
      this.laptop?.destroy()
      this.alert?.setColor('#5FFF49')
      this.alert?.setText('Now go outside')
    })

    this.followCamera(this.player)
    this.alert = new Alert(this)
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
    if (this.laptop?.scene === undefined) {
      if(this.player!.x >= 1090 && this.player!.y >= 247){
        this.scene.start('Playground')
      }
    }
    const { left, right, space } = this.cursors as Phaser.Types.Input.Keyboard.CursorKeys

    this.alert!.x = this.player!.x - 50
    this.alert!.y = this.player!.y - 100

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
