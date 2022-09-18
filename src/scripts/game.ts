import Phaser from 'phaser'
import { SHARED_CONFIG } from './config'

import { MenuScene } from './scenes/MenuScene'
import { Playground } from './scenes/Playground'

const config = {
  ...SHARED_CONFIG,
  scene: [new MenuScene(SHARED_CONFIG), Playground]
}

window.addEventListener('load', () => {
  new Phaser.Game(config as any)
})
