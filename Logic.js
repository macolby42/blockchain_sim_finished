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

        this.selectedNode = null
        
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
                    this.selectedNode = node
                }
            })
        }
        else if (e.button === 2) {
            this.nodes.forEach(node => {
                if (node.wasClicked(x, y)) {
                    if (this.selectedNode.getValue() > 0 && this.selectedNode.isConnection(node)) {
                        node.incrementValue()
                        this.selectedNode.decrementValue()
                    }
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
            this.nodes.push(new Node(i, this.ctx, nX, nY, 2))
        }

        this.nodes[0].addConnection(this.nodes[1])
        this.nodes[1].addConnection(this.nodes[0])
        this.nodes[0].addConnection(this.nodes[4])
        this.nodes[4].addConnection(this.nodes[0])
        this.nodes[0].addConnection(this.nodes[5])
        this.nodes[5].addConnection(this.nodes[0])
        
        this.nodes[1].addConnection(this.nodes[5])
        this.nodes[5].addConnection(this.nodes[1])
        
        this.nodes[2].addConnection(this.nodes[6])
        this.nodes[6].addConnection(this.nodes[2])
        
        this.nodes[3].addConnection(this.nodes[4])
        this.nodes[4].addConnection(this.nodes[3])
        this.nodes[3].addConnection(this.nodes[6])
        this.nodes[6].addConnection(this.nodes[3])
        this.nodes[3].addConnection(this.nodes[7])
        this.nodes[7].addConnection(this.nodes[4])
        
        this.nodes[0].setValue(16)
    }

    update() {
        let playerWon = true
        if (this.lastUpdate < performance.now() - this.updateRate) {
            this.lastUpdate = performance.now()

            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            
            this.nodes.forEach(node => {
                if (playerWon) {
                    playerWon = node.isSatisfied()
                }
                node.draw()

            })
            if (playerWon) {
                this.ctx.fillStyle = 'black'
                this.ctx.font = "90px Arial"
                this.ctx.fillText("You Won!", this.canvas.width*.41, this.canvas.height*.1)
            }
            this.ctx.fillStyle = 'black'
            this.ctx.font = "30px Arial"
            this.ctx.fillText("Left Click to select a node. Right Click on a node to transfer value from the selected node. Try to turn all of the nodes green.", this.canvas.width*.01, this.canvas.height*.95)
        }
        this.rAF = requestAnimationFrame(this.update);
    }
}