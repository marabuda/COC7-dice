function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function transformOutput(temp){
    if (temp == 0){
        return temp + 100;    
    }else{
        return temp;
    }
}

function checkNaturalNumber(n){
    return n>=0 && Math.floor(n) === +n;
}

function checkBonus(diceTimes){
    if (!(checkNaturalNumber(diceTimes) && 0<diceTimes && diceTimes<=5)) {
        alert("獎懲骰數量需為0~5的整數");
        document.getElementById('diceTimes').focus();  
        return false; 
    }else if (!(document.getElementById('bonus').checked || document.getElementById('peanlty').checked)){
        alert("需勾選獎勵或懲罰");
        return false;
    }
    return true;
}

function checkTarget(target){
    if (target == '' || !(checkNaturalNumber(target) && 0<target && target<=500)) {
        alert("目標數值需為0~500的整數");   
        document.getElementById('targetNumber').focus();
        return false;
    }
    return true;
}

function transFinalOutput(finalOput,target){
    if (finalOput == 1) {
        return '大成功!';
    }else if(finalOput == 100){
        return '大失敗';
    }else if(finalOput<(Math.floor(target/5))){
        return '極限成功';    
    }else if(finalOput<(Math.floor(target/2))){
        return '困難成功';
    }else if(finalOput <= target) {
        return '通常成功';
    }else{
        return '失敗';
    }
}
// console.log(checkNaturalNumber(-1));
function printOutput(){
    let digitaInOnes = getRandomInt(10); //十面骰
    let outPut='';//暫時結果000要轉成100

    let bonusOutput; //依照獎懲結果取最大或最小
    let bonusDiceTen = [];
    bonusDiceTen.push(getRandomInt(10));
    let originalOutput = bonusDiceTen[0]*10 + digitaInOnes;
    let transOriginalOput = transformOutput(originalOutput); //已經丟出一組
    
    let finalOput;//最後結果
    let diceTimes = document.getElementById("diceTimes").value;    
    let target = document.getElementById("targetNumber").value;
    let compare;

    let plName = document.getElementById("pl").value;
    let pcName = document.getElementById("pc").value;
    let skillName = document.getElementById("skill").value;
    
    let stringToPrint;

    //有獎懲
    if(diceTimes !== ''){
        //獎懲檢查&&目標檢查
        if (checkBonus(diceTimes) && checkTarget(target) ) {
            //擲骰
            for (var i = 0; i < diceTimes; i++) {
                bonusDiceTen.push(getRandomInt(10));  
            }
            if (document.getElementById('bonus').checked) {
                bonusOutput = Math.min.apply(null,bonusDiceTen); 
            }else{
                bonusOutput = Math.max.apply(null,bonusDiceTen);  
            }
            outPut = bonusOutput*10 + digitaInOnes;
            finalOput = transformOutput(outPut);
            
            //印出
            let targetString = target.toString();
            let bonusDiceTenString = bonusDiceTen.toString().slice(2);
            compare = transFinalOutput(finalOput,target); //成功程度
            if (document.getElementById('bonus').checked ) {
                stringToPrint = '玩家' + plName + '的角色<b>' + pcName + '</b>為' + skillName + '<i>' + targetString + '</i>擲出' + transOriginalOput + "及獎勵[" +  bonusDiceTenString + "]，結果為" + finalOput + "，<span>" + compare + '</span> <br>';   
                document.getElementById("result").insertAdjacentHTML('afterbegin',stringToPrint);
                diceTimes.value= "";
                target.value=""; 
            }else{
                stringToPrint = '玩家' + plName + '的角色<b>' + pcName + '</b>為' + skillName + '<i>' + targetString + '</i>擲出' + transOriginalOput + "及懲罰[" +  bonusDiceTenString + "]，結果為" + finalOput + "，<span>" + compare + '</span> <br>'; 
                document.getElementById("result").insertAdjacentHTML('afterbegin',stringToPrint);
                diceTimes.value= "";
                target.value=""; 
            }
        }
    }else{ //無獎懲
        if (checkTarget(target)) {
            finalOput = transOriginalOput; //取用最早丟出的一一組
            //印出
            let targetString = target.toString();  
            compare = transFinalOutput(finalOput,target);
            stringToPrint = '玩家' + plName + '的角色<b>' + pcName + '</b>為' + skillName + '<i>' + targetString + '</i>擲出' + finalOput + "，<span>" + compare + '</span> <br>'; 
            document.getElementById("result").insertAdjacentHTML('afterbegin',stringToPrint);
            diceTimes.value= "";
            target.value = "";       
        }   
    }
}