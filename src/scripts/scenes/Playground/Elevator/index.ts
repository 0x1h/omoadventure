import Phaser from 'phaser'

export default class Elevator extends Phaser.Physics.Matter.Image {
  startY: number

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    options: Phaser.Types.Physics.Matter.MatterBodyConfig
  ) {
    super(scene.matter.world, x, y, texture, 0, options)
    scene.add.existing(this)
    this.startY = y
  }

  moveVertically() {
    this.scene.tweens.addCounter({
      from: 0,
      to: -100,
      duration: 1500,
      ease: Phaser.Math.Easing.Sine.InOut,
      repeat: -1,
      yoyo: true,
      onUpdate: (_, target) => {
        const y = this.startY + target.value
        const dy = y - this.y
        this.y = y
        this.setVelocityY(dy)
      }
    })
  }
}
