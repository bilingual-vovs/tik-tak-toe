const COLOR1 = 'rgb(10,10,10)'
const COLOR2 = 'rgb(200,200,256)'

const TAK = './tak.png'
const TIK = './tik.png'
let count = 0 
let TURN = false

const canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d");

class Field{
    constructor(size, posX, posY, sizePX){
        this.field = []
        for(let i = 0; i<size; i++){
            this.field.push([])
            for(let j = 0; j<size; j++){
                this.field[i].push(0)
            }
        }

        canvas.onclick = this.onclick

        this.size = size
        this.posX = posX
        this.posY = posY
        this.sizePX = sizePX
        
    }

    draw = () =>{
        for(let i = 0; i<this.size; i++){
            for(let j = 0; j<this.size; j++){
                ctx.fillStyle = j%2 == i%2 ? COLOR1: COLOR2
                ctx.fillRect(this.posX+i*(this.sizePX/this.size), this.posX+j*(this.sizePX/this.size), (this.sizePX/this.size), (this.sizePX/this.size))
            }
        }
    }

    onclick = (evt)=>{
        if (!this.isGameOver()){
            TURN = !TURN
            count++
            let y = Math.floor(evt.offsetX/(this.sizePX/this.size))
            let x = Math.floor(evt.offsetY/(this.sizePX/this.size))
            this.field[x][y] = TURN ? 1 : 2
    
           
    
            document.getElementById('in').innerHTML += `<img id='${x + '-' + y}' src='${TURN? TAK : TIK}' style='position: absolute; width:${(this.sizePX/this.size)}px;height:${(this.sizePX/this.size)}px; top:${this.posX+7+x*(this.sizePX/this.size) + "px"};left:${this.posY+7+y*(this.sizePX/this.size) + "px"};'/>`
            if (this.isGameOver()) document.getElementById('hd').style.display = "block"
            if (count > 8 ){document.getElementById('hd').innerHTML = 'TIE'; document.getElementById('hd').style.display = "block"}
        } else {
            alert('gameOver')
        }
        
        

    }

    isGameOver = ()=>{
        for (let i = 0; i< this.size; i++){
            console.log(this.field)
            if ((this.field[i][0] === this.field[i][1] && this.field[i][1] === this.field[i][2]) && this.field[i][2] !== 0) 
            {return true}
        }
        for (let i = 0; i< this.size; i++){
            if ((this.field[0][i] === this.field[1][i] && this.field[1][i] === this.field[2][i]) && this.field[0][i] !== 0) 
            {
                return true}
        }
        if (this.field[0][0] === this.field[1][1] && this.field[2][2] === this.field[1][1] && this.field[0][0] !== 0) return true
        if (this.field[0][2] === this.field[1][1] && this.field[2][0] === this.field[1][1] && this.field[1][1] !== 0) return true
        return false
    }

}


let field = new Field(3, 0, 0, 800)
field.draw()