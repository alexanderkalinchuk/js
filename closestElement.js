/«адача 1
//–ешал задачу с помощью метода перебора forEach(), indexOf(), find(). »змер€€ производительность метода closestElement в каждом случае,
//пришел к выводу, что наиболее быстрым оказалс€ случай с indexOf(), поэтому его и отправл€ю;
//ќстальные варианты решени€ также можно посмотреть в моем codepen

var arrayToLook = [];
for (var i=-10000; i<=10000; i++){
  arrayToLook.push(i); 
}

function closestElement (arrayToLook, valueToCheck){
  var index = arrayToLook.indexOf(valueToCheck);
  if(index != -1){
    return console.log(arrayToLook[index-1]);
  }else{
    return alert("error. the number is not in the array range");
  }
  
  
}

// var t0 = performance.now();
closestElement(arrayToLook, 675);
// var t1 = performance.now();
// console.log('Took', (t1 - t0).toFixed(4), 'milliseconds');


//результат без вывода в консоль
// "Took" "0.1000" "milliseconds"
// "Took" "0.1000" "milliseconds"
// "Took" "0.2000" "milliseconds"
// "Took" "0.2000" "milliseconds"
// "Took" "0.2000" "milliseconds"

//результат с выводом в консоль
// 674
// "Took" "0.8000" "milliseconds"
// 674
// "Took" "0.4000" "milliseconds"
// 674
// "Took" "0.6000" "milliseconds"
// 674
// "Took" "0.4000" "milliseconds"
// 674
// "Took" "0.5000" "milliseconds"