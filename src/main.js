///mon code 

//Game constants 
const GRAVITY = 0.5;
const JUMP_FORCE = -12;
const MOVE_SPEED=2.5;
const ENEMY_SPEED=1;

const gameState = {
    score:0,
    level:1,
    lives:3,
    gameRunning:true,
    keys:{

    }
}

const player = {
    element:document.getElementById("mario"),
    x:50,
    y:50,
    width:20,
    height:20,
    velocityX:0,
    velocityY:0,
    grounded:false,
    big:false,
    bigTimer:0
}

    let gameObjects = {
    platforms:[],
    enemies:[],
    coins:[],
    surpriseBlocks:[],
    pipes:[]
}

const levels = [
    // level 1
    {
        platforms: [
            {x: 0, y: 360, width: 400, height: 40, type: "ground"},
            {x: 500, y: 360, width: 300, height: 40, type: "ground"},
            {x: 200, y: 280, width: 60, height: 20, type: "floating"},
            {x: 300, y: 240, width: 60, height: 20, type: "floating"},
            {x: 600, y: 280, width: 80, height: 20, type: "floating"},
        ],
        enemies: [
            {x: 250, y: 344, type: "brown"},
            {x: 550, y: 344, type: "brown"}
        ],
        coins: [
            {x: 220, y: 260},
            {x: 320, y: 220},
            {x: 620, y: 260},
        ],
        surpriseBlocks: [
            {x: 320, y: 180, type: "mushroom"}
        ],
        pipes: [
            {x: 750, y: 320}
        ]
    },
    // level 2
    {
        platforms: [
            {x: 0, y: 360, width: 200, height: 40, type: "blue"},
            {x: 300, y: 360, width: 200, height: 40, type: "blue"},
            {x: 600, y: 360, width: 200, height: 40, type: "blue"},
            {x: 150, y: 300, width: 40, height: 20, type: "blue"},
            {x: 250, y: 280, width: 40, height: 20, type: "blue"},
            {x: 350, y: 260, width: 40, height: 20, type: "blue"},
            {x: 450, y: 240, width: 40, height: 20, type: "blue"},
            {x: 550, y: 280, width: 60, height: 20, type: "blue"}
        ],
        enemies: [
            {x: 350, y: 344, type: "purple"},
            {x: 650, y: 344, type: "purple"},
            {x: 570, y: 264, type: "purple"}
        ],
        coins: [
            {x: 170, y: 280},
            {x: 270, y: 260},
            {x: 370, y: 240},
            {x: 470, y: 220},
            {x: 570, y: 260}
        ],
        surpriseBlocks: [
            {x: 200, y: 260, type: "coin"},
            {x: 400, y: 220, type: "mushroom"}
        ],
        pipes: [
            {x: 750, y: 320}
        ]
    }
]
/**
 * 
 * @param {true} won 
 */
function showGameOver(won){
    gameState.gameRunning = false;
    document.getElementById("game_over_title").textContent = won?'COngratulations!you Won':"Game Over!";
    document.getElementById('final_score').textContent=gameState.score;
    document.getElementById('game_over').style.display='block'
}

function initGame (){
    loadLevel((gameState.level-1 ))
    gameLoop()
}
/**
 * 
 * @param {number} levelIndex 
 */
