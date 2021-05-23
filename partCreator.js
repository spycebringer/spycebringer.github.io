
class PartCreator {
    createPart = function(sprite, position, direction){
        //temporary part object
        const part = {};
        // object properties and functions
        part.sprite = sprite;
        part.position = position;
        part.direction = direction;
        //move speed
        part.moveSpeed = 1;
        //render function
        part.render = function(ctx){
            ctx.drawImage(this.sprite, 0, 0, 32, 32, this.position.x*32, this.position.y*32, 32, 32);
        }
        //moves the snake
        part.move = function(){
            switch(this.direction){
                case 'left':
                    this.position.x-=this.moveSpeed;
                    break;
                case 'right':
                    this.position.x+=this.moveSpeed;
                    break;
                case 'up':
                    this.position.y-=this.moveSpeed;
                    break;
                case 'down':
                    this.position.y+=this.moveSpeed;
                    break;
            }
        }
        return part;
    }
}

export default PartCreator;