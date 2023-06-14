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
        this.load.image('riceClump', "./assets/riceClump.PNG");
        this.load.image('seaweedPiece', "./assets/SeaweedPiece.png");
        this.load.image('custFluff', "./assets/Customer/customerFluff.PNG")
        this.load.image('custScales', "./assets/Customer/customerScales.PNG")
        this.load.image('fluffSpeach', "./assets/Customer/fluffSpeach.PNG")
        this.load.image('scalesSpeach', "./assets/Customer/scalesSpeach.PNG")
        this.load.image('blish', "./assets/Customer/blishTalk.png")
        this.load.image('kukoi', "./assets/Customer/kukoiTalk.png")
        this.load.image('tazoi', "./assets/Customer/tazoiTalk.png")
        this.load.image('blish_kukoi', "./assets/Customer/blishKukoiTalk.png")
        this.load.image('blish_tazoi', "./assets/Customer/blishTazoiTalk.png")
        this.load.image('kukoi_tazoi', "./assets/Customer/tazoiKukoiTalk.png")
        this.load.image('blish_kukoi_tazoi', "./assets/Customer/blishTazoiKukoiTalk.png")
        this.load.image('blishPiece', "./assets/fishPiece.PNG")
        this.load.image('blishGlob', "./assets/fishGlob.png")
        this.load.image('tazoiPiece', "./assets/fish2Piece.png")
        this.load.image('tazoiGlob', "./assets/fish2Fillet.PNG")
        this.load.image('kukoiPiece', "./assets/Kukoi.PNG")
        this.load.image('kukoiGlob', "./assets/kukoiSLice.PNG")





    }

    init (data) {
        // if (data.blish != null) {
        //     this.blishamount = data.blish;
        // }
        // else {
        //     this.blishamount = 10
        // }
        // if (data.blish != null) {
        //     this.kukoiamount = data.kukoi;
        // }
        // else {
        //     this.kukoiamount = 10
        // }
        // if (data.blish != null) {
        //     this.tazoiamount = data.tazoi;
        // }
        // else {
        //     this.tazoiamount = 10
        // }
        // if (data.blish != null) {
        //     this.money = data.money
        // }
        // else {
        //     this.money = 0
        // }
    }

    create() {
        console.log(this.game.resources.blish)
        this.daytimer = 2000;
        this.custModel = ['custFluff', 'custScales']
        // set up drag and drop (default drag function didn't work)
        this.dragging = null;
        this.draggingDish = null;
        this.input.on('pointerup', () => {
            if (this.dragging != null) {
                let temp = this.dragging;
                this.dragging = null;
                if (((temp.x > 1460) && (temp.x < 1810)) && ((temp.y > 725) && (temp.y < 975))) {
                    let tween = this.tweens.add({
                        targets: temp,
                        x: 1635,
                        y: 840,
                        duration: 500,
                        ease: 'exponential',
                    });
                    this.game.resources[temp.name] -= 1
                    console.log(this.game.resources)
                    //this.amount -= 1
                    this.sushi.push(temp)
                    //console.log(this.sushi);
                    if(this.sushi.length){
                        this.sushi[0].setInteractive()
                        .on('pointerdown', () => {
                            this.draggingDish = this.sushi[0]
            
                        });
                    }
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

            if (this.draggingDish != null) {
                let temp = this.draggingDish;
                this.draggingDish = null;
                //console.log(temp.x)
                //console.log(temp.y)
                if (((temp.x > this.trash.x - 200) && (temp.x < this.trash.x + 100)) && ((temp.y > this.trash.y - 100) && (temp.y < this.trash.y + 100))) {
                    for ( let i = this.sushi.length - 1; i >= 0; i--){
                        let tween = this.tweens.add({
                            targets: this.sushi[i],
                            x: 1800,
                            y: 100,
                            duration: 500,
                            ease: 'exponential',
                            onComplete: ()=> {
                                this.trashSushi()
                            },
                        });
                    }

                } else if (this.customers[0] && ((temp.x > this.customers[0].image.x - 200) && (temp.x < this.customers[0].image.x + 100)) && ((temp.y > this.customers[0].image.y - 100) && (temp.y < this.customers[0].image.y + 100))) {
                    for ( let i = this.sushi.length - 1; i >= 0; i--){
                        let tween = this.tweens.add({
                            targets: this.sushi[i],
                            x: this.customers[0].image.x,
                            y: this.customers[0].image.y+200,
                            duration: 500,
                            ease: 'exponential',
                            onComplete: ()=> {
                            },
                        });
                    }

                    this.time.delayedCall(500, ()=> {
                        console.log('to customer')
                        this.makeSushi()
                    });
                    

                } else {
                    for ( let i = this.sushi.length - 1; i >= 0; i--){
                        
                        let tween = this.tweens.add({
                            targets: this.sushi[i],
                            x: 1635,
                            y: 840,
                            duration: 500,
                            repeat: 0,
                            ease: 'Power2',
                            onComplete: function() {
                                //temp.destroy();
                                //temp = null;
                            }
                        });
                    }
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
        this.blishPile.amount = this.game.resources.blish


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
        this.tazoiPile.amount = this.game.resources.tazoi


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
        this.kukoiPile.amount = this.game.resources.kukoi


        this.trash = this.add.rectangle(1800,100,100,100,"0x002200")
        .setScale(1.5)


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
        

        this.moneysign = this.add.image(10,10, 'money')
        .setOrigin(0,0)
        .setScale(0.25);

        this.hp = 15;
        this.timer = 0;

        this.score = this.add.text(100,10,"").setFontSize(50)
        this.updateScore()
        

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

        if (this.draggingDish != null) {
            this.draggingDish.x = this.input.x
            this.draggingDish.y = this.input.y

            for(let i = this.sushi.length - 1; i >= 0; i--){
                this.sushi[i].x = this.draggingDish.x
                this.sushi[i].y = this.draggingDish.y
            }
        }

        this.daytimer--;
        if (this.daytimer == 0) {
            this.scene.start('Earnings', { blish: this.blishPile.amount, tazoi: this.tazoiPile.amount, kukoi: this.kukoiPile.amount, money: this.money});
        }
        
        //console.log(this.timer)

        this.timer--;
        if (this.timer <= 0) {
            this.spawnCustomer()
        }
        // for (let index = 0; index < this.customers.length; index += 1) {
        //     this.customers[index].reduceTimer();
        // }

        // change customer timeout to reduce when not waiting in line anymore, at front waiting for order
        if(this.customers[0])
            this.customers[0].reduceTimer();
    }

    updateScore(){
        this.score.setText("money: " + this.game.scoreboard.money + " correct orders: " + this.game.scoreboard.correct +" wrong orders:" + this.game.scoreboard.wrong + " timeout orders:" + this.game.scoreboard.timeout);
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
            this.time.delayedCall(1500, ()=> {
                console.log("Hello")
                let rng = Math.floor(Math.random() * 2);
                let tempcust = new Customer(this)
                tempcust.image = this.add.image(0, 0, this.custModel[rng])
                tempcust.image.visible = false
                this.customers.push(tempcust);
                console.log(this.customers)
                if (this.customers.length == 1) {
                    this.nextCustomer();
                }
            });
            this.timer = Phaser.Math.Between(2, 12) * 100;
            console.log(this.timer)
        } 
    };

    trashSushi(){
        console.log('trash')
        for(let i = this.sushi.length - 1; i >= 0; i--)
            this.sushi[i].destroy()

        this.sushi = [];
        this.kukoiPile.active = true
        this.tazoiPile.active = true
        this.blishPile.active = true
        this.riceOpen.active = true
        this.seaweed.active = true
    }

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
        if (this.textbox)
            this.textbox.destroy()
        if (this.order)
            this.order.destroy()

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
        
    }
    makeSushi() {

        let done = true
        console.log(this.sushi);
        console.log(this.customers[0].recipe);
        console.log(this.customers);
        
        if (this.sushi.length != this.customers[0].recipe.length) {
            done = false;
            //this.sushi = []
            console.log('false, not enough ingredients');
            this.trashSushi()
            this.game.scoreboard.wrong+= 1;
            this.updateScore()
            return;
        }
        for(let i = 0; i < 2; i++) {
            if (!(this.customers[0].recipe[i] == this.sushi[i].name)) {
                done = false;
                console.log('false, wrong base');
                this.trashSushi()
                this.game.scoreboard.wrong+= 1;
                this.updateScore()
                return;
            }
        }
        for(let index = 2; index < this.sushi.length; index++) {
            if (!(this.customers[0].recipe.includes(this.sushi[index].name))) {
                done = false;
                console.log('false, has correct base but wrong toppings');
                this.trashSushi()
                this.game.scoreboard.wrong+= 1;
                this.updateScore()
                return
            }
        }
        
        if (done) {
            console.log('true');
        }

        this.seaweed.active = true
        this.riceOpen.active = true
        this.blishPile.active = true
        this.tazoiPile.active = true
        this.kukoiPile.active = true
        this.customers[0].satisfy();
        this.game.scoreboard.correct+= 1;
        this.game.scoreboard.money+= 100;
        this.updateScore()

        for(let i = this.sushi.length - 1; i >= 0; i--)
            this.sushi[i].destroy()

        this.sushi = [];
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
        .setAlpha(1)
        .setInteractive()
        .on('pointerdown', () => {
            this.webBlish.setAlpha(0.5);

            if(this.game.scoreboard.money >= 5){
                this.game.resources.blish += 1
                this.game.scoreboard.money -= 5
                this.updateText();
            }
            
        })
        .on('pointerup', () => {
            this.webBlish.setAlpha(1);
        });

        this.webBlish = this.add.image(websiteX + 300, websiteY + 390, 'webBlish')
        .setOrigin(0,0)
        .setScale(1)
        .setAlpha(1);

        this.webBlishText = this.add.image(websiteX + 400, websiteY + 540, 'webBlishText')
        .setOrigin(0,0)
        .setScale(1)
        .setAlpha(1);

        // Kukoi

        this.webKukoiButton = this.add.image(websiteX + 30, websiteY + 370, 'webButton')
        .setOrigin(0,0)
        .setScale(1)
        .setAlpha(1)
        .setInteractive()
        .on('pointerdown', () => {
            this.webKukoi.setAlpha(0.5);

            if(this.game.scoreboard.money >= 2){
                this.game.resources.kukoi += 1
                this.game.scoreboard.money -= 2
                this.updateText();
            }
        })
        .on('pointerup', () => {
            this.webKukoi.setAlpha(1);
        });

        this.webKukoi = this.add.image(websiteX + 80, websiteY + 400, 'webKukoi')
        .setOrigin(0,0)
        .setScale(1)
        .setAlpha(1);

        this.webKukoiText = this.add.image(websiteX + 120, websiteY + 530, 'webKukoiText')
        .setOrigin(0,0)
        .setScale(1)
        .setAlpha(1);

        // Tazoi

        this.webTazoiButton = this.add.image(websiteX + 30, websiteY + 600, 'webButton')
        .setOrigin(0,0)
        .setScale(1)
        .setAlpha(1)
        .setInteractive()
        .on('pointerdown', () => {
            this.webTazoi.setAlpha(0.5);

            if(this.game.scoreboard.money >= 10){
                this.game.resources.tazoi += 1
                this.game.scoreboard.money -= 10
                this.updateText();
            }
        })
        .on('pointerup', () => {
            this.webTazoi.setAlpha(1);
        });

        this.webTazoi = this.add.image(websiteX + 25, websiteY + 630, 'webTazoi')
        .setOrigin(0,0)
        .setScale(1)
        .setAlpha(1);

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

        // add results/score
        this.score = this.add.text(1300,300,"",{fontSize: 50, wordWrap: { width:600, useAdvancedWrap: true},
        lineSpacing: 20,});

        this.resources = this.add.text(750,300,"",{fontSize: 50, wordWrap: { width:600, useAdvancedWrap: true},
        lineSpacing: 20,});

        this.updateText();

        this.add.text(1000,100,"Day " + this.game.day,{fontSize: 75});

        this.add.text(websiteX + 1000, websiteY + 800, "Return to\nshop", { fontSize: 50})
        .setInteractive()
        .on('pointerdown', () => {
            this.game.day++;
            this.scene.start('Shop', { blish: this.blish, tazoi: this.tazoi, kukoi: this.kukoiPile, money: this.money});
        });

        this.addFullScreen();
    }

    updateText(){
        this.score.setText("money: " + this.game.scoreboard.money + "\ncorrect orders: " + this.game.scoreboard.correct +"\nwrong orders: " + this.game.scoreboard.wrong + "\ntimeout orders: " + this.game.scoreboard.timeout);
        this.resources.setText("blish: " + this.game.resources.blish + "\nkukoi: " + this.game.resources.kukoi + "\ntazoi: " + this.game.resources.tazoi +"\n seaweed pieces: " + this.game.resources.seaweedPiece + "\n rice clumps: " + this.game.resources.riceClump);
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

game.scoreboard = {'money' : 0, 'correct' : 0, 'wrong' : 0, 'timeout' : 0};
game.day = 1;
game.resources = {"blish" : 10, "kukoi" : 10, "tazoi" : 10, "seaweedPiece" : Infinity, "riceClump" : Infinity};
