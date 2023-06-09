class Cinematic extends Phaser.Scene {

    constructor() {
        super('Cinematic');
    }
    preload(){

    }
    create(){
        this.add.text(500,200, "Welcome to Sushi Game").setTint(0xaa00aa).setFontSize(75);
        this.add.text(900,500, "tap to skip intro").setTint(0xaa00aa).setFontSize(75).setOrigin(0.5,0);
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(100, 0,0,0);
            this.time.delayedCall(100, () => this.scene.start('Menu'));
        });

        let event = this.time.addEvent({
            delay: 2000, // Delay between each word (in milliseconds)
            callback: () => {
                this.cameras.main.fade(1000, 0,0,0);
                this.time.delayedCall(1000, () => this.scene.start('Menu'));
            },
            callbackScope: this,
            loop: false
        });
    
        
    }
    
    update(){

    }
}

class Menu extends Phaser.Scene {

    constructor() {
        super('Menu');
    }
    preload(){

    }
    create(){
        this.cameras.main.fadeIn(500, 0, 0, 0);

        this.add.text(700,300, "Sushi Game").setTint(0xaa00aa).setFontSize(75);
        this.startButton = this.add.text(200,500, "Start").setTint(0xaa00aa).setFontSize(75).setInteractive();
        this.creditButton = this.add.text(200,600, "Credits").setTint(0xaa00aa).setFontSize(75).setInteractive();

        this.startButton.on('pointerdown', () => {
            this.cameras.main.fade(500, 0,0,0);
            this.time.delayedCall(500, () => this.scene.start('Gameplay'));
        });

        this.creditButton.on('pointerdown', () => {
            this.cameras.main.fade(500, 0,0,0);
            this.time.delayedCall(500, () => this.scene.start('Credits'));
        });
    
        
    }
    
    update(){

    }
}

class Credits extends Phaser.Scene {

    constructor() {
        super('Credits');
    }
    preload(){

    }
    create(){
        this.cameras.main.fadeIn(500, 0, 0, 0);

        this.add.text(200,300, "A game by Collette Harrison, Sam Meyer, Phil Meyer").setTint(0xaa00aa).setFontSize(50);
        this.backButton = this.add.text(200,600, "Go back").setTint(0xaa00aa).setFontSize(75).setInteractive();

        this.backButton.on('pointerdown', () => {
            // do event
            this.cameras.main.fade(500, 0,0,0);
            this.time.delayedCall(500, () => this.scene.start('Menu'));
        });

        
    }
    
    update(){

    }
}

class Gameplay extends Phaser.Scene {

    constructor() {
        super('Gameplay');
    }
    preload(){

    }
    create(){
        this.cameras.main.fadeIn(500, 0, 0, 0);
        
        this.cameras.main.setBackgroundColor('0xffffff');
        this.add.text(500,400, "Gameplay Screen").setTint(0x0000ff).setFontSize(75);
        this.timeText = this.add.text(100,120, "Opening hour").setTint(0x0000ff).setFontSize(75).setOrigin(0,0);
        this.dayText = this.add.text(100,50, ("Day: " + this.game.data.currentDay)).setTint(0x0000ff).setFontSize(75).setOrigin(0,0);
        this.currentTime = 8;
        this.am = true;
        let event = this.time.addEvent({
            delay: 750, // Delay between each word (in milliseconds)
            callback: () => {
                // Check if there are more words to display
                this.currentTime++;
                let am = ' am';
                if (this.currentTime > 12 && this.am == true) {
                    // past 12 pm
                    this.am = false;
                    this.currentTime = 1;
                } 
                
                if (this.am == false){
                    am = ' pm';
                }

                if(this.currentTime > 8 && this.am == false){
                    // closing
                    this.timeText.setText("closing...");
                    event.remove();
                    this.closeShop();
                } else 
                    this.timeText.setText(this.currentTime + am);
            },
            callbackScope: this,
            loop: true
        });

        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('Results'));
        });
    
        
    }

    closeShop(){
        this.cameras.main.fade(1000, 0,0,0);
        this.time.delayedCall(1000, () => this.scene.start('Results'));
    }
    
    update(){

    }
}

class Results extends Phaser.Scene {

    constructor() {
        super('Results');
    }
    preload(){

    }
    create(){
        this.cameras.main.fadeIn(500, 0, 0, 0);
        
        this.cameras.main.setBackgroundColor('0x3333ff');
        this.add.text(500,200, "Results Screen").setTint(0xffffff).setFontSize(75);

        this.startButton = this.add.text(200,500, "Start the next day").setTint(0xffffff).setFontSize(75).setInteractive();
        this.menuButton = this.add.text(200,700, "Go back to Menu").setTint(0xffffff).setFontSize(75).setInteractive();

        this.startButton.on('pointerdown', () => {
            this.game.data.currentDay++;

            this.cameras.main.fade(500, 0,0,0);
            this.time.delayedCall(500, () => this.scene.start('Gameplay'));
        });

        this.menuButton.on('pointerdown', () => {
            this.cameras.main.fade(500, 0,0,0);
            this.time.delayedCall(500, () => this.scene.start('Menu'));
        });
    
        
    }
    
    update(){

    }
}

let config = {
    type: Phaser.WEBGL,
    width: 1920,
    height: 1080,
    backgroundColor: 0x0,
    scene: [Cinematic,Menu,Gameplay,Results,Credits],
}

let game = new Phaser.Game(config);

game.data = {
    currentDay: 0,
}

