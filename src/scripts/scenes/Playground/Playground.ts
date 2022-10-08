import Phaser from 'phaser'

import Player from './Player'
import Elevator from './Elevator'

import { SHARED_CONFIG } from '../../config'

export class Playground extends Phaser.Scene {
  cursors: null | Phaser.Types.Input.Keyboard.CursorKeys
  player: Phaser.Physics.Arcade.Image

  makho: Phaser.Physics.Arcade.Sprite
  rostomi: Phaser.Physics.Arcade.Sprite
  gurami: Phaser.Physics.Arcade.Sprite
  nikolozi: Phaser.Physics.Arcade.Sprite
  nika: Phaser.Physics.Arcade.Sprite

  modal: null | Phaser.GameObjects.Image
  showModal: boolean

  callback_hell_sign: Phaser.Physics.Arcade.Sprite
  callback_hell_end: Phaser.GameObjects.Image

  _moveElevator_: boolean 

  elevator_sign: Phaser.GameObjects.Image
  elevator: Phaser.Physics.Arcade.Image

  portal: Phaser.GameObjects.Sprite

  public config: typeof SHARED_CONFIG

  collision: {
    to: null | string
  }

  constructor() {
    super({
      key: 'Playground',
      physics: {
        arcade: {}
      }
    })
    this.cursors = null
    this.collision = { to: null }
  }

  preload() {
    this.load.image('tiles-1', 'assets/sprites/grass.png')
    this.load.image('sky', 'assets/sprites/sky.png')
    this.load.tilemapTiledJSON('map', 'assets/sprites/omotemplate.json')

    this.load.image('makho', 'assets/sprites/makho.png')
    this.load.image('rostomi', 'assets/sprites/rostomi.png')
    this.load.image('nikolozi', 'assets/sprites/nikolozi.png')
    this.load.image('nika', 'assets/sprites/nikakh.png')
    this.load.image('gurami', 'assets/sprites/gurami.png')

    this.load.spritesheet('portal', 'assets/sprites/ending-portal.png', {
      frameWidth: 275,
      frameHeight: 460
    })

    this.load.image('gurami_speech', 'assets/speech_modal/gurami_speech.png')
    this.load.image('callback-hell.sign', 'assets/sprites/callback_hell.png')
    this.load.image('callback-hell-end', 'assets/sprites/callback_hell_end.png')
    this.load.image('rostomi_speech', 'assets/speech_modal/rostomi_speech.png')
    this.load.image('makho_speech', 'assets/speech_modal/maxo_speech.png')
    this.load.image('nikolozi_speech', 'assets/speech_modal/nikolozi_speech.png')
    this.load.image('nika_speech', 'assets/speech_modal/nika_speech.png')
    this.load.image('elevator-sign', 'assets/sprites/elevator-sign.png')
    this.load.image('elevator', 'assets/sprites/elevator.png')

    this.load.image('player', 'assets/sprites/player/movements/idle01.png')
    this.cursors = this.input.keyboard.createCursorKeys()
  }

  create() {
    this.add.image(0, 0, 'sky').setScale(4).setScrollFactor(0)
    this.callback_hell_end = this.add.image(2695, 100, 'callback-hell-end').setScale(0.9)
    this.config = SHARED_CONFIG
    this.showModal = false
    this._moveElevator_ = false

    this.handleJump()

    this.anims.create({
      key: 'play-portal',
      frames: this.anims.generateFrameNumbers('portal', { start: 0, end: 7 }),
      frameRate: 15,
      repeat: -1
    })

    const map = this.make.tilemap({ key: 'map' })
    const tileset = map.addTilesetImage('grass_template', 'tiles-1')
    const tileset2 = map.addTilesetImage('grass_template', 'tiles-1')
    map.createLayer('secondary_layer', tileset2)
    const platform = map.createLayer('platform', tileset)

    this.makho = this.physics.add.sprite(2500, 500, 'makho').setScale(0.125).setImmovable()
    this.physics.add.collider(this.makho, platform)

    this.gurami = this.physics.add.sprite(2000, 500, 'gurami').setScale(0.1).setImmovable()
    this.physics.add.collider(this.gurami, platform)

    this.callback_hell_sign = this.physics.add.sprite(2500, 350, 'callback-hell.sign').setScale(0.05).setImmovable()
    this.physics.add.collider(this.callback_hell_sign, platform)

    this.nika = this.physics.add.sprite(1600, 450, 'nika').setScale(0.06).setImmovable()
    this.physics.add.collider(this.nika, platform)

    this.elevator_sign = this.add.image(1650, 560, 'elevator-sign').setScale(0.1)

    this.nikolozi = this.physics.add.sprite(250, 190, 'nikolozi').setScale(0.07).setImmovable()
    this.physics.add.collider(this.nikolozi, platform)

    this.rostomi = this.physics.add.sprite(800, 210, 'rostomi').setScale(0.07).setImmovable()
    this.physics.add.collider(this.rostomi, platform)

    this.portal = this.add.sprite(3050, 200, 'portal').setScale(0.5)
    this.portal.play('play-portal', true)

    platform.setCollisionByExclusion([-1], true)

    this.player = this.createPlayer().setImmovable()
    this.physics.add.collider(this.player, platform)

    this.cursors = this.input.keyboard.createCursorKeys()

    this.elevator = this.physics.add.image(1770, 600, 'elevator').setImmovable().setScale(0.1)

    this.physics.add.collider(
      this.player,
      this.elevator,
      () => {
        this.elevator.body.velocity.y = -100
      },
      undefined,
      this
    )

    this.followCamera(this.player)

    this.physics.add.collider(this.elevator, this.player)
    this.physics.add.collider(this.elevator, platform)

    this.addPhysicsCollider(this.rostomi, 'rostomi_speech')
    this.addPhysicsCollider(this.nikolozi, 'nikolozi_speech')
    this.addPhysicsCollider(this.makho, 'makho_speech')
    this.addPhysicsCollider(this.nika, 'nika_speech')
    this.addPhysicsCollider(this.gurami, 'gurami_speech')
  }

  createPlayer() {
    this.player = this.physics.add.image(100, 150, 'player')
    this.player.setGravityY(500)
    this.player.setScale(0.075)
    return this.player
  }

  followCamera(player: Phaser.Physics.Arcade.Image) {
    this.cameras.main.startFollow(player).setZoom(2)
  }

  handleJump() {
    this.input.keyboard.on(
      'keydown-SPACE',
      () => {
        this.player!.body.velocity.y = -200
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
