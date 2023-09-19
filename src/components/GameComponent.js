// components/GameComponent.js

import React, { useEffect, useState  } from 'react';


export default function GameComponent() {
    
  useEffect(() => {
    
    const canvas = document.querySelector('canvas');
    const c = canvas.getContext('2d');
    canvas.width = 1535
    canvas.height = 660
    const gravity = 1.5
    
    class Player {
        constructor(){
            this.speed = 10
            this.position ={
                x:100,
                y:100
            }
            this.velocity={
                x:0,
                y:1
            }
          
            this.width= 66
            this.height= 150
            this.image = createImage('spriteStandRight.png')
            this.frames = 0
            this.sprites = {
                stand : {
                    right : createImage('spriteStandRight.png'),
                    left : createImage('spriteStandleft.png'),
                    cropWidth : 177,
                    width : 66 
                },
                run:{
                    right : createImage('spriteRunRight.png'),
                    left : createImage('spriteRunleft.png'),
                    cropWidth : 341,
                    width : 127.875
                }
            }
            this.currentSprite = this.sprites.stand.right
            this.currentCropWidth = 177
        }
    
        draw(){
            c.drawImage(
                this.currentSprite,
                this.currentCropWidth * this.frames,0,
                this.currentCropWidth,
                400,
                this.position.x,
                this.position.y,
                this.width,
                this.height)
        }
        update(){
            this.frames ++
            if(this. frames > 59 && (this.currentSprite === this.sprites.stand.right || this.currentSprite === this.sprites.stand.left ) ) this.frames = 0
            else if (this. frames > 29 && (this.currentSprite === this.sprites.run.right ||this.currentSprite === this.sprites.run.left) )this.frames = 0
            this.draw()
            this.position.x += this.velocity.x 
            this.position.y += this.velocity.y
            if(this.position.y + this.height + this.velocity.y <= canvas.height) this.velocity.y += gravity
            if(player.position.y > canvas.height) this.velocity.y -= gravity
        }
    
    } 
     class Platform {
        constructor({x,y,image}){
            this.position ={
                x,
                y,
                
            }
            this.image = image
            
            this.width = image.width
            this.height= image.height
        }
    draw(){
        c.drawImage(this.image,this.position.x,this.position.y)
    }
     }
    class GenericObject {
        constructor({x,y,image}){
            this.position ={
                x,
                y,
                
            }
            this.image = image
            
            this.width = image.width
            this.height= image.height
        }
    draw(){
        c.drawImage(this.image,this.position.x,this.position.y)
    }
    
     }
     function createImage(imageSrc) {
        const image = new Image();
        image.src = imageSrc; 
        return image;
      }
      
      let platformImage = createImage('platform.png');
      let platformSmallTall = createImage('platformSmallTall.png')
      

    let player = new Player()
    let platforms = [] 

let genericObjects = []




    const keys ={
        right:{
            pressed : false
        },
        left:{
            pressed:false
        }
    }
    let scrollOffset = 0
    
    function init(){
         platformImage = createImage('platform.png');
          

         player = new Player()
        platforms = [
            new Platform({ 
                x: platformImage.width * 4 + 400 -2 + platformImage.width - platformSmallTall.width,
                y:335,
                 image: createImage('platformSmallTall.png')
                }),
            new Platform({
            x:-1,
            y:535,
            image : platformImage
        }),new Platform({ 
            x: platformImage.width - 3,
            y:535,
             image: platformImage}),
             new Platform({ 
                x: platformImage.width * 2 + 150,
                y:535,
                 image: platformImage}),
                     new Platform({ 
                        x: platformImage.width * 3 + 400,
                        y:535,
                         image: platformImage}),
                         new Platform({ 
                            x: platformImage.width * 4 + 400 -2,
                            y:535,
                             image: platformImage}),new Platform({ 
                                x: platformImage.width * 5.2 + 700 -2,
                                y:535,
                                 image: platformImage}),
                                 new Platform({ 
                                    x: platformImage.width * 6 + 1150 -4 ,
                                    y:435,
                                     image: platformImage,
                                    width : 90,
                                height : 10}),
                                new Platform({ 
                                    x: platformImage.width * 7.3 + 1400 - 3,
                                    y:535,
                                     image: platformImage}),
                                     new Platform({ 
                                        x: platformImage.width * 8  + 1550 -2 + platformImage.width - platformSmallTall.width,
                                        y:335,
                                         image: createImage('platformSmallTall.png')
                                     }),
                                         new Platform({ 
                                            x: platformImage.width * 8  + 2000 -2 + platformImage.width - platformSmallTall.width,
                                            y:335,
                                             image: createImage('platformSmallTall.png')}),
                                             new Platform({ 
                                                x: platformImage.width * 8  + 2600 -3 + platformImage.width - platformSmallTall.width,
                                                y:335,
                                                 image: createImage('platformSmallTall.png'),
                                         
                                        }),new Platform({ 
                                            x: platformImage.width * 9 + 2800 -2,
                                            y:535,
                                             image: platformImage})

                                 
            ]
    
     genericObjects = [
        new  GenericObject({
            x:0,
            y:0,
            image : createImage('background.png')
        }),
        new  GenericObject({
            x: -2,
            y: 75,
            image : createImage('hills.png')
        }),
    ]
         scrollOffset = 0
        

    }
    function animate(){
        requestAnimationFrame(animate)
        c.fillStyle = 'black'
        c.fillRect(0,0,canvas.width,canvas.height)
         genericObjects.forEach((genericObject) => {
            genericObject.draw( )
         })
       
        platforms.forEach((platform)=>{
            platform.draw()
        })
        player.update()
         if(keys.right.pressed && player.position.x < 400){
            player.velocity.x = player.speed
         } else if((keys.left.pressed && player.position.x > 100) || keys.left.pressed && scrollOffset === 0 && player.position.x > 0 ){
            player.velocity.x= -player.speed
         } else player.velocity.x = 0
    
    
    if(keys.right.pressed){
        scrollOffset += 5
        platforms.forEach((platform)=>{
            platform.position.x -= player.speed
        })
        genericObjects.forEach((genericObject)=>{
            genericObject.position.x -= player.speed * .66
        })
    }else if (keys.left.pressed && scrollOffset > 0){
        scrollOffset-=5
        platforms.forEach((platform)=>{
            platform.position.x += player.speed
        })
        genericObjects.forEach((genericObject)=>{
            genericObject.position.x += player.speed * .66      })
    }
    console.log(scrollOffset)
    platforms.forEach((platform)=>{
        
        if(player.position.y +player.height <= platform.position.y && player.position.y +player.height + player.velocity.y >= platform.position.y && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x +platform.width ){
            player.velocity.y =0
         }
    })
    if (scrollOffset > platformImage.width * 8  + 2800 -3 + platformImage.width - platformSmallTall.width){
        console.log('You Win!');
    }
    if (player.position.y >canvas.height){
        init()
    }
    }
    init()
    animate()
    addEventListener('keydown', ({keyCode}) => {
        console.log(keyCode)
        switch(keyCode){
            case 65 :
                console.log('left')
                keys.left.pressed = true
                player.currentSprite = player.sprites.run.left
                player.currentCropWidth = player.sprites.run.cropWidth
                player.width = player.sprites.run.width
                break
                case 83:
                    console.log("down")
                    
                    break
                case 68:
                    console.log('right')
                    keys.right.pressed = true
                    player.currentSprite = player.sprites.run.right
                    player.currentCropWidth = player.sprites.run.cropWidth
                    player.width = player.sprites.run.width
                    break
                 case 87 :
                    console.log('up') 
                    player.velocity.y -= 25
                    break      
        }
    })
    
    addEventListener('keyup', ({keyCode}) => {
        console.log(keyCode)
        switch(keyCode){
            case 65 :
                console.log('left')
                keys.left.pressed = false
                player.currentSprite = player.sprites.stand.left
                    player.currentCropWidth = player.sprites.stand.cropWidth
                    player.width = player.sprites.stand.width
                break
                case 83:
                    console.log("down")
                   
                    break
                case 68:
                    console.log('right')
                    keys.right.pressed = false
                    player.currentSprite = player.sprites.stand.right
                    player.currentCropWidth = player.sprites.stand.cropWidth
                    player.width = player.sprites.stand.width
                    break
                 case 87 :
                    console.log('up') 
                   
                    break      
        }
    })

    
  


}, []);

  return (
    <div>
      <canvas></canvas>
      
    </div>
  );
}
