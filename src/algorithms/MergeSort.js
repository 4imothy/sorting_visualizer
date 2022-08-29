// use that index to access the block on screen and change it
const comparingColor = "#f0d98d";
const sortedColor = '#529c61';
const normalColor = "#916d84";

let timeouts = [];
let storeOrig = [];

export function pauseMergeSort(setValArr) {
    for (let i = 0; i < timeouts.length; i++)
        clearTimeout(timeouts[i]);
    setValArr(storeOrig);
}

export function MergeSort(array, visArr, animSpeed) {

    for (let i = 0; i < visArr.length; i++)
        visArr[i].style.backgroundColor = normalColor;

    for (let i = 0; i < array.length; i++)
        storeOrig.push(array[i]);

    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);

    animate(animations, visArr, animSpeed);
}

function mergeSortHelper(mainArray, start, end, auxiliaryArray, animations) {
    if (start === end) return;

    const mid = Math.floor((start + end) / 2);

    mergeSortHelper(auxiliaryArray, start, mid, mainArray, animations);
    mergeSortHelper(auxiliaryArray, mid + 1, end, mainArray, animations);
    doMerge(mainArray, start, mid, end, auxiliaryArray, animations);
}

function doMerge(mainArray, start, mid, end, auxiliaryArray, animations) {
    let k = start;
    let i = start;
    let j = mid + 1;

    // -1 to tell reader we at at final stage
    if (end - start + 1 === mainArray.length) {
        animations.push(-1);
    }

    while (i <= mid && j <= end) {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([i, j]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([i, j]);
        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            // We overwrite the value at index k in the original array with the
            // value at index i in the auxiliary array.
            animations.push([k, auxiliaryArray[i]]);
            mainArray[k++] = auxiliaryArray[i++];
        } else {
            // We overwrite the value at index k in the original array with the
            // value at index j in the auxiliary array.
            animations.push([k, auxiliaryArray[j]]);
            mainArray[k++] = auxiliaryArray[j++];
        }
    }
    while (i <= mid) {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([i, i]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([i, i]);
        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= end) {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([j, j]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([j, j]);
        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
    }
}

function animate(animations, visArr, animSpeed) {
    let isFinalMerge = false;
    for (let i = 0; i < animations.length; i++) {

        if (animations[i] === -1) {
            timeouts.push(setTimeout(() => {
                isFinalMerge = true;
            }, i * animSpeed));

            // array always has values after the minus one
            animations.splice(i, 1);
        }

        if (i % 3 === 2) {
            timeouts.push(setTimeout(() => {
                const [barOneInd, newVal] = animations[i];
                const barOneStyle = visArr[barOneInd].style;
                barOneStyle.height = `${newVal / 10}%`;
            }, i * animSpeed));
        } else {
            const [barOneInd, barTwoInd] = animations[i];
            const barOneStyle = visArr[barOneInd].style;
            const barTwoStyle = visArr[barTwoInd].style;
            if (i % 3 === 0) {
                timeouts.push(setTimeout(() => {
                    barOneStyle.backgroundColor = comparingColor;
                    barTwoStyle.backgroundColor = comparingColor;
                }, i * animSpeed));
            } else {
                timeouts.push(setTimeout(() => {
                    if (isFinalMerge) {
                        barOneStyle.backgroundColor = sortedColor;
                        barTwoStyle.backgroundColor = sortedColor;
                    } else {
                        barOneStyle.backgroundColor = normalColor;
                        barTwoStyle.backgroundColor = normalColor;
                    }
                }, i * animSpeed));
            }
        }
    }
}

/*
let visArr;
let animSpeed;
let origIndexArr;
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
    }

    origIndexArr = useArr.slice();
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

        if (left[0].val < right[0].val) {
            arr.push(left.shift());
        } else {
            arr.push(right.shift());
        }
    }

    //adding onto the new array, so get the last orig index in arr, go to the next one, swap those heights
    while (left.length) {
        let leftBlockStyle = visArr[left[0].origInd].style;
        arr.push(left.shift());
    }

    while (right.length) {
        let rightBlockStyle = visArr[right[0].origInd].style;
        arr.push(right.shift());
    }

    // the arr stores the orig index and the value so I can go through and remap the values maybe
    putArrayOnScreen(arr);

    return arr;
}

function putArrayOnScreen(arr) {
    console.log("new");
    // show the new array on screen
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i].origInd + "h: " + visArr[arr[i].origInd].style.height);
        setTimeout(() =>{
        visArr[origIndexArr[i].origInd].style.height = `${arr[i].val / 10}%`;
        }, (i * 10) * animSpeed);
    }
}
/**
 * arr stores the values and original indexes in the values order
 * need the visual components at those origIndexes to show the sorted value
 * if origIndex is the smallest of that array then give it the height based
 * off the val / 10 
 * rn the smallest origInd doesn't have the smallest height
 */