class Customer extends Phaser.GameObjects.GameObject {
    constructor(scene) {
        super(scene, "customer");
        this.visible = false
        this.recipe = ["seaweedPiece", "riceClump"];
        this.image = null
        this.speach = null

        let random = scene.recipes[Phaser.Math.Between(0, scene.recipes.length - 1)].split('_')

        for ( let i = 0; i < random.length; i++)
            this.recipe.push(random[i]);

        this.timer = 1000;
        this.done = false;
        console.log("Customer Created");
    }
    
    
    reduceTimer() {
        this.timer -= 1;
        if (this.timer == 0 && !this.done) {
            this.leave();
        }
    }

    leave() {
        console.log('you took too long!');
        //this.scene.synth.triggerAttackRelease("b1", "0.3", "+0.1");
        this.scene.game.scoreboard.timeout+= 1;
        this.scene.updateScore()
        this.scene.hp -= 1;
        if (this.scene.hp == 0) {
            this.scene.add.rectangle(0, 0, 1920, 1080, 0x000000)
            .setOrigin(0,0)
            .setAlpha(0.5);
            this.scene.add.text(750, 400, "GAME OVER", { fontSize: 100 })
            this.scene.active = false
            this.scene.riceOpen.active = false
            this.scene.seaweed.active = false
            this.scene.blishPile.active = false
            this.scene.tazoiPile.active = false
            this.scene.kukoiPile.active = false

        }
        else {
            this.scene.customers.shift();
            this.scene.nextCustomer();
            this.image.destroy()
            this.speach.destroy()
            this.destroy();
        }
    }

    satisfy() {
        console.log('thank you!');
        this.done = true;
        
        this.scene.time.delayedCall(1500, ()=> {
            this.image.destroy()
            this.speach.destroy()
            this.scene.customers.shift();
            this.scene.nextCustomer();
            this.destroy();
        });
        
    }
}