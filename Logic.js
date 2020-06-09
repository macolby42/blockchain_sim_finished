import { Node } from './Node.js'

export class Logic {
    constructor() {
        this.lastUpdate = performance.now()

        this.updateRate = 32

        this.update = this.update.bind(this)
        this.handleClick = this.handleClick.bind(this)
        
        this.canvas = document.createElement('canvas')
        this.canvas.addEventListener('contextmenu', this.handleClick)
        this.ctx = this.canvas.getContext('2d')
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        
        this.nodes = []
        this.radius = 300

        
        document.body.insertBefore(this.canvas, document.body.childNodes[0])
        
        window.addEventListener('click', this.handleClick)

        this.makeGraph()
        this.rAF = requestAnimationFrame(this.update);
    }

    handleClick(e) {
        e.preventDefault()

        let x = e.clientX
        let y = e.clientY

        if (e.button === 0) {
            this.nodes.forEach(node => {
                if (node.wasClicked(x, y)) {
                    let selected = this.nodes.filter(n => n.isSelected)
                    let toDeselect = selected[0] ? selected[0] : null
                    if (toDeselect) toDeselect.deselect()
                    node.select()
                }
            })
        }
        else if (e.button === 2) {
            this.nodes.forEach(node => {
                if (node.wasClicked(x, y)) {
                    console.log('r click!')
                    node.incrementValue()
                }
            })
        }
    }

    makeGraph() {
        let x = this.canvas.width/2
        let y = this.canvas.height/2
        let angle = 360/8
        for(let i = 1; i <= 8; i++) {
            let nX = x + this.radius * Math.cos((angle*i)*Math.PI/180)
            let nY = y + this.radius * Math.sin((angle*i)*Math.PI/180)
            this.nodes.push(new Node(this.ctx, nX, nY, 2))
        }
        for(let i = 0; i < 8; i++) {
            this.nodes[i].addConnection(this.nodes[1])
            this.nodes[i].addConnection(this.nodes[2])
        }
        this.nodes[0].setValue(16)
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