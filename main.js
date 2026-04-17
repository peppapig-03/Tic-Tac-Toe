const gameboard = (()=>{
    let currentBoard=[[0,0,0],[0,0,0],[0,0,0]];
    const getCurrentBoard = () =>{
        let temporaryBoard=[];
        for(let rowNo=0;rowNo<3;rowNo++){
            temporaryBoard.push([])
            for(let columnNo=0;columnNo<3;columnNo++){
                temporaryBoard[rowNo].push(currentBoard[rowNo][columnNo])
            }
        }
        return temporaryBoard
    }
    const boxCheck = (row, column) =>{
        if ((currentBoard.at(row-1)).at(column-1)==0){
            return "Empty"
        } else{
            return "Filled"
        }
    }
    const errorCheck = (number) =>{
        if ((number==1) || (number==2) || (number==3)){
            return "noError"
        } else{
            return "Error"
        }
    }
    const playerMove =(id,row,column) =>{
        if ((errorCheck(row)=="Error")||(errorCheck(column)=="Error")){
            console.log("Invalid Input")
            return false
        } else if (boxCheck(row,column)=="Filled"){
            console.log("Box is Filled")
            return false
        } else if (moderator.endGameRetrieve()==true){
            console.log("Game has ended")
            return false
        } else{
            console.log(`Player ${id} chooses box on row ${row} and column ${column}`)
            currentBoard[row-1][column-1]=id
            return true
        }
    }
    const checkThreeBox=([row1,col1,row2,col2,row3,col3])=>{
        const referValue=currentBoard[row1][col1]
        if ((currentBoard[row2][col2]==referValue)&&(currentBoard[row3][col3]==referValue)){
            return referValue
        }
        return 0
    }
    const horizontalCheck=()=>{
        for(let rowCheck=0;rowCheck<3;rowCheck++){
            let result=checkThreeBox([rowCheck,0,rowCheck,1,rowCheck,2])
            if (result!=0){
                return result
            }
        }
    return 0
    }
    const verticalCheck=()=>{
        for(let columnCheck=0;columnCheck<3;columnCheck++){
            let result=checkThreeBox([0,columnCheck,1,columnCheck,2,columnCheck])
            if (result!=0){
                return result
            }
        }
    return 0
    }
    const diagonalCheck=()=>{
        let result1=checkThreeBox([0,0,1,1,2,2])
        let result2=checkThreeBox([2,0,1,1,0,2])
        if (result1!=0){
            return result1
        } else if (result2!=0){
            return result2
        } else{
            return 0
        }
    }
    const victoryCheck=()=>{
        return Math.max(horizontalCheck(),verticalCheck(),diagonalCheck())

    }
    return {getCurrentBoard, playerMove,victoryCheck}
})()
const player= function(name, id){
    return {name, id}
}
const playerBase = (()=>{
    let playerList=[]
    for(let playerCount=1;playerCount<=2; playerCount++){
        const newPlayer=player(playerCount,playerCount)
        playerList.push(newPlayer)
    }
    return {playerList}
})()
const moderator=(()=>{
    let gameTurn=1
    let endGame=false
    const nextTurn = ()=>{
        if ((gameTurn<9)&&(gameboard.victoryCheck()==0)){
            gameTurn++
            let titleBox=document.querySelector(".title")
            titleBox.textContent=`Turn ${gameTurn}, Player ${playerTurn()} plays`
        } else if((gameTurn>=9)&&(gameboard.victoryCheck()==0)){
            endGame=true
            let titleBox=document.querySelector(".title")
            titleBox.textContent="Tie has occured"
        } else{
            endGame=true
        }
    }
    const endGameRetrieve=()=>{
        return endGame
    }
    const retrieveTurnCount=()=>{
        return gameTurn
    }
    const playerTurn=()=>{
        if (gameTurn%2==1){
            return 1
        } else{
            return 2
        }
    }
    const oneTurn=(playerNumber,rowNo,colNo)=>{
        if (gameboard.playerMove(playerNumber,rowNo,colNo)==true){
            nextTurn()
            console.log(endGameRetrieve())
            return true
        }
    return false
    }
    return {retrieveTurnCount,playerTurn,oneTurn,endGameRetrieve}
})()
const gridDisplay=(()=>{
    let titleBox=document.querySelector(".title")
    titleBox.textContent=`Turn 1, Player 1 plays`
    let grid=document.querySelector(".grid")
    const spawn=()=>{
        for(let rowCount=1;rowCount<4;rowCount++){
            for(let colCount=1;colCount<4;colCount++){
                const button=document.createElement("button")
                button.classList.add("numberBox")
                button.addEventListener("click",(event)=>{
                    let currentPlayer=moderator.playerTurn()
                    let turnStatus=moderator.oneTurn(moderator.playerTurn(),rowCount,colCount)
                    if (turnStatus==true){
                        button.textContent=currentPlayer
                    }
                    if (moderator.retrieveTurnCount()>4){
                        let victory=gameboard.victoryCheck()
                        if (victory!=0){
                            const title=document.querySelector(".title")
                            title.textContent=`Player ${victory} has won!`
                        }
                    }
                    
                })
            grid.appendChild(button)
            }}
    }
    return {spawn}

})()


console.log(playerBase.playerList)
gridDisplay.spawn()