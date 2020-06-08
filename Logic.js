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
        this.radius = 300

        this.update = this.update.bind(this)
        
        document.body.insertBefore(this.canvas, document.body.childNodes[0])
        
        this.makeGraph()
        this.rAF = requestAnimationFrame(this.update);
    }

    makeGraph() {
        let x = this.canvas.width/2
        let y = this.canvas.height/2
        let angle = 360/8
        for(let i = 1; i <= 8; i++) {
            let nX = x + this.radius * Math.cos((angle*i)*Math.PI/180)
            let nY = y + this.radius * Math.sin((angle*i)*Math.PI/180)
            this.nodes.push(new Node(this.ctx, nX, nY))
            console.log(`x: ${Math.floor(nX)} y: ${Math.floor(nY)} angle: ${angle*i}`)
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