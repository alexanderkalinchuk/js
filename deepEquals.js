//������2. ������ ����� ���������� ��� ������� array1 � array2 ���������� �� ��� ��������� (���� ���������, ��������� ��������). ����� true/false � �������. ���� ����� ������ ������ ���������, ��������� ����� JSON.stringify() (��� ���������� � ���� � �������� - https://codepen.io/alexanderkalinchuk/pen/VXKXqL), ������ ������������ ����� ��� � ��� ���� ��������� ����������, ������� � ���������� ����������� "���������" ���������������.

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
//����� ��������� ����� ��������, � ����� ���������� ������ ������� �������1 c ��������� �������2 �� ���� �� �������
  
if(array1.length != array2.length){ //�������� ����� ��������
  console.log("lengts are different");
  return false;
}    
  
  var toString = Object.prototype.toString;

  var typeArr1Elem; 
  var typeArr2Elem;
  var arrayBool;
  var arrayKeysBool;
  var resultValue = 0; 
  //������� ������ ������� � �������1 � �������� ��� ��������� � ��������� ���� �� ������� � �������2. 
  for(var i=0; i<array1.length; i++){
    
      typeArr1Elem = toString.call(array1[i]);
      typeArr2Elem = toString.call(array2[i]);
      //������ �������� ������ false � ������ �����������. ���� true ��� ����� �������� resultValue, � ����������� �� ���� ������������ ��������. 
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
    
    if(resultValue == array1.length){ //������� ������: ����� ���������� ���� ��������� ��� ��������, ��� true ���������� �������� ���� ������ � resultValue, � ������ ����� �������� true � return
      return true;
    }
  }
}

function ArrayCompareMethod(array1,array2){
//����� ���������� �������� ���� [object Object]. ������� ������������ ����� ����� ��������, ����� �� ��������

var array1Values = Object.values(array1); //����������� �������� ������ ������� � ������
var array2Values = Object.values(array2);

//�������� ��������� ������ ��������. ���� ����� ������, ����� ������ false
var array1Keys = Object.keys(array1); //����������� ����� ������� � ������
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
//����� ���������� �������� ������ ��������. ������ ��� ����� ���� ����������� �������
  
  if(array1Values.length != array2Values.length){ //�������� ����� ��������. (��������� ������ ���.  ��� �� ������.)
    console.log("lengts are different");
    return false;
  }
  
  arrayBool = arr.every(function(element,index){ //������� ������ ������� �������1 � ������� � ��������� �������2 �� ���� �� �������
  
    if(!Array.isArray(element)){ //�������� �������� �� ������� ��������� ��������
      
      if(!indexForSecondArray){  
        return element == array2Values[index];
        
      }else{ 
        if(indexForSecondArray != indexMultiArray){
          return element == array2Values[indexForSecondArray][index];
          
        }else{
          return element == array2Intermediate[index]; 
        }      
      }
      
    }else{  //���� ������� ��������� ������
      indexMultiArray = index;
      
      if(array2Intermediate[index] != undefined){
        array2Intermediate = array2Intermediate[index];
        
      }else{
        array2Intermediate = array2Values[indexForSecondArray];     
        array2Intermediate = array2Intermediate[index];
        
      }

      if(element.length == array2Intermediate.length){
        return ArrayCompare(element,index); //������� ���������� ������� ��� ���������� �������
        
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
console.log(resultFinal); //������������� ���������