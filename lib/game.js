class Shop extends Phaser.Scene {
    constructor() {
        super("Shop");
    }

    preload() {
        this.load.image('fish', "./assets/fish.png");
        this.load.image('seaweed', "./assets/seaweed.png")
        this.load.image('sushi', "./assets/sushi.png");
        this.load.image('background', "./assets/Gameplay/trueBackground.png");
        this.load.image('closeDoor', "./assets/Gameplay/closeDoor.PNG");
        this.load.image('openDoor', "./assets/Gameplay/doorOpen.PNG");
        this.load.image('riceContainer', "./assets/Gameplay/riceContainer.png");
        this.load.image('money', "./assets/Gameplay/money.PNG");
        this.load.image('fs', "./assets/Gameplay/fullscreen.PNG");
        this.load.image('minfs', "./assets/Gameplay/minimizeScreen.PNG");
        this.load.image('riceClump', "./assets/riceClump.png");
        this.load.image('seaweedPiece', "./assets/SeaweedPiece.png");
        this.load.image('custFluff', "./assets/Customer/customerFluff.png")
        this.load.image('custScales', "./assets/Customer/customerScales.png")
        this.load.image('fluffSpeach', "./assets/Customer/fluffSpeach.png")
        this.load.image('scalesSpeach', "./assets/Customer/fluffSpeach.png")
        this.load.image('blish', "./assets/Customer/blishTalk.png")
        this.load.image('kukoi', "./assets/Customer/kukoiTalk.png")
        this.load.image('tazoi', "./assets/Customer/tazoiTalk.png")
        this.load.image('blish_kukoi', "./assets/Customer/blish_kukoiTalk.png")
        this.load.image('blish_tazoi', "./assets/Customer/blish_tazoiTalk.png")
        this.load.image('kukoi_tazoi', "./assets/Customer/kukoi_tazoiTalk.png")
        this.load.image('blish_kukoi_tazoi', "./assets/Customer/blish_kukoi_tazoiTalk.png")
        this.load.image('blishPiece', "./assets/fishPiece.png")
        this.load.image('blishGlob', "./assets/fishGlob.png")
        this.load.image('tazoiPiece', "./assets/fish2Piece.png")
        this.load.image('tazoiGlob', "./assets/fish2Fillet.png")
        this.load.image('kukoiPiece', "./assets/kukoi.png")
        this.load.image('kukoiGlob', "./assets/kukoiSLice.png")





    }

    init (data) {
        if (data.blish != null) {
            this.blishamount = data.blish;
        }
        else {
            this.blishamount = 10
        }
        if (data.blish != null) {
            this.kukoiamount = data.kukoi;
        }
        else {
            this.kukoiamount = 10
        }
        if (data.blish != null) {
            this.tazoiamount = data.tazoi;
        }
        else {
            this.tazoiamount = 10
        }
        if (data.blish != null) {
            this.money = data.money
        }
        else {
            this.money = 0
        }
    }

    create() {
        console.log(this.blishamount)
        this.daytimer = 300000;
        this.custModel = ['custFluff', 'custScales']
        // set up drag and drop (default drag function didn't work)
        this.dragging = null;
        this.input.on('pointerup', () => {
            if (this.dragging != null) {
                let temp = this.dragging;
                this.dragging = null;
                if (((temp.x > 1460) && (temp.y < 1810)) && ((temp.y > 725) && (temp.y < 975))) {
                    let tween = this.tweens.add({
                        targets: temp,
                        x: 1635,
                        y: 840,
                        duration: 500,
                        ease: 'exponential',
                    });
                    this.amount -= 1
                    this.sushi.push(temp.name)
                    this.makeSushi()
                }
                else {
                    let tween = this.tweens.add({
                        targets: temp,
                        x: temp.origx,
                        y: temp.origy,
                        duration: 500,
                        repeat: 0,
                        ease: 'Power2',
                        onComplete: function() {
                            temp.destroy();
                            temp = null;
                        }
                    });
                    temp.spawner.active = true;
                }
            }
        });
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

        this.seaweed = this.add.image(1800, 500, 'seaweed')
        .setInteractive()
        .on('pointerdown', () => {
            if (this.seaweed.active) {
                this.seaweed.active = false
                let seaweedPiece = this.add.image(game.input.mousePointer.x, game.input.mousePointer.y, 'seaweedPiece')
                seaweedPiece.origx = 1770
                seaweedPiece.origy = 505
                seaweedPiece.spawner = this.seaweed
                this.dragging = seaweedPiece
                this.dragging.name = "seaweedPiece"

                
            }
        });
        this.seaweed.amount = Infinity


        this.riceOpen = this.add.image(1127,530, 'riceContainer')
        .setOrigin(0,0)
        .setScale(1)
        .setInteractive()
        .on('pointerdown', () => {
            if (this.riceOpen.active) {
                this.riceOpen.active = false
                let riceClump = this.add.image(game.input.mousePointer.x, game.input.mousePointer.y, 'riceClump')
                riceClump.origx = 1585
                riceClump.origy = 610
                riceClump.spawner = this.riceOpen
                this.dragging = riceClump
                this.dragging.name = "riceClump"
            }
        });
        this.riceOpen.amount = Infinity

        this.blishPile = this.add.image(360,750, 'blishPiece')
        .setScale(1.5)
        .setInteractive()
        .on('pointerdown', () => {
            if (this.blishPile.active && this.blishPile.amount > 0) {
                this.blishPile.active = false
                let blishGlob = this.add.image(game.input.mousePointer.x, game.input.mousePointer.y, 'blishGlob')
                blishGlob.origx = 360
                blishGlob.origy = 750
                blishGlob.spawner = this.blishPile
                this.dragging = blishGlob
                this.dragging.name = "blish"
            }
        });
        this.blishPile.amount = this.blishamount


        this.tazoiPile = this.add.image(405,875, 'tazoiPiece')
        .setScale(1.5)
        .setInteractive()
        .on('pointerdown', () => {
            if (this.tazoiPile.active && this.tazoiPile.amount > 0) {
                this.tazoiPile.active = false
                let tazoiGlob = this.add.image(game.input.mousePointer.x, game.input.mousePointer.y, 'tazoiGlob')
                tazoiGlob.origx = 405
                tazoiGlob.origy = 875
                tazoiGlob.spawner = this.tazoiPile
                this.dragging = tazoiGlob
                this.dragging.name = "tazoi"
            }
        });
        this.tazoiPile.amount = this.tazoiamount


        this.kukoiPile = this.add.image(680,810, 'kukoiPiece')
        .setScale(1.5)
        .setInteractive()
        .on('pointerdown', () => {
            if (this.kukoiPile.active && this.kukoiPile.amount > 0) {
                this.kukoiPile.active = false
                let kukoiGlob = this.add.image(game.input.mousePointer.x, game.input.mousePointer.y, 'kukoiGlob')
                kukoiGlob.origx = 680
                kukoiGlob.origy = 810
                kukoiGlob.spawner = this.kukoiPile
                this.dragging = kukoiGlob
                this.dragging.name = "kukoi"
            }
        });
        this.kukoiPile.amount = this.kukoiamount


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

        this.hp = 15;
        this.timer = 0;
        

        this.sushi = [];
        this.ingredients = ["blish", "tazoi", "kukoi"];
        this.customers = [];
        this.spawnCustomer();
        
        this.addFullScreen();
    }

    update(delta) {
        // visual drag
        if (this.dragging != null) {
            this.dragging.x = this.input.x
            this.dragging.y = this.input.y
        }

        this.daytimer -= delta;
        if (this.daytimer == 0) {
            this.scene.start('Earnings', { blish: this.blishPile.amount, tazoi: this.tazoiPile.amount, kukoi: this.kukoiPile.amount, money: this.money});
        }
        
        this.timer -= delta;
        if (this.timer <= 0) {
            this.spawnCustomer()
        }
        for (let index = 0; index < this.customers.length; index += 1) {
            this.customers[index].reduceTimer();
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
        if (this.hp > 0) {
            console.log("Hello")
            let rng = Math.floor(Math.random() * 2);
            let tempcust = new Customer(this)
            tempcust.image = this.add.image(0, 0, this.custModel[rng])
            tempcust.image.visible = false
            this.customers.push(tempcust);
            if (this.customers.length == 1) {
                this.nextCustomer();
            }
            this.timer = (Math.ceil(Math.random() * 50) + 200) * 30000;
            console.log(this.timer)
        } 
    };

    cutSushi(ingredient) {
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
        if (this.customers.length > 0) {
            this.customers[0].image.visible = true
            this.customers[0].image.setPosition(1100, 350);
            this.textbox = this.add.image(870, 130, "fluffSpeach")
            let roll = this.customers[0].recipe[2]
            for (let index = 3; index < this.customers[0].recipe.length; index++) {
                roll += "_"
                roll += this.customers[0].recipe[index]
            }
            this.order = this.add.image(870, 120, roll)
        }
        else {
            this.textbox.destroy()
            this.order.destroy()
        }
    }
    makeSushi() {
        let done = true
        if (this.sushi.length != this.customers[0].recipe.length) {
            done = false;
            this.sushi = []
            return;
        }
        for(let i = 0; i < 2; index++) {
            if (!(this.customers[0].recipe[i] == this.sushi[i])) {
                done = false;
                return;
            }
        }
        for(let index = 2; index < this.sushi.length; index++) {
            if (!(this.customers[0].recipe.includes(this.sushi[index]))) {
                done = false;
                return
            }
        }
        
        if (done) {
            this.seaweed.active = true
            this.riceOpen.active = true
            this.blishPile.active = true
            this.tazoiPile.active = true
            this.kukoiPile.active = true
            this.customers[0].satisfy();
        }
    }
}

class Earnings extends Phaser.Scene {
    constructor() {
        super("Earnings");
    }

    init (data) {
        this.blish = data.blish;
        this.kukoi = data.kukoi;
        this.tazoi = data.tazoi;
        this.money = data.money
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
            this.blish += 1
            this.money -= 5
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
            this.kukoi += 1
            this.money -= 5

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
            this.tazoi += 1
            this.money -= 5
        })
        .on('pointerup', () => {
            this.webTazoi.setAlpha(1);
        });

        this.webTazoiText = this.add.image(websiteX + 120, websiteY + 775, 'webTazoiText')
        .setOrigin(0,0)
        .setScale(1)
        .setAlpha(1);

        this.webShop = this.add.image(websiteX + 300, websiteY + 600, 'webButton')
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
            this.webShop,
        ]);

        this.websiteGroup.getChildren().forEach(function(obj) {

        // set scale
        obj.setScale(websiteScale);
        obj.x *= websiteScale;
        obj.y *= websiteScale;
        });

        this.add.text(websiteX + 400, websiteY + 800, "Return to\nshop", { fontSize: 50})
        .setInteractive()
        .on('pointerdown', () => {
            this.scene.start('Shop', { blish: this.blish, tazoi: this.tazoi, kukoi: this.kukoiPile, money: this.money});
        });

        this.addFullScreen();
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