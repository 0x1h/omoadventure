import Phaser from 'phaser'

export function loadPortals(anims: Phaser.Animations.AnimationManager) {
  anims.create({
    key: 'play-portal',
    frames: anims.generateFrameNumbers('portal', { start: 0, end: 7 }),
    frameRate: 15,
    repeat: -1
  })
  anims.create({
    key: 'play-portal',
    frames: anims.generateFrameNumbers('portal', { start: 0, end: 7 }),
    frameRate: 15,
    repeat: -1
  })
  anims.create({
    key: 'play-portal',
    frames: anims.generateFrameNumbers('portal', { start: 0, end: 7 }),
    frameRate: 15,
    repeat: -1
  })
}
