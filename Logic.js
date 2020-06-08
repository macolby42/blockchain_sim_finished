import { Node } from './Node.js'

export class Logic {
    constructor() {
        this.lastUpdate = performance.now()

        this.updateRate = 32
        
        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d')
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        
        this.nodes = []

        this.update = this.update.bind(this)
        
        document.body.insertBefore(this.canvas, document.body.childNodes[0])
        
        this.makeGraph()
        this.rAF = requestAnimationFrame(this.update);
    }

    makeGraph() {
        for(let x = 0; x < 8; x++) {
            this.nodes.push(new Node(this.ctx, 100*x, 100))
        }
    }

    update() {
        if (this.lastUpdate < performance.now() - this.updateRate) {
            this.lastUpdate = performance.now()

            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            
            this.nodes.forEach(node => {
                node.draw()
                return
            })
        }
        this.rAF = requestAnimationFrame(this.update);
    }
}