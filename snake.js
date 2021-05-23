
import PartCreator from '/partCreator.js';
import { WIDTH, HEIGHT, SPRITE_SIZE } from './gameGlobals.js';

class Snake {
    //head and body references
    head = {};
    body = [];
    //constructor - defines the pieces of the snake and sets some references needed to function
    constructor(headRef, bodyRef, ctx, gameRef){
        //if even one reference is not present, an error is thrown
        if(!headRef || !bodyRef || !ctx || !gameRef) {
            throw new Error("references are missing");
        }
        this.headRef = headRef;
        this.bodyRef = bodyRef;
        this.ctx = ctx;
        this.gameRef = gameRef;
        //initialize the snake once constructed
        this.init();
    }
    init = function() {
        //PartCreator for making new pieces as we go
        this.partCreator = new PartCreator();
        //create the head and set the reference
        this.head = this.partCreator.createPart(this.headRef, { x: WIDTH/32/2, y: HEIGHT/32/2 }, '');
    }
    setDirection = function(direction){
        //when a movement key is pressed it calls this function to change the head direction
        this.head.direction = direction;
    }
    addNewPart = function(){
        /**
         * helper function to create new body parts
         * first we determine if there are any parts
         * then create a new one and push it onto the body
         */
        if(this.body.length === 0){
            //if this is the first body piece to add
            // position it according to the head
            let pos, dir;
            switch(this.head.direction){
                case 'up':
                    pos = { x: this.head.position.x, y: this.head.position.y+2 };
                    dir = 'up';
                    break;
                case 'left':
                    pos = { x: this.head.position.x+2, y: this.head.position.y };
                    dir = 'left';
                    break;
                case 'down':
                    pos = { x: this.head.position.x, y: this.head.position.y-2 };
                    dir = 'down';
                    break;
                case 'right':
                    pos = { x: this.head.position.x-2, y: this.head.position.y };
                    dir = 'right';
                    break;
            }
            const part = this.partCreator.createPart(this.bodyRef, pos, dir);
            this.body.push(part);
        } else {
            //make a reference to the last part on the body
            //position the new piece at the back
            let tail = this.body[this.body.length-1];
            let pos, dir;
            switch(tail.direction){
                case 'up':
                    pos = { x: tail.position.x , y: tail.position.y+1 };
                    dir = 'up';
                    break;
                case 'left':
                    pos = { x: tail.position.x+1, y: tail.position.y };
                    dir = 'left';
                    break;
                case 'down':
                    pos = { x: tail.position.x , y: tail.position.y-1 };
                    dir = 'down';
                    break;
                case 'right':
                    pos = { x: tail.position.x-1 , y: tail.position.y };
                    dir = 'right';
                    break;
            }
            const part = this.partCreator.createPart(this.bodyRef, pos, dir);
            this.body.push(part);
        }
    }
    willCollide = function(){
        //helper function
        //determines if the next position is colision or not
        let nextPos;
        switch(this.head.direction){
            case 'up':
                nextPos = { x: this.head.position.x, y: this.head.position.y-1 };
                break;
            case 'left':
                nextPos = { x: this.head.position.x-1, y: this.head.position.y };
                break;
            case 'down':
                nextPos = { x: this.head.position.x, y: this.head.position.y+1 };
                break;
            case 'right':
                nextPos = { x: this.head.position.x+1, y: this.head.position.y };
                break;
        }
        //will collide with wall this frame
        if(nextPos.x < 0 || nextPos.x >= (WIDTH/SPRITE_SIZE) || nextPos.y < 0 || nextPos.y >= (HEIGHT/SPRITE_SIZE)) return true;
        //will collide with body this frame
        let collided = false;
        this.body.forEach(part => {
            if(part.position.x === nextPos.x && part.position.y === nextPos.y) {
                collided = true;
                return;
            }
        })
        return collided;
    }
    move = function(){
        //check for collisions
        if(this.willCollide()){
            //end the game
            this.gameRef.endGame();
            return;
        }
        // move the head
        this.head.move();
        this.gameRef.isPortal(this.head);
        //move the body
        let prevDirection = this.head.direction;
        this.body.forEach(part => {
            part.move();
            [part.direction, prevDirection] = [prevDirection, part.direction];
        })
    }
    render = function(){
        //render the head
        this.head.render(this.ctx);
        //render the body
        this.body.forEach(part => part.render(this.ctx));
    }
}

export default Snake;