class Shop extends Phaser.Scene {
    constructor() {
        super("Shop")
    }

    preload() {
        this.load.image('fish', "../assets/fish.png")
        this.load.image('rice', "../assets/rice.png")
        this.load.image('seaweed', "../assets/seaweed.png")
        this.load.image('fishicon', "../assets/fish.png")
        this.load.image('riceicon', "../assets/rice.png")
        this.load.image('seaweedicon', "../assets/seaweed.png")
        this.load.image('sushi', "../assets/sushi.png")
    }
    create() {
        this.hp = 5
        this.timer = 0
        this.fish = this.add.image(400, 300, 'fish')
        .setScale(0.1)
        .setInteractive()
        .on('pointerdown', () => {
            this.cutSushi(this.fish)
        });   
        this.rice = this.add.image(800, 300, 'rice')
        .setScale(0.2)
        .setInteractive()
        .on('pointerdown', () => {
            this.makeSushi('rice')
        });
        this.seaweed = this.add.image(1200, 300, 'seaweed')
        .setScale(0.2)
        .setInteractive()
        .on('pointerdown', () => {
            this.makeSushi(this.seaweed)
        });
        this.sushi = []
        this.ingredients = [this.fish, this.rice, this.seaweed]
        this.customers = []
        this.spawnCustomer()
        this.nextCustomer()
    }

    update(delta) {
        for (let index = 0; index < this.customers.length; index += 1) {
            this.customers[index].reduceTimer()
            this.spawnCustomer(this)
        }

    }

    spawnCustomer() {
        if (this.timer == 0) {
            this.customers.push(new Customer(this, "customer"));
            this.timer = (Math.ceil(Math.random() * 50) + 10) * 1000;
        }
        else {
            this.timer -= 1;
        }
    };

    cutSushi(ingredient) {
        console.log(ingredient)
        this.tweens.add({
            targets: ingredient,
            x: 900,
            y: 700,
            scale: 0.2,
            duration: 500,
            repeat: 0,
            hold: 500,
            repeatDelay: 500,
            ease: 'linear'
        });
        this.sushi.push(ingredient)
    }

    nextCustomer() {
        for (let index = 0; index < this.customers[0].recipe.length; index++) {
            this.add.image(960, 200)
        }
    }
    makeSushi() {
        let done = true
        for(let index = 0; index < this.sushi.length; index++) {
            if (!(this.customers[0].recipe.includes(this.sushi[index]))) {
                done = false
            }
        }
        if (this.sushi.length != this.customers[0].recipe.length) {
            done = false
        }
        if (done) {
            this.customers[0].satisfy()
        }
    }
}

const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [Shop],
    title: "Sushi Game"
});