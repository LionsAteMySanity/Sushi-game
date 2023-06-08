class Ingredient extends Phaser.GameObject {
    constructor(scene, image, icon, scale, x, y) {
        super(scene, "ingredient")
        this.image = image
        this.icon = icon
        this.scale = scale
        this.x = x
        this.y = y
    }

    create() {
        this.on('pointerdown', () => {
            this.cutSushi(this)
        });   
    }
}