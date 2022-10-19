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
    this.load.image('tilesSETSET', 'assets/sprites/house_inside.png')

    const progressBar = this.add.graphics()
    const progressBox = this.add.graphics()

    const text = this.add.text(240, 350, 'LOADING...', { color: "#FFF", fontSize: "32px" });

    progressBox.fillStyle(0x222222, 0.8)
    progressBox.fillRect(240, 270, 320, 50)

    this.load.on('progress', function (value) {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
  });
    this.load.on('complete', function () {
      progressBar.destroy()
      text.destroy()
    })
  }

  create() {
    this.add.image(500, 160, 'house_wall')
    this.laptop = this.physics.add.sprite(450, 250, 'laptop')

    this.laptop.setScale(0.1)

    const map = this.make.tilemap({ key: 'house' })
    const tileset = map.addTilesetImage('house_interior', 'tilesSETSET')
    const platform = map.createLayer('house_interior_platform', tileset)

    platform.setCollisionByExclusion([-1], true)

    this.player = this.createPlayer().setGravityY(200)
    this.physics.add.collider(this.player, platform)
    this.physics.add.collider(this.laptop, platform)

    this.handleJump()

    this.cursors = this.input.keyboard.createCursorKeys()
    this.physics.add.collider(this.player, this.laptop, () => {
      this.laptop?.destroy()
      this.alert?.setColor('#5FFF49')
      this.alert?.setText('Now go outside')
    })

    this.followCamera(this.player)
    this.alert = new Alert(this)
  }

  handleJump() {
    this.input.keyboard.on(
      'keydown-SPACE',
      () => {
        this.player!.body.velocity.y = -100
      },
      this
    )

    this.input.keyboard.on(
      'keydown-RIGHT',
      () => {
        this.player!.body.velocity.x = 200
        this.player!.flipX = false
      },
      this
    )
    this.input.keyboard.on(
      'keydown-LEFT',
      () => {
        this.player!.body.velocity.x = -200
        this.player!.flipX = true
      },
      this
    )

    this.input.keyboard.on(
      'keyup-LEFT',
      () => {
        this.player?.setVelocityX(0)
      },
      this
    )

    this.input.keyboard.on(
      'keyup-RIGHT',
      () => {
        this.player?.setVelocityX(0)
      },
      this
    )
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
  }
}
