class Shop extends Phaser.Scene {
    constructor() {
        super("Shop");
    }

    preload() {
        this.load.image('fish', "./assets/fish.png");
        this.load.image('rice', "./assets/rice.png");
        this.load.image('seaweed', "./assets/seaweed.png");
        this.load.image('fishicon', "./assets/fish.png");
        this.load.image('riceicon', "./assets/rice.png");
        this.load.image('seaweedicon', "./assets/seaweed.png");
        this.load.image('sushi', "./assets/sushi.png");
        this.load.image('background', "./assets/Gameplay/trueBackground.png");
        this.load.image('closeDoor', "./assets/Gameplay/closeDoor.PNG");
        this.load.image('openDoor', "./assets/Gameplay/doorOpen.PNG");
        this.load.image('riceContainer', "./assets/Gameplay/riceContainer.png");
        this.load.image('money', "./assets/Gameplay/money.PNG");
        this.load.image('fs', "./assets/Gameplay/fullscreen.PNG");
        this.load.image('minfs', "./assets/Gameplay/minimizeScreen.PNG");
    }
    create() {
        // allow transform of background and its sprites
        let gameX = -100;
        let gameY = -150;
        let gameScale = 1.2;

        this.gameGroup = this.add.group();

        this.cameras.main.setBackgroundColor('#585656');
        this.background = this.add.image(100, 0, 'background')
        .setOrigin(0,0)
        .setScale(1);

        this.coolerClose = this.add.image(157,372, 'closeDoor')
        .setOrigin(0,0)
        .setScale(1)
        .setAlpha(1);

        this.coolerOpen = this.add.image(19,305, 'openDoor')
        .setOrigin(0,0)
        .setScale(1)
        .setAlpha(0);

        this.riceOpen = this.add.image(1127,530, 'riceContainer')
        .setOrigin(0,0)
        .setScale(1);

        this.gameGroup.addMultiple([this.background,
                                    this.coolerClose,
                                    this.coolerOpen,
                                    this.riceOpen,
                                ]);
        this.gameGroup.getChildren().forEach(function(obj) {
            // set pos
            obj.x += gameX;
            obj.y += gameY;

            // set scale
            obj.setScale(gameScale);
            obj.x *= gameScale;
            obj.y *= gameScale;
          });
        

        this.money = this.add.image(10,10, 'money')
        .setOrigin(0,0)
        .setScale(0.25);

        this.hp = 5;
        this.timer = 0;
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
            this.cutSushi(this.rice)
        });

        this.seaweed = this.add.image(1200, 300, 'seaweed')
        .setScale(0.2)
        .setInteractive()
        .on('pointerdown', () => {
            this.cutSushi(this.seaweed)
        });

        this.sushi = [];
        this.ingredients = [this.fish, this.rice, this.seaweed];
        this.customers = [];
        this.spawnCustomer();
        this.nextCustomer();

        this.earnings = this.add.text(1620,800, "Go to earnings...")
        .setFontSize(25)
        .setInteractive()
        .on('pointerdown', () => {
            this.scene.start('Earnings');
        });

        this.addFullScreen();
    }

    update(delta) {
        //console.log(this.customers);
        for (let index = 0; index < this.customers.length; index += 1) {
            this.customers[index].reduceTimer();
            this.spawnCustomer(this);
        }

    }

    addFullScreen(){
        this.input.keyboard.on('keydown-ESC',  () => {
            // Set the zoom level to 0.8
            this.scale.setZoom(0.8);
        }, this);
        this.fsButton = this.add.image(1885,1045, 'fs')
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                if (this.scale.isFullscreen) {
                    this.fsButton.setTexture('fs');
                    this.scale.stopFullscreen();
                    this.scale.setZoom(0.8);
                } else {
                    this.fsButton.setTexture('minfs');
                    this.scale.startFullscreen();
                    this.scale.setZoom(1);
                }
        });
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
            this.add.image(960, 200);
        }
    }
    makeSushi() {
        let done = true
        for(let index = 0; index < this.sushi.length; index++) {
            if (!(this.customers[0].recipe.includes(this.sushi[index]))) {
                done = false;
            }
        }
        if (this.sushi.length != this.customers[0].recipe.length) {
            done = false;
        }
        if (done) {
            this.customers[0].satisfy();
        }
    }
}

class Earnings extends Phaser.Scene {
    constructor() {
        super("Earnings");
    }

