//lcUI.js

//this doesn't work right now...

// define an info panel class, which has a position and size, and has a function to have lines of text added to it.  It should be a pixi.js container, so it can easily be drawn.  It should also have a proper destructor, so that it can be removed from the stage and garbage collected.
class InfoPanel {
    constructor(x, y, width, height, style) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.style = style;
        this.container = new PIXI.Container();
        this.container.x = x;
        this.container.y = y;
        this.lines = [];
    }
    addLine(line) {
        this.lines.push(line);
        this.redraw();
    }
    redraw() {
        this.container.removeChildren();
        this.container.rect(0, 0, this.width, this.height);
        for (var i = 0; i < this.lines.length; i++) {
            var text = new PIXI.Text(this.lines[i], this.style);
            text.y = i * 20;
            this.container.addChild(text);
        }
    }
    destroy() {
        this.container.destroy();
    }
}
    