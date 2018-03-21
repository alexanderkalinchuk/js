//Задача2. Данный метод сравнивает два объекта array1 и array2 независимо от его сложности (типа элементов, вложенных массивов). Вывод true/false в консоль. Есть более легкий способ сравнения, используя метод JSON.stringify() (его реализация у меня в дэшборде - https://codepen.io/alexanderkalinchuk/pen/VXKXqL), однако документация пишет что в нем есть некоторый недостаток, поэтому я попробовал реализовать "велосипед" собственноручно.

var array1 = [
   null,
   "Marvel",
   "2.0.17",
   {
       name: "Hulk",
       color: "green",
       age: 35,
       abilities: ["crash", "smash", [0]]
   },
   {
       name: "Iron Man",
       age: 35,
       stillAlive: true
   },
   ["Captain America", "Thor", "Captain Marvel"]
];


var array2 = [
   null,
   "Marvel",
   "2.0.17",
   {
       name: "Hulk",
       color: "green",
       age: 35,
       abilities: ["crash", "smash", [0]]
   },
   {
       name: "Iron Man",
       age: 35,
       stillAlive: true
   },
   ["Captain America", "Thor", "Captain Marvel"]
];




function deepEquals(array1,array2){
//метод проверяет длины объектов, а также сравнивает каждый элемент объекта1 c элементом объекта2 на этой же позиции
  
if(array1.length != array2.length){ //проверим длины массивов
  console.log("lengts are different");
  return false;
}    
  
  var toString = Object.prototype.toString;

  var typeArr1Elem; 
  var typeArr2Elem;
  var arrayBool;
  var arrayKeysBool;
  var resultValue = 0; 
  //возьмем каждый элемент в объекте1 и проверим его равенство с элементом этой же позиции в объекте2. 
  for(var i=0; i<array1.length; i++){
    
      typeArr1Elem = toString.call(array1[i]);
      typeArr2Elem = toString.call(array2[i]);
      //Каждая проверка вернет false в случае неравенства. Либо true или новое значение resultValue, в зависимости от типа проверяемого элемента. 
      switch(typeArr1Elem){
        case "[object Array]":
          arrayBool = array1[i].every(function(element,index){ 
            return element == array2[i][index];
          });
          
          if(!arrayBool){
            return false;
          }else{
            resultValue += 1;
          }
          break;
          
        case "[object String]":
          if (array1[i] != array2[i]){
            return false; 
          }else{
            resultValue += 1;
          }
          break;
          
        case "[object Number]":
         
          if (array1[i] != array2[i]){
            return false; 
          }else{
            resultValue += 1;
          }
          break;
          
        case "[object Null]":
          if(array1[i] !== array2[i]){
            return false; 
          }else{
            resultValue += 1;
          }
          break;
          
        case "[object Object]":
          var result = ArrayCompareMethod(array1[i],array2[i]);
          if(result){
            resultValue += 1;
          }else{
            return false;
          }
          break;
          
        default:
          console.log("default case");

      }
    
    if(resultValue == array1.length){ //принцип работы: чтобы однозначно были проверены ВСЕ элементы, при true очередного элемента идет запись в resultValue, и только здесь выдается true в return
      return true;
    }
  }
}

function ArrayCompareMethod(array1,array2){
//метод сравнивает элементы типа [object Object]. Сначала сравниваются ключи обоих объектов, затем их значения

var array1Values = Object.values(array1); //преобразуем значения ключей объекта в массив
var array2Values = Object.values(array2);

//проверим равенство ключей объектов. Если ключи разные, сразу вернем false
var array1Keys = Object.keys(array1); //преобразуем ключи объекта в массив
var array2Keys = Object.keys(array2);
arrayKeysBool = array1Keys.every(function(element,index){ 
    return element == array2Keys[index];
  });
  
 if(!arrayKeysBool){
   return false;
 } 

var arrayBool;
var arrayBoolResult;
var indexMultiArray = "";
var array2Intermediate = array2Values;

function ArrayCompare(arr,indexForSecondArray){
//метод сравнивает значения ключей объектов. Причем это могут быть многомерные массивы
  
  if(array1Values.length != array2Values.length){ //проверим длины массивов. (проверяет каждый раз.  так не фонтан.)
    console.log("lengts are different");
    return false;
  }
  
  arrayBool = arr.every(function(element,index){ //возьмем каждый элемент массива1 и сравним с элементов массива2 на этой же позиции
  
    if(!Array.isArray(element)){ //проверим является ли элемент вложенным массивом
      
      if(!indexForSecondArray){  
        return element == array2Values[index];
        
      }else{ 
        if(indexForSecondArray != indexMultiArray){
          return element == array2Values[indexForSecondArray][index];
          
        }else{
          return element == array2Intermediate[index]; 
        }      
      }
      
    }else{  //если элемент вложенный массив
      indexMultiArray = index;
      
      if(array2Intermediate[index] != undefined){
        array2Intermediate = array2Intermediate[index];
        
      }else{
        array2Intermediate = array2Values[indexForSecondArray];     
        array2Intermediate = array2Intermediate[index];
        
      }

      if(element.length == array2Intermediate.length){
        return ArrayCompare(element,index); //вызовем рекурсивно функцию для вложенного массива
        
      }else{
        return false;
      }  
    }
    
  });
  return arrayBool;
}

  arrayBoolResult = ArrayCompare(array1Values);
  return arrayBoolResult;
}

var resultFinal = deepEquals(array1,array2);
console.log(resultFinal); //окончательный результат