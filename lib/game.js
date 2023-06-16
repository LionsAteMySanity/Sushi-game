class Tutorial extends Phaser.Scene {
    constructor() {
      super({ key: 'Tutorial' });
    }
  
    preload() {
        this.load.json('text', './lib/text.json')
        this.load.video('tutorialVid', './assets/Gameplay/gameplayExample.mp4');
    }

    create() {
        let data = this.cache.json.get('text')
        //this.scene.start('Shop')
        let text = this.add.text(100, 100, data["tutorial"][0], {
            //fontFamily: 'Times New Roman',
            fontSize: 45,
            color: '#ffffff',
            align: "left",
            wordWrap: { width: 1800, useAdvancedWrap: true},
            lineSpacing: 50,
        });

        this.nextPage = this.add.text(1600,1000, data["tutorial"][1]).setTint(0xffffff).setFontSize(60).setInteractive();

        this.nextPage.on('pointerdown', () => {
            this.nextPage.setAlpha(0);
            this.nextPage2.setAlpha(1);
            text.setText(data["tutorial"][2]);
        });

        this.nextPage2 = this.add.text(1600,1000, data["tutorial"][1]).setTint(0xffffff).setFontSize(60).setInteractive().setAlpha(0);

        this.nextPage2.on('pointerdown', () => {
            this.nextPage2.setAlpha(0);
            text.setAlpha(0)
            this.tutorialButton.setAlpha(1)
            this.startButton.setAlpha(1);
            this.creditsButton.setAlpha(1);
            this.add.text(100,800, data["tutorial"][3], {//fontFamily: 'Times New Roman',
            fontSize: 45,
            color: '#ffffff',
            align: "left",
            wordWrap: { width: 1600, useAdvancedWrap: true},
            lineSpacing: 50,
            });
        });

        let tut = this.add.video(1000, 400, 'tutorialVid').setScale(0.9)

        this.tutorialButton = this.add.text(400,300, data["tutorial"][4]).setTint(0xffffff).setFontSize(70).setInteractive().setAlpha(0);

        this.tutorialButton.on('pointerdown', () => {
            // do event
            this.tutorialButton.setAlpha(0)
            tut.play();
        });

        this.startButton = this.add.text(1600,800, data["tutorial"][5]).setTint(0xaa00aa).setFontSize(80).setInteractive().setAlpha(0);

        this.startButton.on('pointerdown', () => {
            // do event
            this.cameras.main.fade(500, 0,0,0);
            this.time.delayedCall(500, () => this.scene.start('Shop'));
        });

        this.creditsButton = this.add.text(1590,900, "Credits").setTint(0xaa00aa).setFontSize(80).setInteractive().setAlpha(0);

        this.creditsButton.on('pointerdown', () => {
            // do event
            this.cameras.main.fade(500, 0,0,0);
            this.time.delayedCall(500, () => this.scene.start('Credits'));
        });
    }
  }

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
        this.load.image('trashcan', "./assets/Gameplay/trashcan.png");
        this.load.image('riceClump', "./assets/riceClump.PNG");
        this.load.image('seaweedPiece', "./assets/SeaweedPiece.PNG");
        this.load.image('custFluff', "./assets/Customer/customerFluff.PNG")
        this.load.image('custScales', "./assets/Customer/customerScales.PNG")
        this.load.image('custTentacles', "./assets/Customer/customerTentacle.PNG")
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
        setup()
        play_music()
        this.synth = new Tone.Synth().toDestination();
        
        console.log(this.game.resources.blish)
        this.daytimer = 2000; // 2000
        this.custModel = ['custFluff', 'custScales', 'custTentacles']
        this.custSpeach = ['fluffSpeach', 'scalesSpeach', 'fluffSpeach']
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
                            x: 90,
                            y: 900,
                            duration: 500,
                            ease: 'exponential',
                        });
                        
                    }

                    this.time.delayedCall(500, ()=> {
                        this.trashSushi()
                    });

                } else if (this.customers[0] && ((temp.x > this.customers[0].image.x - 200) && (temp.x < this.customers[0].image.x + 100)) && ((temp.y > this.customers[0].image.y - 100) && (temp.y < this.customers[0].image.y + 200))) {
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
                let seaweedPiece = this.add.image(game.input.mousePointer.x, game.input.mousePointer.y, 'seaweedPiece').setDepth(10)
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
                let riceClump = this.add.image(game.input.mousePointer.x, game.input.mousePointer.y, 'riceClump').setDepth(10)
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
                let blishGlob = this.add.image(game.input.mousePointer.x, game.input.mousePointer.y, 'blishGlob').setDepth(10)
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
                let tazoiGlob = this.add.image(game.input.mousePointer.x, game.input.mousePointer.y, 'tazoiGlob').setDepth(10)
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
                let kukoiGlob = this.add.image(game.input.mousePointer.x, game.input.mousePointer.y, 'kukoiGlob').setDepth(10)
                kukoiGlob.origx = 680
                kukoiGlob.origy = 810
                kukoiGlob.spawner = this.kukoiPile
                this.dragging = kukoiGlob
                this.dragging.name = "kukoi"
            }
        });
        this.kukoiPile.amount = this.game.resources.kukoi


        this.trash = this.add.image(90,940,"trashcan")
        .setScale(0.5)


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
        

        this.moneysign = this.add.image(50,10, 'money')
        .setOrigin(0,0)
        .setScale(0.25);

        this.hp = 15;
        this.timer = 0;

        this.score = this.add.text(100,10,"").setFontSize(50)
        this.updateScore()
        
        this.load.image('blish', "./assets/Customer/blishTalk.png")
        this.load.image('kukoi', "./assets/Customer/kukoiTalk.png")
        this.load.image('tazoi', "./assets/Customer/tazoiTalk.png")
        this.load.image('blish_kukoi', "./assets/Customer/blishKukoiTalk.png")
        this.load.image('blish_tazoi', "./assets/Customer/blishTazoiTalk.png")
        this.load.image('kukoi_tazoi', "./assets/Customer/tazoiKukoiTalk.png")
        this.load.image('blish_kukoi_tazoi', "./assets/Customer/blishTazoiKukoiTalk.png")
        this.sushi = [];
        this.ingredients = ["blish", "tazoi", "kukoi"];

        this.recipes = ["blish", "tazoi", "kukoi", 
                    "blish_kukoi", "blish_tazoi","kukoi_tazoi", "blish_kukoi_tazoi"];
        this.customers = [];
        this.spawnCustomer();

      //Trigger a sound when a button is clicked
      const button = this.add.text(1860, 930, 'Mute', { fill: '#0f0' })
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => {
            toggle_mute()
        });
        
        this.addFullScreen();
    }

    update(delta) {
        play_music()
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
        this.score.setText(": " + this.game.scoreboard.money + " correct orders: " + this.game.scoreboard.correct +" wrong orders:" + this.game.scoreboard.wrong + " timeout orders:" + this.game.scoreboard.timeout);
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
                this.rng = Phaser.Math.Between(0,2)
                console.log(this.rng)
                let tempcust = new Customer(this)
                tempcust.image = this.add.image(0, 0, this.custModel[this.rng])
                tempcust.speach = this.add.image(0, 0, this.custSpeach[this.rng])
                if(this.rng == 0)
                    tempcust.speach.setPosition(870,130)
                else if (this.rng == 1)
                    tempcust.speach.setPosition(870,180)
                else if(this.rng == 2){
                    tempcust.speach.setPosition(870,130)
                    tempcust.image.setScale(0.6)
                }
                

                tempcust.image.visible = false
                tempcust.speach.visible = false
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
        this.synth.triggerAttackRelease("e2", "0.2" );
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
        if (this.order)
            this.order.destroy()

        if (this.customers.length > 0) {
            this.customers[0].image.visible = true
            this.customers[0].image.setPosition(1100, 350);
            //this.customers[0].image.setDepth(0)
            this.customers[0].speach.visible = true
            //this.customers[0].speach.setPosition(870,130)
            //this.textbox = this.add.image(870, 130, this.custSpeach[rng]) no longer needed
            let roll = this.customers[0].recipe[2]
            console.log(roll)
            for (let index = 3; index < this.customers[0].recipe.length; index++) {
                roll += "_"
                roll += this.customers[0].recipe[index]
                console.log(roll)
            }

            console.log(roll)
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
            this.wrongOrder()
            return;
        }
        for(let i = 0; i < 2; i++) {
            if (!(this.customers[0].recipe[i] == this.sushi[i].name)) {
                done = false;
                console.log('false, wrong base');
                this.wrongOrder()
                return;
            }
        }
        for(let index = 2; index < this.sushi.length; index++) {
            if (!(this.customers[0].recipe.includes(this.sushi[index].name))) {
                done = false;
                console.log('false, has correct base but wrong toppings');
                this.wrongOrder()
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
        this.synth.triggerAttackRelease("c5", "0.1" );


        for(let i = this.sushi.length - 1; i >= 0; i--)
            this.sushi[i].destroy()

        this.sushi = [];
    }

    wrongOrder(){
        this.trashSushi()
        this.game.scoreboard.wrong+= 1;
        this.updateScore()
        this.synth.triggerAttackRelease("b1", "0.3", "+0.3" );
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


        this.load.image('0', "./assets/Progress/0.png");
        this.load.image('1', "./assets/Progress/1.png");
        this.load.image('2', "./assets/Progress/2.png");
        this.load.image('3', "./assets/Progress/3.png");
        this.load.image('4', "./assets/Progress/4.png");
        this.load.image('5', "./assets/Progress/5.png");
        this.load.image('6', "./assets/Progress/6.png");
        this.load.image('7', "./assets/Progress/7.png");
        this.load.image('8', "./assets/Progress/8.png");
        this.load.image('9', "./assets/Progress/9.png");
        this.load.image('moneyProg', "./assets/Progress/moneyProgress.PNG");
        this.load.image('blishProg', "./assets/Progress/blishProgress.png");
        this.load.image('kukoiProg', "./assets/Progress/kukoiProgress.PNG");
        this.load.image('tazoiProg', "./assets/Progress/tazoiProgress.PNG");

        this.load.image('progscreen', "./assets/Progress/ProgressScreen.PNG");
        this.load.image('testprog', "./assets/Progress/visualtest.png")
        this.load.image('nextProg', "./assets/Progress/next.PNG");
        this.load.image('dayProg', "./assets/Progress/day.PNG");
        this.load.image('progressProg', "./assets/Progress/progress.PNG");
        this.load.image('fundsProg', "./assets/Progress/funds.PNG");
        this.load.image('stockProg', "./assets/Progress/stock.PNG");
    }

    create() {
        this.synth = new Tone.Synth().toDestination();


        let websiteX = 0;
        let websiteY = 0;
        let websiteScale = 1.25;

        // create progress screen

        this.add.image(350,0, "progscreen").setOrigin(0,0).setScale(0.95)

        let progressBar = this.add.sprite(
            1089,
            145,
            'progressProg',
        ).setScale(0.95)
        .setAlpha(1)
        .setInteractive();

        const chain = this.tweens.chain({
            repeat : -1,
            targets: [progressBar],
            tweens: [
                {
                    duration: 0,
                    alpha: 0,
                    ease: 'Linear'
                },
                {
                    duration: 500,
                    alpha: 1,
                    ease: 'Linear'
                },
                {
                    duration: 500,
                    alpha: 1,
                    ease: 'Linear'
                },
                {
                    duration: 500,
                    alpha: 0,
                    ease: 'Linear'
                    
                }
            ]
        });

        this.next = this.add.image(
            870,
            985,
            'nextProg',
        ).setScale(0.95)
        .setAlpha(0.01)
        .setInteractive()
        .on('pointerdown', () => {
            this.game.day++;
            this.scene.start('Shop', { blish: this.blish, tazoi: this.tazoi, kukoi: this.kukoiPile, money: this.money});
        });

        this.lightup(this.next);

        this.funds = this.add.image(
            895,
            385,
            'fundsProg',
        ).setScale(0.95)
        .setAlpha(1)

        this.fundsSign = this.add.image(
            1150,
            385,
            'moneyProg',
        ).setScale(0.95)
        .setAlpha(1)

        this.fundsNumber = [];
        this.createNumber(1250,380, this.fundsNumber, this.game.scoreboard.money);

        //console.log(this.fundsNumber)

        this.stock = this.add.image(
            895,
            585,
            'stockProg',
        ).setScale(0.95)
        .setAlpha(1)

        this.blishProg = this.add.image(
            1220,
            585,
            'blishProg',
        ).setScale(1.1)
        .setAlpha(1)

        this.blishNumber = [];
        this.createNumber(1160,580, this.blishNumber, this.game.resources.blish);


        this.tazoiProg = this.add.image(
            1530,
            530,
            'tazoiProg',
        ).setScale(1.2)
        .setAlpha(1)

        this.tazoiNumber = [];
        this.createNumber(1360,510, this.tazoiNumber, this.game.resources.tazoi);

        this.kukoiProg = this.add.image(
            1830,
            585,
            'kukoiProg',
        ).setScale(1.4)
        .setAlpha(1)

        this.kukoiNumber = [];
        this.createNumber(1790,565, this.kukoiNumber, this.game.resources.kukoi);

        this.day = this.add.image(
            850,
            785,
            'dayProg',
        ).setScale(0.95)
        .setAlpha(1)

        this.dayNumber = [];
        this.createNumber(1050,780, this.dayNumber, this.game.day);

        // create website
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
                this.synth.triggerAttackRelease("c4", "0.3");
                //this.updateText();
                this.createNumber(1250,380, this.fundsNumber, this.game.scoreboard.money);
                this.createNumber(1160,580, this.blishNumber, this.game.resources.blish);
            } else {
                this.synth.triggerAttackRelease("b2", "0.3");
                this.fundsSign.setTint("0xff0000")
                this.funds.setTint("0xff0000")
                for ( let i = 0; i < this.fundsNumber.length; i++){
                    this.fundsNumber[i].setTint("0xff0000")
                }
                
            }
            
        })
        .on('pointerup', () => {
            this.webBlish.setAlpha(1);
            this.fundsSign.setTint("0xffffff")
            this.funds.setTint("0xffffff")
            for ( let i = 0; i < this.fundsNumber.length; i++){
                this.fundsNumber[i].setTint("0xffffff")
            }
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
                this.synth.triggerAttackRelease("c4", "0.3");
                //this.updateText();
                this.createNumber(1250,380, this.fundsNumber, this.game.scoreboard.money);
                this.createNumber(1790,565, this.kukoiNumber, this.game.resources.kukoi);
            } else {
                this.synth.triggerAttackRelease("b2", "0.3");
                this.fundsSign.setTint("0xff0000")
                this.funds.setTint("0xff0000")
                for ( let i = 0; i < this.fundsNumber.length; i++){
                    this.fundsNumber[i].setTint("0xff0000")
                }
                
            }
        })
        .on('pointerup', () => {
            this.webKukoi.setAlpha(1);
            this.fundsSign.setTint("0xffffff")
            this.funds.setTint("0xffffff")
            for ( let i = 0; i < this.fundsNumber.length; i++){
                this.fundsNumber[i].setTint("0xffffff")
            }
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
                this.synth.triggerAttackRelease("c4", "0.3");
                //this.updateText();
                this.createNumber(1250,380, this.fundsNumber, this.game.scoreboard.money);
                this.createNumber(1360,510, this.tazoiNumber, this.game.resources.tazoi);
            } else {
                this.synth.triggerAttackRelease("b2", "0.3");
                this.fundsSign.setTint("0xff0000")
                this.funds.setTint("0xff0000")
                for ( let i = 0; i < this.fundsNumber.length; i++){
                    this.fundsNumber[i].setTint("0xff0000")
                }
                
            }
        })
        .on('pointerup', () => {
            this.webTazoi.setAlpha(1);
            this.fundsSign.setTint("0xffffff")
            this.funds.setTint("0xffffff")
            for ( let i = 0; i < this.fundsNumber.length; i++){
                this.fundsNumber[i].setTint("0xffffff")
            }
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
        // this.score = this.add.text(1300,300,"",{fontSize: 50, wordWrap: { width:600, useAdvancedWrap: true},
        // lineSpacing: 20,});

        // this.resources = this.add.text(750,300,"",{fontSize: 50, wordWrap: { width:600, useAdvancedWrap: true},
        // lineSpacing: 20,});

        // this.updateText();

        // this.add.text(1000,100,"Day " + this.game.day,{fontSize: 75});

        // this.add.text(websiteX + 1000, websiteY + 800, "Return to\nshop", { fontSize: 50})
        // .setInteractive()
        // .on('pointerdown', () => {
        //     this.game.day++;
        //     this.scene.start('Shop', { blish: this.blish, tazoi: this.tazoi, kukoi: this.kukoiPile, money: this.money});
        // });

    

        let number = [];
        this.createNumber(300,300, number, 1337)

        this.addFullScreen();
    }

    // updateText(){
    //     this.score.setText("money: " + this.game.scoreboard.money + "\ncorrect orders: " + this.game.scoreboard.correct +"\nwrong orders: " + this.game.scoreboard.wrong + "\ntimeout orders: " + this.game.scoreboard.timeout);
    //     this.resources.setText("blish: " + this.game.resources.blish + "\nkukoi: " + this.game.resources.kukoi + "\ntazoi: " + this.game.resources.tazoi +"\n seaweed pieces: " + this.game.resources.seaweedPiece + "\n rice clumps: " + this.game.resources.riceClump);
    // }

    createNumber(x, y, numberArray, number){


        let n = number.toString() // convert integer to string

        // empty image array
        for(let i = numberArray.length - 1; i >= 0; i--) 
            numberArray[i].destroy()

        numberArray.length = 0

        // create image array
        for (let i = 0; i < n.length; i++) {
            numberArray.push(this.add.image(x + (i *45), y, n[i]).setDepth(100))
        }

        //console.log(numberArray)
        

    }

    lightup(item){
        item.on('pointerdown', ()=> {
            this.tweens.add({
                targets: item,
                alpha: 1,
                duration: 1,
            });
        })

        item.on('pointerup', ()=> {
            this.tweens.add({
                targets: item,
                alpha: .01,
                duration: 1,
            });
         })

         item.on('pointerover', ()=> {
            this.tweens.add({
                targets: item,
                alpha: .5,
                duration: 1,
            });
         })
         
         item.on('pointerout', ()=> {
            this.tweens.add({
                targets: item,
                alpha: .01,
                duration: 1,
            });
         })
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

class Credits extends Phaser.Scene {
    constructor() {
      super({ key: 'Credits' });
    }
    
    preload() {
        this.load.json('text', './lib/text.json')
    }
    create() {
        
        this.text = this.add.text(850, 540, data["credits"][0], {
            //fontFamily: 'Times New Roman',
            fontSize: 45,
            color: '#ffffff',
            align: "center",
            wordWrap: { width: 1800, useAdvancedWrap: true},
            lineSpacing: 50,
        });
        this.text = this.add.text(300, 640, data["credits"][1], {
            //fontFamily: 'Times New Roman',
            fontSize: 45,
            color: '#ffffff',
            align: "center",
            wordWrap: { width: 1800, useAdvancedWrap: true},
            lineSpacing: 50,
        });
        this.text = this.add.text(850, 640, data["credits"][2], {
            //fontFamily: 'Times New Roman',
            fontSize: 45,
            color: '#ffffff',
            align: "center",
            wordWrap: { width: 1800, useAdvancedWrap: true},
            lineSpacing: 50,
        });
        this.text = this.add.text(1300, 640, data["credits"][3], {
            //fontFamily: 'Times New Roman',
            fontSize: 45,
            color: '#ffffff',
            align: "center",
            wordWrap: { width: 1800, useAdvancedWrap: true},
            lineSpacing: 50,
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
    scene: [Tutorial, Shop, Earnings, Credits],
    title: "Sushi Game"
});

game.scoreboard = {'money' : 0, 'correct' : 0, 'wrong' : 0, 'timeout' : 0};
game.day = 1;
game.resources = {"blish" : 10, "kukoi" : 10, "tazoi" : 10, "seaweedPiece" : Infinity, "riceClump" : Infinity};
