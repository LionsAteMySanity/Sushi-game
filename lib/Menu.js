var clicked = false
class Start extends Phaser.Scene{
    constructor() {
        super("Start")
    }
    create(){
        this.add.text(700,540,"Click to begin", {fontSize: 65, fill: '#fff2cc', fontStyle: 'italic'});
                    this.input.on('pointerdown', () => this.scene.start('intro'));
    
    }

}


class intro extends Phaser.Scene{
    constructor() {
        super("intro")
    }
    preload(){
        this.load.path = './assets/';
        this.load.audio('growl', 'MainMenu/Growl.mp3');
        this.load.video('logo', 'MainMenu/logo.mp4');
    }
    create(){
        this.graphics = this.add.graphics();
        this.cameras.main.fadeIn(1000, 0,0,0);
        var video = this.add.video(960, 540, 'logo').setScale(.3);

        this.time.delayedCall(100, () => {
            video.play();
            this.sound.add ('growl').play();
        });
      
        this.time.delayedCall(2000, () => {
            this.cameras.main.fadeOut(2000, 0,0,0);
        });
        this.time.delayedCall(4200, () => {
            this.scene.start('Menu')
        });
    }
}


class Menu extends Phaser.Scene {
    constructor() {
        super("Menu")
    }

    preload() {
        this.load.image('menuBack', "./assets/MainMenu/backdropMenu.PNG")
        this.load.image('fishBack', "./assets/MainMenu/backdropFish.PNG")
        this.load.image('continue', "./assets/MainMenu/Continue.PNG")
        this.load.image('unlitFish', "./assets/MainMenu/fishUnlit.PNG")
        this.load.image('unlitMenu', "./assets/MainMenu/MenuUnlit.PNG")
        this.load.image('quit', "./assets/MainMenu/Quit.PNG")
        this.load.image('start', "./assets/MainMenu/Start.PNG")
        this.load.image('credits', "./assets/MainMenu/credits.png")
        this.load.image('setting', "./assets/MainMenu/setting.png")
        this.load.image('fish', "./assets/MainMenu/neonFish.png")
        this.load.image('fs', "./assets/Gameplay/fullscreen.PNG");
        this.load.image('minfs', "./assets/Gameplay/minimizeScreen.PNG");
    }
    create(){
        this.cameras.main.fadeIn(2000, 0,0,0);
        this.menuBack = this.add.image(980, 550, 'menuBack')
        .setScale(1);
        this.fishBack = this.add.image(630, 350, 'fishBack')
        .setScale(1);
        this.unlitFish = this.add.image(630, 350, 'unlitFish')
        .setScale(1);
        this.unlitMenu = this.add.image(980, 550, 'unlitMenu')
        .setScale(1);

        let fish = this.add.sprite(
            630,
            350,
            'fish',
        ).setScale(1)
        .setAlpha(0.01)
        .setInteractive();

        let setting = this.add.sprite(
            400,
            880,
            'setting',
        ).setScale(1)
        .setAlpha(0.01)
        .setInteractive();

        this.lightup(setting)

        let credits = this.add.sprite(
            900,
            876,
            'credits',
        ).setScale(1)
        .setAlpha(0.01)
        .setInteractive();

        this.lightup(credits)

        let quit = this.add.sprite(
            1474,
            876,
            'quit',
        ).setScale(1)
        .setAlpha(0.01)
        .setInteractive();

        this.lightup(quit)

        let continues = this.add.sprite(
            1520,
            538,
            'continue',
        ).setScale(1)
        .setAlpha(0.01)
        .setInteractive();

        this.lightup(continues)

       let start = this.add.image(
            1480,
            188,
            'start',
        ).setScale(1)
        .setAlpha(0.01)
        .setInteractive();

        this.lightup(start)

        const chain = this.tweens.chain({
            repeat : -1,
            targets: fish,
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
        

        


}
    



const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [Start, intro, Menu],
    title: "Sushi Cinematic"
});