    preload() {
        this.load.image('webBlish', "./assets/Website/blishPic.PNG");
        this.load.image('webBlishText', "./assets/Website/blishWeb.PNG");
        this.load.image('webKukoi', "./assets/Website/kukoiPic.PNG");
        this.load.image('webKukoiText', "./assets/Website/KukoiWeb.PNG");
        this.load.image('webTazoi', "./assets/Website/tazoiPic.PNG");
        this.load.image('webTazoiText', "./assets/Website/tazoiWeb.PNG");
        this.load.image('website', "./assets/Website/Website.PNG");
        this.load.image('webButton', "./assets/Website/buttonWeb.PNG");
    }

    create() {
        let websiteX = 0;
        let websiteY = 0;
        let websiteScale = 1.25;

        this.website = this.add.image(websiteX, websiteY, 'website')
        .setOrigin(0,0)
        .setScale(1)
        .setAlpha(1);

        // Blish

        this.webBlishButton = this.add.image(websiteX + 300, websiteY + 370, 'webButton')
        .setOrigin(0,0)
        .setScale(1)
        .setAlpha(1);

        this.webBlish = this.add.image(websiteX + 300, websiteY + 390, 'webBlish')
        .setOrigin(0,0)
        .setScale(1)
        .setAlpha(1).setInteractive()
        .on('pointerdown', () => {
            this.webBlish.setAlpha(0.5);
        })
        .on('pointerup', () => {
            this.webBlish.setAlpha(1);
        });

        this.webBlishText = this.add.image(websiteX + 400, websiteY + 540, 'webBlishText')
        .setOrigin(0,0)
        .setScale(1)
        .setAlpha(1);

        // Kukoi

        this.webKukoiButton = this.add.image(websiteX + 30, websiteY + 370, 'webButton')
        .setOrigin(0,0)
        .setScale(1)
        .setAlpha(1);

        this.webKukoi = this.add.image(websiteX + 80, websiteY + 400, 'webKukoi')
        .setOrigin(0,0)
        .setScale(1)
        .setAlpha(1).setInteractive()
        .on('pointerdown', () => {
            this.webKukoi.setAlpha(0.5);
        })
        .on('pointerup', () => {
            this.webKukoi.setAlpha(1);
        });

        this.webKukoiText = this.add.image(websiteX + 120, websiteY + 530, 'webKukoiText')
        .setOrigin(0,0)
        .setScale(1)
        .setAlpha(1);

        // Tazoi

        this.webTazoiButton = this.add.image(websiteX + 30, websiteY + 600, 'webButton')
        .setOrigin(0,0)
        .setScale(1)
        .setAlpha(1);

        this.webTazoi = this.add.image(websiteX + 25, websiteY + 630, 'webTazoi')
        .setOrigin(0,0)
        .setScale(1)
        .setAlpha(1)
        .setInteractive()
        .on('pointerdown', () => {
            this.webTazoi.setAlpha(0.5);
        })
        .on('pointerup', () => {
            this.webTazoi.setAlpha(1);
        });

        this.webTazoiText = this.add.image(websiteX + 120, websiteY + 775, 'webTazoiText')
        .setOrigin(0,0)
        .setScale(1)
        .setAlpha(1);

        this.websiteGroup = this.add.group();

        this.websiteGroup.addMultiple([this.website,
            this.webBlishButton,
            this.webBlish,
            this.webBlishText,
            this.webKukoiButton,
            this.webKukoi,
            this.webKukoiText,
            this.webTazoiButton,
            this.webTazoi,
            this.webTazoiText,
        ]);

        this.websiteGroup.getChildren().forEach(function(obj) {

        // set scale
        obj.setScale(websiteScale);
        obj.x *= websiteScale;
        obj.y *= websiteScale;
        });

        this.addFullScreen();
    }

    update() {

    }

    addFullScreen(){
        this.input.keyboard.on('keydown-ESC',  () => {
            // Set the zoom level to 0.8
            this.scale.setZoom(0.8);
        }, this);
        this.fsButton = this.add.image(1885,1045, 'fs')
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                if (this.scale.isFullscreen) {
                    this.fsButton.setTexture('fs');
                    this.scale.stopFullscreen();
                    this.scale.setZoom(0.8);
                } else {
                    this.fsButton.setTexture('minfs');
                    this.scale.startFullscreen();
                    this.scale.setZoom(1);
                }
        });
    }
}


const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [Shop, Earnings],
    title: "Sushi Game"
});