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
        .setScale(1)
        this.fishBack = this.add.image(630, 350, 'fishBack')
        .setScale(1)
        this.unlitFish = this.add.image(630, 350, 'unlitFish')
        .setScale(1)
        this.unlitMenu = this.add.image(980, 550, 'unlitMenu')
        .setScale(1)

        let fish = this.imageObject = this.add.sprite(
            630,
            350,
            'fish',
        )
        this.imageObject.setScale(1);
        this.imageObject.alpha = 0

        let setting = this.imageObject = this.add.sprite(
            400,
            880,
            'setting',
        )
        this.imageObject.setScale(1);
        this.imageObject.alpha = 0
        setting.setInteractive()

        let credits = this.imageObject = this.add.sprite(
            900,
            876,
            'credits',
        )
        this.imageObject.setScale(1);
        this.imageObject.alpha = 0
        credits.setInteractive()

        let quit = this.imageObject = this.add.sprite(
            1474,
            876,
            'quit',
        )
        this.imageObject.setScale(1);
        this.imageObject.alpha = 0
        quit.setInteractive()

        let continues = this.imageObject = this.add.sprite(
            1520,
            538,
            'credits',
        )
        this.imageObject.setScale(1);
        this.imageObject.alpha = 0
        continues.setInteractive()


        let start = this.imageObject = this.add.sprite(
            1520,
            538,
            'start',
        )
        this.imageObject.setScale(1);
        this.imageObject.alpha = 0
        start.setInteractive()

        start.on('pointerdown', ()=> {
            console.log('working')
            this.add.tween({
                alpha: {from:0, to: 1},
                duration: 1,})
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
    scene: [Menu],
    title: "Sushi Cinematic"
});