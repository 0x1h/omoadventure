import { SHARED_CONFIG } from '../../config'

export class MenuScene extends Phaser.Scene {
  startButton: null | Phaser.GameObjects.Image
  infoButton: null | Phaser.GameObjects.Image
  infoModal: null | Phaser.GameObjects.Image
  showModal: boolean
  themeSound: any

  public config: typeof SHARED_CONFIG

  constructor(config: typeof SHARED_CONFIG) {
    super({ key: 'MainScene' })

    this.startButton = null
    this.infoButton = null
    this.config = config
    this.infoModal = null

    this.showModal = false
  }

  preload() {
    this.createAssets()
  }

  create() {
    this.add.image(0, 0, 'background').setOrigin(0)
    this.placeButtons()

    this.themeSound = this.sound.add('theme', { loop: true })
    this.themeSound.play()

    if (this.infoModal) {
      this.infoModal.visible = this.showModal
    }
  }

  createAssets() {
    this.load.audio('theme', 'audios/Theme/menu_theme.mp3')
    this.load.image('background', 'assets/img/Background.png')
    this.load.image('start-button', 'assets/img/start-button.png')
    this.load.image('info-button', 'assets/img/info-button.png')
    this.load.image('info-modal', 'assets/img/infoModal.png')

    this.infoModal = this.add
      .image(this.config.scale.width / 1.2, 500, 'info-modal')
      .setOrigin(1)
      .setDepth(1)
      .setScale(1.2)
  }

  placeButtons() {
    this.startButton = this.add
      .image(this.config.scale.width / 3.7, this.config.scale.height / 2.2, 'start-button')
      .setScale(0.3)
      .setInteractive({ cursor: 'pointer' })
      .on('pointerdown', () => {
        this.scene.start('Home')
        this.themeSound.destroy()
      })
      .on('pointerover', () => {
        this.startButton?.setTint(0x45ff8f)
      })
      .on('pointerout', () => {
        this.startButton?.clearTint()
      })

    this.infoButton = this.add
      .image(this.config.scale.width / 3.7, this.config.scale.height / 1.75, 'info-button')
      .setScale(0.3)
      .setInteractive({ cursor: 'pointer' })
      .on('pointerdown', () => {
        this.showModal = true
        this.infoModal = this.add
          .image(this.config.scale.width / 1.2, 500, 'info-modal')
          .setOrigin(1)
          .setDepth(1)
          .setScale(1.2)

        this.infoModal.setInteractive().on('pointerdown', () => {
          this.showModal = false
          this.infoModal?.destroy()
        })

        if (this.infoModal) {
          this.infoModal.visible = this.showModal
        }
      })
      .on('pointerover', () => {
        this.infoButton?.setTint(0x45ff8f)
      })
      .on('pointerout', () => {
        this.infoButton?.clearTint()
      })
  }
}
