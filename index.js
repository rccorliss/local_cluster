//import all from lcSite.js
import * as lcSite from './lcSite.js';


(async () =>
    {
        // Create a PixiJS application.
        const app = new PIXI.Application();
    
        // Intialize the application.
        await app.init({ background: '#1099bb', resizeTo: window });
    
        // Then adding the application's canvas to the DOM body.
        document.body.appendChild(app.canvas);
        // Enable interactivity!
        app.stage.eventMode = 'static';
    
        // Make sure the whole canvas area is interactive, not just the elements.
        app.stage.hitArea = app.screen;

        //create 100 sites with random x y locations inside the viewable area, making sure they do not overlap the edge of the screen (given their radius)
        let sites=lcSite.createSites(100, lcSite.radius, app.screen.width-lcSite.radius, lcSite.radius, app.screen.height-lcSite.radius);


        //add all the sites to the stage
        sites.forEach(site=>app.stage.addChild(site.drawable));
        
        // Load the bunny texture.
        const texture = await PIXI.Assets.load('https://pixijs.com/assets/bunny.png');
        //texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
    
        // Create a new Sprite from an image path
        const bunny = new PIXI.Sprite(texture);
    
    
        // Center the sprite's anchor point
        bunny.anchor.set(0.5);
        bunny.cursor = 'pointer';
    
    
        // Move the sprite to the center of the screen
        bunny.x = app.screen.width / 2;
        bunny.y = app.screen.height / 2;
    
        // Opt-in to interactivity
        bunny.eventMode = 'static';
        bunny.velocity=2;
        bunny.on('pointerdown', bunnyClick);
        app.stage.on('pointerdown', stageClick);
    
        // Add to stage
        app.stage.addChild(bunny);    
    
        app.ticker.add((time) => {
            if (!bunny.clicked){
            bunny.rotation += 0.01 * time.deltaTime;
            }
            if (bunny.destination){
            let dx=bunny.destination.x-bunny.x;
            let dy=bunny.destination.y-bunny.y;
            let angle=Math.atan2(dy,dx);
            let distance=Math.sqrt(dx*dx+dy*dy);
            if (distance>bunny.velocity){
                bunny.x+=bunny.velocity*Math.cos(angle);
                bunny.y+=bunny.velocity*Math.sin(angle);
            }
            if (distance<bunny.velocity){
                bunny.x=bunny.destination.x;
                bunny.y=bunny.destination.y;
                bunny.destination=null;
                bunny.clicked=false;
            }
            }
        });
    
        app.stage.addEventListener('pointermove', (e) =>
        {
            if (bunny.clicked){
            bunny.rotation=Math.atan2(e.global.y-bunny.y,e.global.x-bunny.x)+Math.PI/2;
            }
        });
    
    
        function bunnyClick(e)
        {
            e.currentTarget.parent.removeChild(e.currentTarget);
        if (!bunny.clicked){//if the bunny wasn't clicked before, this consumes the event
                    e.stopPropagation();
}
            bunny.clicked=!bunny.clicked;
        }
        function stageClick(e)
        {
            if (bunny.clicked){
            bunny.destination=e.data.getLocalPosition(app.stage);
            //e.global;
            }
        }
    
    })();