class Menu extends Phaser.Scene {
    constructor() {
        super("Menu")
    }

    preload() {
        this.load.image('menuBack', "../assets/backdropMenu.PNG")
        this.load.image('fishBack', "../assets/backdropFish.PNG")
        this.load.image('continue', "../assets/continue.PNG")
        this.load.image('unlitFish', "../assets/fishUnlit.PNG")
        this.load.image('unlitMenu', "../assets/MenuUnlit.PNG")
        this.load.image('quit', "../assets/Quit.PNG")
        this.load.image('start', "../assets/Start.PNG")
        this.load.image('credits', "../assets/credits.png")
        this.load.image('setting', "../assets/setting.png")
        this.load.image('fish', "../assets/neonFish.png")
    }
    create(){
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

        let credits = this.add.sprite(
            900,
            876,
            'credits',
        ).setScale(1)
        .setAlpha(0.01)
        .setInteractive();

        let quit = this.add.sprite(
            1474,
            876,
            'quit',
        ).setScale(1)
        .setAlpha(0.01)
        .setInteractive();

        let continues = this.add.sprite(
            1520,
            538,
            'credits',
        ).setScale(1)
        .setAlpha(0.01)
        .setInteractive();


       let start = this.add.image(
            1480,
            190,
            'start',
        ).setScale(1)
        .setAlpha(0.01)
        .setInteractive();

        start.on('pointerdown', ()=> {

            console.log('working');

            this.tweens.add({
                targets: start,
                alpha: 1,
                duration: 1,
            });

            
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
    scene: [Menu],
    title: "Sushi Cinematic"
});