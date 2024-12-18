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
        this.drawable.rname='site';

        let circle=new PIXI.Graphics()
            .circle(this.x,this.y,radius)
            .stroke({color: 0x000000,width: 2})
            .fill(0xffffff);
        this.drawable.addChild(circle);
        this.drawable.interactive=true;
        this.drawable.on('pointerdown', this.click.bind(this));
    }
    click(){
        if (this.drawable.children.some(child=>child.rname=='info')){
            //remove the info panel if one is already there
            this.drawable.removeChild(this.drawable.children.find(child=>child.rname=='info'));
            return;
        }
        //create a small gray square near, but not covering, the site.  The square should have two lines of text, one with the x and y coordinates of the site, and the other with the status of the site.
        let x=this.x;
        let y=this.y;
        let status=this.claimed?'Claimed':'Unclaimed';
        let text = new PIXI.Text(`(${x},${y})`, { fill: 0x000000, fontSize: 10 });
        if (text.width>40){
            text.scale.x=40/text.width;
            }        text.x = x + radius + 5;
        text.y = y + radius + 5;
        let text2 = new PIXI.Text(status, { fill: 0x000000, fontSize: 10 });
        text2.x = x + radius + 5;
        text2.y = y + radius + 25;
        if (text2.width>40){
        text2.scale.x=40/text2.width;
        }
        let info=new PIXI.Container();
        info.rname='info';
        let box=new PIXI.Graphics()
            .rect(x+radius,y+radius,50,50)
            .fill(0xaaaaaa);

        info.interactive=true;
        info.zIndex=100;
        info.addChild(box);
        info.addChild(text);
        info.addChild(text2);
        this.drawable.addChild(info);
        console.log('adding panel with rname='+info.rname+', parent rname='+info.parent.rname);
        info.on('pointerdown', dismissObject);
    //    this.drawable.on('pointerdown', this.click.bind(this));
    }



}

function dismissObject(e)
{
    //console.log('destroying object with rname='+e.currentTarget.rname+', parent rname='+e.currentTarget.parent.rname);
    e.currentTarget.parent.removeChild(e.currentTarget);
    e.currentTarget.destroy();
    //e.currentTarget.visible=false;
    e.stopPropagation();
    //log to the console that we tried to destroy the object
}