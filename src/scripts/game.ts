import Phaser from 'phaser'
import { SHARED_CONFIG } from './config'

import { MenuScene } from './scenes/MenuScene'
import { Home } from './scenes/Home'
import { Playground } from './scenes/Playground'

const config = {
  ...SHARED_CONFIG,
  scene: [new MenuScene(SHARED_CONFIG), Home, Playground],}

window.addEventListener('load', () => {
  new Phaser.Game(config as any)
})
