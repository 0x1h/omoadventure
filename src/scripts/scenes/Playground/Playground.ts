import Phaser from 'phaser'
import Player from './Player'
import { SHARED_CONFIG } from '../../config'

export class Playground extends Phaser.Scene {
  cursors: null | Phaser.Types.Input.Keyboard.CursorKeys
  player: Phaser.Physics.Arcade.Sprite

  makho: Phaser.Physics.Arcade.Sprite
  rostomi: Phaser.Physics.Arcade.Sprite
  gurami: Phaser.Physics.Arcade.Sprite
  nikolozi: Phaser.Physics.Arcade.Sprite
  nika: Phaser.Physics.Arcade.Sprite

  modal: null | Phaser.GameObjects.Image
  showModal: boolean

  public config: typeof SHARED_CONFIG

  collision: {
    to: null | string
  }

  constructor() {
    super({ key: 'Playground' })
    this.cursors = null
    this.collision = { to: null }
  }

  preload() {
    this.load.image('tiles-2', 'assets/sprites/grass.png')
    this.load.image('sky', 'assets/sprites/sky.png')
    this.load.tilemapTiledJSON('map', 'assets/sprites/omotemplate.json')

    this.load.image('makho', 'assets/sprites/makho.png')
    this.load.image('rostomi', 'assets/sprites/rostomi.png')
    this.load.image('nikolozi', 'assets/sprites/nikolozi.png')
    this.load.image('nika', 'assets/sprites/nikakh.png')
    this.load.image('gurami', 'assets/sprites/gurami.png')

    this.load.image('gurami_speech', 'assets/speech_modal/gurami_speech.png')
    this.load.image('rostomi_speech', 'assets/speech_modal/rostomi_speech.png')
    this.load.image('makho_speech', 'assets/speech_modal/maxo_speech.png')
    this.load.image('nikolozi_speech', 'assets/speech_modal/nikolozi_speech.png')
    this.load.image('nika_speech', 'assets/speech_modal/nika_speech.png')

    this.load.image('player', 'assets/sprites/player/movements/idle01.png')
    this.cursors = this.input.keyboard.createCursorKeys()
  }

  create() {
    this.add.image(0, 0, 'sky').setScale(4).setScrollFactor(0)
    this.config = SHARED_CONFIG
    this.showModal = false

    this.handleJump()

    const map = this.make.tilemap({ key: 'map' })
    const tileset = map.addTilesetImage('grass_template', 'tiles-2')
    const platform = map.createLayer('platforms', tileset)

    this.makho = this.physics.add.sprite(2500, 500, 'makho').setScale(0.125).setImmovable()
    this.physics.add.collider(this.makho, platform)

    this.gurami = this.physics.add.sprite(2000, 500, 'gurami').setScale(0.1).setImmovable()
    this.physics.add.collider(this.gurami, platform)

    this.nika = this.physics.add.sprite(1500, 200, 'nika').setScale(0.1).setImmovable()
    this.physics.add.collider(this.nika, platform)

    this.nikolozi = this.physics.add.sprite(900, 500, 'nikolozi').setScale(0.1).setImmovable()
    this.physics.add.collider(this.nikolozi, platform)

    this.rostomi = this.physics.add.sprite(600, 500, 'rostomi').setScale(0.1).setImmovable()
    this.physics.add.collider(this.rostomi, platform)

    platform.setCollisionByExclusion([-1], true)

    this.player = this.createPlayer().setImmovable()
    this.physics.add.collider(this.player, platform)

    this.cursors = this.input.keyboard.createCursorKeys()

    this.followCamera(this.player)

    this.addPhysicsCollider(this.rostomi, 'rostomi_speech')
    this.addPhysicsCollider(this.nikolozi, 'nikolozi_speech')
    this.addPhysicsCollider(this.makho, 'makho_speech')
    this.addPhysicsCollider(this.nika, 'nika_speech')
    this.addPhysicsCollider(this.gurami, 'gurami_speech')
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

  handleJump() {
    this.input.keyboard.on(
      'keydown-SPACE',
      () => {
        this.player!.body.velocity.y = -400
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

  addPhysicsCollider(sprite: Phaser.Physics.Arcade.Sprite, name: string) {
    this.physics.add.collider(
      this.player!,
      sprite,
      () => {
        this.collision = { to: name }
      },
      undefined,
      this
    )
  }

  createSpeechModal(whoIs: string) {
    if (this.showModal) return

    this.modal = this.add
      .image(this.config.scale.width / 2, this.config.scale.height, whoIs)
      .setScrollFactor(0)
      .setScale(0.15)
      .setY(470)
  }

  update(): void {
    if (this.collision.to !== null) {
      console.log(this.collision)
      this.createSpeechModal(this.collision.to)
      this.showModal = true
    }

    if (this.collision.to === null) {
      this.modal?.destroy()
      this.showModal = false
    }

    this.collision.to = null

  }
}

export default Playground
