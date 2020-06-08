export class Node {
    constructor(ctx, x, y, ideal) {
        this.ctx = ctx
        this.x = x
        this.y = y
        this.size = 50
        this.connections = []
        this.value = 0
        this.idealValue = ideal
        this.isSelected = false
    }

    draw() {
        this.connections.forEach(connection => {
            this.drawConnection(connection)
        })
        this.drawNode()
    }

    
    getX() {
        return this.x
    }
    
    getY() {
        return this.y
    }

    setFill() {
        if(this.value/this.idealValue < 0.33) {
            this.ctx.fillStyle = 'red'
        }
        else if(this.value/this.idealValue > 0.33 && this.value/this.idealValue < 0.66) {
            this.ctx.fillStyle = 'orange'
        }
        else if(this.value/this.idealValue > 0.66 && this.value/this.idealValue < 1) {
            this.ctx.fillStyle = 'yellow'
        }
        else if(this.value/this.idealValue === 1) {
            this.ctx.fillStyle = 'green'
        }
        else if(this.value/this.idealValue > 1) {
            this.ctx.fillStyle = 'purple'
        }
    }
    
    addConnection(connection) {
        this.connections.push({
            x: connection.getX(),
            y: connection.getY(),
        })
    }
    
    drawNode() {
        this.setFill()
        this.ctx.beginPath()
        this.ctx.rect(this.x, this.y, this.size, this.size)
        this.ctx.fill()
        if (this.isSelected) {
            this.ctx.stroke()
        }
    }

    drawConnection(connection) {
        this.ctx.beginPath()
        this.ctx.moveTo(this.x+(this.size/2), this.y+(this.size/2))
        this.ctx.lineTo(connection.x+(this.size/2), connection.y+(this.size/2))
        this.ctx.stroke()
    }

    setValue(val) {
        this.value = val
    }

    deselect() {
        this.isSelected = false
    }

    select() {
        this.isSelected = true
    }

    wasClicked(x, y) {
        if(x-this.x < this.size && x-this.x > 0) {
            if(y-this.y < this.size && y-this.y > 0) {
                return true
            }
        }
        return false
    }
}