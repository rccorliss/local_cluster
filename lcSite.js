//definition of a 'site' to be displayed in the game, which has a location, a status (claimed or unclaimed), a reference to the claimer, and a reference to the colony at that site, if claimed.

//a function that creates an array of sites with random x y locations and marks them all as unclaimed.

//define a constant radius for the sites
export const radius=10;

export function createSites(numSites, xmin, xmax, ymin, ymax) {
    let sites = [];
    for (let i = 0; i < numSites; i++) {
        let x = Math.floor(Math.random() * (xmax - xmin)) + xmin;
        let y = Math.floor(Math.random() * (ymax - ymin)) + ymin;
        //if this overlaps with another site, try again
        while (sites.some(site => Math.sqrt((site.x - x) ** 2 + (site.y - y) ** 2) < 2 * radius)) {
            x = Math.floor(Math.random() * (xmax - xmin)) + xmin;
            y = Math.floor(Math.random() * (ymax - ymin)) + ymin;
        }
        sites.push(new Site(x,y, false, null, null));
    }
    return sites;
}

export class Site {
    constructor(x, y, claimed, claimer, colony) {
        this.x = x;
        this.y = y;
        this.claimed = claimed;
        this.claimer = claimer;
        this.colony = colony;
        this.drawable=new PIXI.Container();
        let circle=new PIXI.Graphics();
        circle.drawCircle(this.x,this.y,10);
        circle.fill(0xffffff);
        //add a black outline for the circle
        circle.lineStyle(1,0x000000);
        //circle.endFill();
        this.drawable.addChild(circle);
    }


}