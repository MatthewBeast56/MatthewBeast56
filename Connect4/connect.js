var my={};var ROWS=6
var COLS=7
my.inARow=4
var WINVAL=100000;var theAnim=new Animation();var moves=0;var gameActive=0;var isdropping=0;var RedNum=1;var BluNum=2;var whosFirst;var redScore=0;var bluScore=0;var colcount=[]
var board=[]
var linecoords=[]
var redSpot=new Image();var bluSpot=new Image();var emptySpot=new Image();var emptyPiece=new Image();var redPiece=new Image();var bluPiece=new Image();var whosTurn=RedNum;var whosTurnSpot=new Image();var whosTurnPiece=new Image();function connectMain(mode){this.version='0.415';my.mode=typeof mode!=='undefined'?mode:'std';switch(my.mode){case 'std':ROWS=6
COLS=7
my.inARow=4
break
case '3':ROWS=6
COLS=3
my.inARow=3
break
case '5':ROWS=8
COLS=12
my.inARow=5
break
default:}
var ltBG='background: radial-gradient(#bbb 15%, transparent 16%) 0 0,radial-gradient(#bbb 15%, transparent 16%) 6px 6px,	radial-gradient(rgba(240,240,240,.1) 15%, transparent 20%) 0 1px,	radial-gradient(rgba(240,240,240,.1) 15%, transparent 20%) 6px 6px; background-color:#abc;	background-size:12px 12px;';var s='';s+='<style>'
s+='.clickbtn { display: inline-block; position: relative; text-align: center; margin: 2px; text-decoration: none; font: 14px/25px Arial, sans-serif; color: #19667d; border: 1px solid #88aaff; border-radius: 10px; cursor: pointer; background: linear-gradient(to top right, rgba(170,190,255,1) 0%, rgba(255,255,255,1) 100%); }'
s+='.clickbtn:hover { background: linear-gradient(to top, rgba(255,255,0,1) 0%, rgba(255,255,255,1) 100%); }'
s+='</style>'
s+='<audio id="sndwin" src="../images/sounds/success.mp3" preload="auto"></audio>';s+='<audio id="sndmove" src="../images/sounds/click1.mp3" preload="auto"></audio>';s+='<div style="position:relative; background-color: #ddfff2; margin: 0;  text-align:center; ">';s+=popHTML();s+='<input type="text" id="texter" style="font-size: 18px; font-family: Verdana; width:200px; height:25px; text-align:center; margin:5px;" />';s+='<input type="button" style="margin:5px;" name="reStartButton" value="New Game" onClick="popOpen()" class="clickbtn" />';my.soundQ=true
s+=soundBtnHTML()
for(var row=0;row<=ROWS;row++){s+='<div style="text-align:center; font-size: 0; margin:auto; padding:0; margin:0; border:0; height:50px;">';for(var col=0;col<COLS;col++){s+='<div id="div'+row+'_'+col+'" style="display:inline-block; padding:0; margin:0; border:0;" onMouseMove="placeTop('+col+')" onMouseOut="unPlaceTop('+col+')" onClick="dropIt('+col+')" >';s+='<img id="img'+row+'_'+col+'" style="padding:0; margin:0; border:0;" />';s+='</div>';}
s+='</div>';}
s+='<div id="hist" style="font: 14px arial; color: green; position:absolute; left:5px; bottom:-40px; text-align:left;">History</div>';s+='<div style="font: 9px arial; color: gold; position:absolute; right:10px; bottom:-50px;"></div>';s+='</div>';document.write(s);for(var row=0;row<ROWS;row++){board[row]=[];for(var col=0;col<COLS;col++){board[row][col]=0;}}
fill_lines()
linesShow(linecoords)
my.img=new Image();my.img.setAttribute('crossOrigin','anonymous');my.img.src="images/connect.svg";if(my.img.complete){loaded()}else{my.img.addEventListener('load',loaded)}
gameActive=1;redScore=0;bluScore=0;scoreUpdate();whosFirst=RedNum;if(whosFirst==RedNum){msg(playerName(RedNum)+"'s turn");whosTurn=BluNum;switchTurns();whosFirst=RedNum;}else{msg(playerName(BluNum)+"'s turn");whosTurn=RedNum;switchTurns();whosFirst=BluNum;}
popOpen();}
function histClear(){console.log('histClear')
my.hist=[[],[]]
document.getElementById('hist').innerHTML=''}
function histAdd(player,col){my.hist[player-1].push(col)
histShow()}
function histShow(){var s=''
for(var p=0;p<2;p++){var h=my.hist[p]
s+=playerName(p+1)+': '
for(var i=0;i<h.length;i++){if(i>0)s+=', '
s+=h[i]+1}
s+='<br>'}
document.getElementById('hist').innerHTML=s}
function soundBtnHTML(){s=''
s+='<style> '
s+=' .speaker { height: 30px; width: 30px; position: relative; overflow: hidden; display: inline-block; vertical-align:top; } '
s+=' .speaker span { display: block; width: 9px; height: 9px; background-color: blue; margin: 10px 0 0 1px; }'
s+=' .speaker span:after { content: ""; position: absolute; width: 0; height: 0; border-style: solid; border-color: transparent blue transparent transparent; border-width: 10px 16px 10px 15px; left: -13px; top: 5px; }'
s+=' .speaker span:before { transform: rotate(45deg); border-radius: 0 60px 0 0; content: ""; position: absolute; width: 5px; height: 5px; border-style: double; border-color: blue; border-width: 7px 7px 0 0; left: 18px; top: 9px; transition: all 0.2s ease-out; }'
s+=' .speaker:hover span:before { transform: scale(.8) translate(-3px, 0) rotate(42deg); }'
s+=' .speaker.mute span:before { transform: scale(.5) translate(-15px, 0) rotate(36deg); opacity: 0; }'
s+=' </style>'
s+='<div id="sound" onClick="soundToggle()" class="speaker"><span></span></div>'
return s}
function soundToggle(){var btn='sound'
if(my.soundQ){my.soundQ=false
document.getElementById(btn).classList.add("mute")}else{my.soundQ=true
document.getElementById(btn).classList.remove("mute")}}
function playerName(player){if(player==RedNum){return 'Red'}else{return 'Blue'}}
function loaded(){redPiece.src=imgSlice(my.img,0,0,100,100,50,50)
bluPiece.src=imgSlice(my.img,100,0,100,100,50,50)
emptyPiece.src=imgSlice(my.img,200,0,100,100,50,50)
redSpot.src=imgSlice(my.img,0,100,100,100,50,50)
bluSpot.src=imgSlice(my.img,100,100,100,100,50,50)
emptySpot.src=imgSlice(my.img,200,100,100,100,50,50)
whosTurnSpot.src=redSpot.src;whosTurnPiece.src=redPiece.src;boardClear()}
function imgSlice(img,x,y,wd,ht,toWd,toHt){var can=document.createElement("canvas")
var ctx=can.getContext("2d")
can.width=toWd
can.height=toHt
can.style.width=toWd+"px";can.style.height=toHt+"px";ctx.drawImage(img,x,y,wd,ht,0,0,toWd,toHt)
return can.toDataURL()}
function fill_lines(){linecoords=[]
var chgArr=[[-1,1],[0,1],[1,0],[1,1]];for(row=0;row<ROWS;row++){for(col=0;col<COLS;col++){for(chgno=0;chgno<chgArr.length;chgno++){rowchg=chgArr[chgno][0];colchg=chgArr[chgno][1];var inBoundsQ=true
for(var pos=1;pos<my.inARow;pos++){if(!inbounds(row+pos*rowchg,col+pos*colchg)){inBoundsQ=false
break}}
if(inBoundsQ){line=[];line[0]=row;line[1]=col;line[2]=rowchg;line[3]=colchg;if(row==0&&rowchg==0&&colchg==1){line[4]=2;}else{line[4]=1;}
linecoords.push(line)}}}}}
function linesShow(lines){var s=''
for(var i=0;i<lines.length;i++){var line=lines[i]
s+=line
s+=' '}
console.log('linesShow',s)}
function inbounds(row,col){return((row>=0)&&(col>=0)&&(row<ROWS)&&(col<COLS));}
function rePlay(){if(gameActive==1){scoreUpdate();boardClear();}
for(var col=0;col<COLS;col++){colcount[col]=0;}
for(var row=0;row<ROWS;row++){for(var col=0;col<COLS;col++){board[row][col]=0;}}
moves=0;isdropping=0;}
function boardClear(){for(var col=0;col<COLS;col++){for(var row=0;row<=ROWS;row++){var div=document.getElementById('img'+row+'_'+col)
if(row==0){div.src=emptyPiece.src;}else{div.src=emptySpot.src;}}}}
function placeTop(col){if(gameActive==1){var div=document.getElementById('img'+0+'_'+col)
div.src=whosTurnPiece.src}}
function unPlaceTop(col){if(gameActive==1){var div=document.getElementById('img'+0+'_'+col)
div.src=emptyPiece.src}}
function dropIt(col){if(gameActive==1){if(isdropping==0){isdropping=1;histAdd(whosTurn,col)
var placeLoc=(ROWS-colcount[col])*COLS+col;var placeRow=(ROWS-colcount[col])
if(colcount[col]<6){theAnim.addFrame(0,col,emptyPiece.src);for(var i=(ROWS-1);i>colcount[col];i--){tempRow=(ROWS-i)
theAnim.addFrame(tempRow,col,whosTurnSpot.src);theAnim.addFrame(tempRow,col,emptySpot.src);}
theAnim.finalcall="checkForWinner("+whosTurn+")";theAnim.addFrame(placeRow,col,whosTurnSpot.src);colcount[col]+=1;if(whosTurn==RedNum){board[colcount[col]-1][col]=RedNum;}else{board[colcount[col]-1][col]=BluNum;}}}}}
function boarddump(){s="";for(var col=0;col<COLS;col++){s+="Col "+col+"="+colcount[col]+" -> ";for(var row=0;row<ROWS;row++){s+=board[row][col]+",";}
s+=";\n";}
return s;}
function whoGoesFirst(){whosTurn=whosFirst;switchTurns();if(whosFirst==RedNum){whosFirst=BluNum;}else{whosFirst=RedNum;}}
function switchTurns(){if(gameActive==1){if(whosTurn==RedNum){whosTurn=BluNum;whosTurnSpot.src=bluSpot.src;whosTurnPiece.src=bluPiece.src;msg(playerName(BluNum)+"'s turn");}else{whosTurn=RedNum;whosTurnSpot.src=redSpot.src;whosTurnPiece.src=redPiece.src;msg(playerName(RedNum)+"'s turn");}
if(whosTurn==RedNum&&document.formo.redtype.value=="Computer")ComputersTurn(RedNum);if(whosTurn==BluNum&&document.formo.blutype.value=="Computer")ComputersTurn(BluNum);isdropping=0;}}
function ComputersTurn(player){setTimeout("AComputersTurn("+player+")",50);}
function AComputersTurn(player){Difficulty=document.formo.difficulty.value;switch(Difficulty){case "Too Easy":Levels=2;StartStupid=2;StupidProb=0.9;break;case "Easy":Levels=2;StartStupid=4;StupidProb=0.7;break;case "Medium":Levels=2;StartStupid=10;StupidProb=0.2;break;case "Hard":Levels=2;StartStupid=1000;StupidProb=0.0;break;case "Ouch":Levels=4;StartStupid=1000;StupidProb=0.0;break;default:Levels=2;StartStupid=6;StupidProb=0.7;}
console.log("Levels="+Levels+","+StupidProb+","+Difficulty);BestCol=MaxMove(player,Levels,Number.MAX_VALUE,"Col");moves+=1;if(moves>StartStupid){if(Math.random()<StupidProb){TryCol=Math.floor(Math.random()*COLS);if(colcount[TryCol]<ROWS){BestCol=TryCol;}}}
dropIt(BestCol);}
function freerow(col){var x=-1;for(var row=0;row<ROWS;row++){if(board[row][col]==0){x=row;break;}}
return(x);}
function MaxMove(player,level,ParentMin,want){if(level<=0){return GetBoardVal(player);}else{var MaxCol=0;var MaxVal=-WINVAL*10;for(var col=0;col<COLS;col++){var row=freerow(col);if(row>=0){board[row][col]=player;var TheVal=MinMove(player,level-1,MaxVal,"Val");board[row][col]=0;if(TheVal==WINVAL)return WINVAL;if(TheVal>ParentMin){return TheVal;}else{if(TheVal>MaxVal){MaxVal=TheVal;MaxCol=col;}}}}
if(want=="Val"){return MaxVal;}else{return MaxCol;}}}
function MinMove(player,level,ParentMax,want){if(level<=0){return GetBoardVal(player);}else{var MinCol=0;var MinVal=WINVAL*10;for(var col=0;col<COLS;col++){var row=freerow(col);if(row>=0){if(player==RedNum){board[row][col]=BluNum;}else{board[row][col]=RedNum;}
var TheVal=MaxMove(player,level-1,MinVal,"Val");board[row][col]=0;if(TheVal==-WINVAL)return-WINVAL;if(TheVal<ParentMax){return TheVal;}else{if(TheVal<MinVal){MinVal=TheVal;MinCol=col;}}}}
return MinVal;}}
function GetBoardVal(player){thesum=0
for(var i=0;i<linecoords.length;i++){var theline=linecoords[i]
thesum+=Strength(player,theline[0],theline[1],theline[2],theline[3])*theline[4]}
return thesum}
function Strength(player,row,col,rowchg,colchg){var player2=BluNum
if(player==BluNum){player2=RedNum;}
var MeInARow=0;var MeMaxInARow=0;var YouInARow=0;var YouMaxInARow=0;for(pos=0;pos<my.inARow;pos++){posplayer=board[row+pos*rowchg][col+pos*colchg];if(posplayer==player){MeInARow+=1;if(MeInARow>MeMaxInARow)MeMaxInARow=MeInARow;}else{MeInARow=0;}
if(posplayer==player2){YouInARow+=1;if(YouInARow>YouMaxInARow)YouMaxInARow=YouInARow;}else{YouInARow=0;}}
x=0
if(MeMaxInARow==1)x+=1
if(MeMaxInARow==2)x+=4
if(MeMaxInARow==3)x+=64-YouMaxInARow*16
if(MeMaxInARow==4)x+=256-YouMaxInARow*50
if(MeMaxInARow==my.inARow)return WINVAL
if(YouMaxInARow==1)x-=1
if(YouMaxInARow==2)x-=4
if(YouMaxInARow==3)x-=64-MeMaxInARow*16
if(YouMaxInARow==4)x-=256-MeMaxInARow*50
if(YouMaxInARow==my.inARow)return-WINVAL
return x}
function isWinner(Clr){var inaRow=my.inARow
for(var i=0;i<linecoords.length;i++){var line=linecoords[i]
var row=line[0];var col=line[1];var rowchg=line[2];var colchg=line[3];WinnerQ=true;for(var pos=0;pos<inaRow;pos++){var PosClr=board[row+pos*rowchg][col+pos*colchg];if(PosClr!=Clr){WinnerQ=false;break;}}
if(WinnerQ){var isAI=false
if(whosTurn==RedNum&&document.formo.redtype.value=="Computer")isAI=true
if(whosTurn==BluNum&&document.formo.blutype.value=="Computer")isAI=true
if(!isAI&&my.soundQ)document.getElementById('sndwin').play()
console.log('WinnerQ',i,line,whosTurn,isAI)
break;}}
if(WinnerQ){WinLine=linecoords[i];var line=linecoords[i]
var row=line[0];var col=line[1];var rowchg=line[2];var colchg=line[3];for(var pos=0;pos<inaRow;pos++){var div=document.getElementById('div'+(ROWS-(row+pos*rowchg))+'_'+(col+pos*colchg))
div.style.opacity=0.6
div.style.backgroundColor='gold'}}
return WinnerQ;}
function hiliteClear(){for(row=0;row<ROWS;row++){for(col=0;col<COLS;col++){var div=document.getElementById('div'+(ROWS-row)+'_'+col)
div.style.backgroundColor='transparent'
div.style.opacity=1}}}
function checkForWinner(player){if(gameActive==1){var winQ=isWinner(player)
if(winQ){for(var col=0;col<COLS;col++){unPlaceTop(col);}
if(player==RedNum){msg(playerName(RedNum)+" wins!",true);redScore+=1;}else if(player==BluNum){msg(playerName(BluNum)+" wins!",true);bluScore+=1;}
gameActive=0;scoreUpdate();}else{colsFull=0;for(var col=0;col<COLS;col++){if(colcount[col]==ROWS){colsFull+=1;}}
if(colsFull==COLS){for(var col=0;col<COLS;col++){unPlaceTop(col);}
gameActive=0;msg("It is a draw",true);}}
switchTurns();isdropping=0;}}
function scoreUpdate(){document.getElementById('redScoreBoard').innerHTML=redScore;document.getElementById('bluScoreBoard').innerHTML=bluScore;}
function gameNew(){histClear()
hiliteClear()
gameActive=1;isdropping=0;moves=0;rePlay();whoGoesFirst();}
function msg(s,wowQ){if(wowQ===undefined)wowQ=false;var div=document.getElementById('texter')
div.value=s;if(wowQ){div.style.font='bold 20px Arial';}else{div.style.font='normal 17px Arial';}}
function Animation(){this.frames=[]
this.frameIndex=0;this.alreadyPlaying=false;this.finalcall='';this.getFrameCount=getframecount;this.moreFrames=moreframes;this.addFrame=addframe;this.drawNextFrame=drawnextframe;this.startAnimation=startanimation;}
function finalcall(FuncToCall){this.finalcall=FuncToCall;}
function getframecount(){return this.frames.length;}
function moreframes(){return this.frameIndex<this.getFrameCount();}
function startanimation(){if(!this.alreadyPlaying){theAnim.alreadyPlaying=true;setTimeout('theAnim.drawNextFrame()',5);}}
function addframe(row,col,src){var frame={row:row,col:col,src:src}
theAnim.frames.push(frame)
theAnim.startAnimation();}
function drawnextframe(){if(theAnim.moreFrames()){var frame=theAnim.frames[theAnim.frameIndex];var div=document.getElementById('img'+frame.row+'_'+frame.col)
div.src=frame.src
theAnim.frameIndex++;setTimeout('theAnim.drawNextFrame()',20);}else{theAnim.alreadyPlaying=false;if(my.soundQ)document.getElementById('sndmove').play();if(this.finalcall.length>0){setTimeout(this.finalcall,5);}}}
function popHTML(){var s='';var wd=330;s+='<div id="optpop" style="position:absolute; left:50%; top:10px; width:'+wd+'px; padding: 5px; border-radius: 9px; background-color: rgba(100,130,255,0.9); box-shadow: 10px 10px 5px 0px rgba(40,40,40,0.75); transition: all linear 0.3s; text-align: center; margin-left:-'+(wd/2)+'px; ">';s+='<form name="formo" id="formo">';s+='<div style="text-align:center; margin: 9px auto 12px auto;" >';s+='<input type="button" value="New Game" onClick="popYes()" class="clickbtn" />';s+='<input type="button" value="Close" onClick="popNo()" class="clickbtn" />';s+='</div>';var lineStyle='display: block; margin: 2px 30px 2px 0; ';var ltStyle='display: inline-block; width:100px; margin: 0 10px 0 0;  font: 16px arial; color: black; text-align: right; ';var rtStyle='display: inline-block; width: 170px; color: black; text-align:center; padding: 3px; background-color: #eeffee; font: bold 16px Arial;  border-radius: 10px; ';s+='<div style="'+lineStyle+'" >';s+='<div style="'+ltStyle+'">Difficulty: </div>';s+='<select name="difficulty" style="'+rtStyle+'">';s+='<option value="Too Easy">Too Easy</option>';s+='<option value="Easy" selected="selected">Easy</option>';s+='<option value="Medium">Medium</option>';s+='<option value="Hard">Hard</option>';s+='</select>';s+='</div>';s+='<br>';s+='<div style="'+lineStyle+'" >';s+='<div style="'+ltStyle+'">Red Player: </div>';s+='<select name="redtype" style="'+rtStyle+'">';s+='<option value="Human" selected="selected">Human</option>';s+='<option value="Computer">Computer</option>';s+='</select>';s+='</div>';s+='<div style="'+lineStyle+'" >';s+='<div style="'+ltStyle+'">called: </div>';s+='<input type="text" name="redplayer" value="User"  style="'+rtStyle+'" />';s+='</div>';s+='<br>';s+='<div style="'+lineStyle+'" >';s+='<div style="'+ltStyle+'">Blue Player: </div>';s+='<select name="blutype" style="'+rtStyle+'">';s+='<option value="Human">Human</option>';s+='<option value="Computer" selected="selected">Computer</option>';s+='</select>';s+='</div>';s+='<div style="'+lineStyle+'" >';s+='<div style="'+ltStyle+'">called: </div>';s+='<input type="text" name="blkplayer" value="Computer"  style="'+rtStyle+'" />';s+='</div>';s+='<br>';s+='<div style="'+lineStyle+'" >';s+='<div style="'+ltStyle+'">Scores: </div>';s+='<div style="'+rtStyle+'">';s+='<span class="redtext">Red: </span>';s+='<span id="redScoreBoard" style="color: red; font-size: 16px; font-family: Comic Sans MS, Verdana; width:30px; text-align:center;" />0</span>';s+='<span class="bluetext">&nbsp; Blue: </span>';s+='<ispan id="bluScoreBoard" style="color: blue; font-size: 16px; font-family: Comic Sans MS, Verdana; width:30px; text-align:center;"  />0</span>';s+='</div>';s+='</div>';s+='</form>';s+='</div>';return s;}
function popOpen(){console.log("optpop");var pop=document.getElementById('optpop');pop.style.transitionDuration="0.3s";pop.style.opacity=1;pop.style.zIndex=12;pop.style.left='50%';}
function popYes(){var pop=document.getElementById('optpop');pop.style.opacity=0;pop.style.zIndex=1;pop.style.left='-100%';gameNew();}
function popNo(){var pop=document.getElementById('optpop');pop.style.opacity=0;pop.style.zIndex=1;pop.style.left='-100%';}
