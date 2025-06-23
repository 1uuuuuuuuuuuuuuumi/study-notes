let productData = []; // const 로 일반 변수 선언 및 초기화(값은 빈 배열)

const kimfunc = function(lumi) 
{
  productData = lumi; // 
  console.log("setProductData 호출됨");
}



console.log(productData); // productData를 출력 []

kimfunc( {name: "Lumi", price: 100} );

console.log(productData); // productData를 출력 // {name: "Lumi", price: 100} 가 출력됨

kimfunc({});
console.log(productData); // productData를 출력 // {} 가 출력됨