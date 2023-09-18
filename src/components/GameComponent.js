// components/GameComponent.js

import React, { useEffect } from 'react';


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
          
            this.width= 30
            this.height= 30
        }
    
        draw(){
            c.fillStyle = 'red'
            c.fillRect(this.position.x,this.position.y,this.width,this.height)
        }
        update(){
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
      

    let player = new Player()
    let platforms = [
        new Platform({
        x:-1,
        y:530,
        image : platformImage
    }),new Platform({ 
        x: platformImage.width - 2,
        y:530,
         image: platformImage}),
         new Platform({ 
            x: platformImage.width * 2+100,
            y:530,
             image: platformImage})
        ]

let genericObjects = [
   
]




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
            x:-1,
            y:530,
            image : platformImage
        }),new Platform({ 
            x: platformImage.width - 3,
            y:530,
             image: platformImage}),
             new Platform({ 
                x: platformImage.width * 2 + 150,
                y:530,
                 image: platformImage}),
                     new Platform({ 
                        x: platformImage.width * 3 + 400,
                        y:530,
                         image: platformImage}),
                         new Platform({ 
                            x: platformImage.width * 4 + 400 -2,
                            y:530,
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
         } else if(keys.left.pressed && player.position.x > 100){
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
    }else if (keys.left.pressed){
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
    if (scrollOffset > 2000){
        console.log('you win')
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
                break
                case 83:
                    console.log("down")
                    
                    break
                case 68:
                    console.log('right')
                    keys.right.pressed = true
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
                break
                case 83:
                    console.log("down")
                    
                    break
                case 68:
                    console.log('right')
                    keys.right.pressed = false
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
