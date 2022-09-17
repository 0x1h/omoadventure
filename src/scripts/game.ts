import 'phaser'
import MenuScene from './scenes/MenuScene'
import { SHARED_CONFIG } from './config'

const config = {
  ...SHARED_CONFIG,
  scene: [new MenuScene(SHARED_CONFIG)],
}

window.addEventListener('load', () => {
  new Phaser.Game(config as any)
})
