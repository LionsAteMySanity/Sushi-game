class Customer extends Phaser.GameObjects.GameObject {
    constructor(scene) {
        super(scene, "customer");
        this.visible = false
        this.recipe = ["seaweedPiece", "riceClump"];
        this.image = null
        let ing = Math.floor(Math.random() * 7);
        for(let index = 0; index < scene.ingredients.length; index++) {
            if (ing % (2^(index + 1)) == 0) {
                this.recipe.push(scene.ingredients[index]);
            }
        }
        this.timer = 1000;
        console.log("Customer Created");
    }
    
    
    reduceTimer() {
        this.timer -= 1;
        if (this.timer == 0) {
            this.leave();
        }
    }

    leave() {
        this.scene.hp -= 1;
        this.scene.customers.shift();
        this.scene.nextCustomer();
        this.image.destroy()
        this.destroy();
    }

    satisfy() {
        this.scene.customers.shift();
        this.scene.nextCustomer();
        this.destroy();
    }
}