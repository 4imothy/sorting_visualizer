// add another O (n) where each element in the val arr becomes a type that 
// has the original value as well as it's original place in the originial array
// use that index to access the block on screen and change it

const comparingColor = "#f0d98d";
const movingColor = "#edafcb";
const sortedColor = '#6ce66c';
const normalColor = "#34cceb";

let visArr;
let animSpeed;
let useArr = [];

export function MergeSort(valArr, visArrP, animSpeedP) {
    visArr = visArrP;
    animSpeed = animSpeedP;

    for(let i = 0; i < valArr.length; i++){
        useArr.push({val: valArr[i],
            origInd: i
        });
        console.log(useArr[i].val);
    }
    split(useArr);
}

function split(arr) {
    //base case
    if (arr.length < 2)
        return arr;

    const mid = Math.floor(arr.length / 2);

    const left = arr.splice(0, mid);

    return merge(split(left), split(arr));
}

function merge(left, right) {    
    let arr = [];

    while (left.length && right.length) {
        if (left[0].val < right[0].val)
            arr.push(left.shift());
        else
            arr.push(right.shift());
    }

    const output = [...arr, ...left, ...right];

    for(let i =0 ; i < output.length; i++)
        console.log(output[i].val);
    
    return output;
}
