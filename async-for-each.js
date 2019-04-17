
let asyncForEach = async function (arr, callback) {
  for (let index in arr) {
    await callback(arr[index], index, arr);
  }
};

let callback = async function (number, index, arr){
  console.log("arr["+index+"] = "+number + " in array " +  arr);
};

const start = async function (){
  asyncForEach([5, 1, 9, 2, 2, 10], callback);
  console.log('Done');
};
start()
