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
let timeInc = 0;

export function MergeSort(valArr, visArrP, animSpeedP) {
    visArr = visArrP;
    animSpeed = animSpeedP;

    for (let i = 0; i < valArr.length; i++) {
        useArr.push({
            val: valArr[i],
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
    // this arr becomes merged again and again till length is original length
    let arr = [];

    while (left.length && right.length) {
        let leftBlockStyle = visArr[left[0].origInd].style;
        let rightBlockStyle = visArr[right[0].origInd].style;

        setTimeout(() => {
            leftBlockStyle.backgroundColor = comparingColor;
            rightBlockStyle.backgroundColor = comparingColor;
        }, timeInc * animSpeed);
        timeInc++;
        /*
        let rightH = rightBlockStyle.height;
        rightBlockStyle.height = leftBlockStyle.height;
        leftBlockStyle.height = rightH;
        */

        /**
         * arr.push(i) moves i to the end or arr. So grab the origIndex of the last element of 
         * arr and swap that with the current.
         * swap this field below
         * visArr[arr[arr.length - 1].origInd + 1].height
         */
        if (left[0].val < right[0].val) {
            setTimeout(() => {
                leftBlockStyle.backgroundColor = movingColor;
            }, timeInc * animSpeed);
            timeInc++;

            arr.push(left.shift());
        } else {
            setTimeout(() => {
                rightBlockStyle.backgroundColor = movingColor;
            }, timeInc * animSpeed);
            timeInc++;
            arr.push(right.shift());
        }
    }

    //adding onto the new array, so get the last orig index in arr, go to the next one, swap those heights
    while (left.length) {
        arr.push(left.shift());
    }

    while (right.length) {
        arr.push(right.shift());
    }

    for (let i = 0; i < arr.length; i++)
        console.log(arr[i].val);

    return arr;
}