function loadLevel(levelIndex){
    if(levelIndex >= levels.length){
        showGameOver(true)
        return
    }
    clearLevel()

    const level =levels[levelIndex]
    const gameArea = document.getElementById("game_area")

    //reste player
    player.x=50;
    player.y=300;
    player.velocityX =0;
    player.velocityY=0;
    player.big=false;
    player.bigTimer=0;
    player.element.className="";
    updateElementPosition(player.element,player.x,player.y);

    
    //create platform 
    level.platforms.forEach((plateFormData,index)=>{
       
        const platform = createElement('div',`platform ${plateFormData.type}`,{
            left:plateFormData.x+'px',
            top: plateFormData.y+'px',
            width:plateFormData.width+'px',
            height:plateFormData.height+'px',
        })
        gameArea.appendChild(platform)
        gameObjects.platforms.push({
            element:platform,
            ...plateFormData,
            id:'platform_'+index
        })
    })

    //create enemies

    level.enemies.forEach(
        (enemyData,index)=>{
            const enemy =createElement("div",`enemy ${enemyData.type}`,{
                left:enemyData.x+'px',
                top:enemyData.y+'px'
            })
            gameArea.appendChild(enemy)
            gameObjects.enemies.push({
                element:enemy,
                x:enemyData.x,
                y:enemyData.y,
                width:20,
                height:20,
                direction:-1,
                speed:ENEMY_SPEED,
                id:"enemy_"+index,
                alive:true

            })
    })

    //create coins
    level.coins.forEach((coinData,index)=>{
        const coin =createElement('div',`coin`,{
            left:coinData.x +"px",
            top:coinData.y + 'px',
        })
        gameArea.appendChild(coin)
        gameObjects.coins.push({
            element:coin,
            x:coinData.x,
            y:coinData.y,
            width:20,
            height:20,
            collected:false,
            id:"coin_"+index
        })
    })

    //create mysteryBlock
    
    level.surpriseBlocks.forEach((surpriseBLocksData,index)=>{
        const surpriseBlock =createElement('div',`surprise_block`,{
            left:surpriseBLocksData.x +"px",
            top:surpriseBLocksData.y + 'px',
        })
        gameArea.appendChild(surpriseBlock)
        gameObjects.coins.push({
            element:surpriseBlock,
            x:surpriseBLocksData.x,
            y:surpriseBLocksData.y,
            width:20,
            height:20,
            type:surpriseBLocksData.type,
            id:"coin_"+index
        })
    })

     level.pipes.forEach((pipeData,index)=>{
        const pipeBlock =createElement('div',`pipe`,{
            left:pipeData.x +"px",
            top:pipeData.y + 'px',
        })
        const pipeTopLeft = createElement("div","pipe_top");
        const pipeTopRight = createElement("div","pipe_top_right");
        const pipeBottomLeft = createElement("div","pipe_bottom");
        const pipeBottomRight = createElement("div","pipe_bottom_right");

        pipeBlock.append(pipeTopLeft,pipeTopRight,pipeBottomLeft,pipeBottomRight)
        gameArea.appendChild(pipeBlock)
        gameObjects.pipes.push({
            element:pipeBlock,
            x:pipeData.x,
            y:pipeData.y,
            width:40,
            height:40,
            
            id:"pipe_"+index
        })
    })



}
/**
 * 
 * @param {string} type 
 * @param {string} className 
 * 
 */
function createElement(type,className,styles={}){
    const element=document.createElement('div');
    element.className=className;
    Object.assign(element.style,styles)
    return element

        
    }
/**
 * 
 * @param {HTMLDivElement} playerElement 
 * @param {number} playerX 
 * @param {number} playerY 
 */
function updateElementPosition(playerElement,playerX,playerY){
    playerElement.style.left=playerX+'px';
    playerElement.style.top=playerY+"px"
}
function update(){

}
function gameLoop(){
    if(!gameState.gameRunning) return 
    update()
    requestAnimationFrame(gameLoop)
}

function clearLevel(){
    //const gameArea = document.getElementById('game_area');
    Object.values(gameObjects).flat().forEach(
        obj=>{
        if(obj.element && obj.element.parentNode){
            obj.element.remove()
        }
    })
    gameObjects={
        platforms:[],
        enemies:[],
        coins:[],
        surpriseBLocks:[],
        pipes:[]
    }
   
}

 //Input handling
document.addEventListener('keydown',e=>{
    gameState.keys[e.code]=true

    if (e.code =="Space") {
        e.preventDefault()
    }
})
document.addEventListener('keyup',e=>{
    gameState.keys[e.code]=false
})




initGame()