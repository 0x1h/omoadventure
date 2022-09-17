import { SHARED_CONFIG } from '../config'

export default class MenuScene extends Phaser.Scene {
  startButton: null | Phaser.GameObjects.Image
  infoButton: null | Phaser.GameObjects.Image
  themeSound: any

  public config: typeof SHARED_CONFIG

  constructor(config: typeof SHARED_CONFIG) {
    super({ key: 'MainScene' })

    this.startButton = null
    this.infoButton = null
    this.config = config
  }

  preload() {
    this.createAssets()
  }

  create() {
    this.add.image(0, 0, 'background').setOrigin(0)
    this.placeButtons()

    this.themeSound = this.sound.add('theme', { loop: true })
    this.themeSound.play()
  }

  createAssets() {
    this.load.audio('theme', 'audios/Theme/menu_theme.mp3')
    this.load.image('background', 'assets/img/Background.png')
    this.load.image('start-button', 'assets/img/start-button.png')
    this.load.image('info-button', 'assets/img/info-button.png')
    this.load.image('info-modal', 'assets/img/infoModal.png')
  }

  placeButtons() {
    this.startButton = this.add
      .image(this.config.scale.width / 3.7, this.config.scale.height / 2.2, 'start-button')
      .setDepth(1)
      .setScale(0.3)
      .setInteractive({ cursor: 'pointer' })
      .on('pointerdown', () => {
        console.log('play')
      })
      .on('pointerover', () =>  {
        this.startButton?.setTint(0x45ff8f)
      })
      .on('pointerout', () => {
        this.startButton?.clearTint()
      })

    this.infoButton = this.add
      .image(this.config.scale.width / 3.7, this.config.scale.height / 1.75, 'info-button')
      .setDepth(1)
      .setScale(0.3)
      .setInteractive({ cursor: 'pointer' })
      .on('pointerdown', () => {
        console.log('play')
      })
      
      .on('pointerover', () =>  {
        this.infoButton?.setTint(0x45ff8f)
      })
      .on('pointerout', () => {
        this.infoButton?.clearTint()
      })
  }

  update() {}
}
