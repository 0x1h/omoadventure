import Phaser from "phaser"


export class Alert extends Phaser.GameObjects.Text {
  constructor(scene: Phaser.Scene){
    super(scene, 16, 16, "Go and take laptop", {
      fontSize: "12px"
    })

    scene.add.existing(this)
  }
}