import { Application, Assets, Sprite } from 'https://cdnjs.cloudflare.com/ajax/libs/pixi.js/6.5.8/pixi.min.js';

//Async IIFE:

(async () => 
{
    // Create the application
    const app = new PIXI.Application();
    await app.init({ background: '#1099bb', resizeTo: window });
    document.body.appendChild(app.canvas);


    // Load the bunny texture.
    const texture = await Assets.load('https://pixijs.com/assets/bunny.png');

    // Create a new Sprite from an image path
    const bunny = new Sprite(texture);

    // Add to stage
    app.stage.addChild(bunny);

    // Center the sprite's anchor point
    bunny.anchor.set(0.5);

    // Move the sprite to the center of the screen
    bunny.x = app.screen.width / 2;
    bunny.y = app.screen.height / 2;

})();