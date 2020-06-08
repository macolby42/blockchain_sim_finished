export class Node {
    constructor(ctx, x, y) {
        this.ctx = ctx
        this.x = x
        this.y = y
        this.fill = 'red'
        this.size = 50
    }

    draw() {
        this.ctx.fillStyle = this.fill
        this.ctx.beginPath()
        this.ctx.rect(this.x, this.y, this.size, this.size)
        this.ctx.fill()
    }
}