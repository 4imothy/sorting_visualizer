const comparingColor = "#f0d98d"; // yellow
const movingColor = "#edafcb";   // red
const sortedColor = "#6ce66c";  // green
const normalColor = "#34cceb"; // blue

let visArr;
let animSpeed;
let timeInc = 0;

// have to do the function in-place so we can grab the visual blocks 
export function InPlaceMergeSort(valArr, visArrP, animSpeedP) {
    visArr = visArrP;
    animSpeed = animSpeedP;
    mergeSortHelper(valArr, 0, valArr.length - 1);
}

function mergeSortHelper(arr, l, r) {
    if (l < r) {
        //stays at l = 0 m = 2
        let m = Math.floor((r + l) / 2);

        mergeSortHelper(arr, l, m);
        mergeSortHelper(arr, m + 1, r);
        merge(arr, l, m, r);
    }
    return arr;
}

function merge(arr, start, mid, end) {

    let start2 = mid + 1;
    // if it is already sorted, the individual arrays are sorted 
    // so this check works

    if (arr[mid] <= arr[start2]) {
        return;
    }

    while (start <= mid && start2 <= end) {

        let startStyle = visArr[start].style;
        let start2Style = visArr[start2].style;

        startStyle.backgroundColor = comparingColor;
        start2Style.backgroundColor = comparingColor;

        setTimeout(() => {
            startStyle.backgroundColor = normalColor;
            start2Style.backgroundColor = normalColor;
        }, animSpeed);

        if (arr[start] <= arr[start2]) {
            start++;
        } else {
            let tempVal = arr[start2];

            // shift the values from start2 over to right
            for (let index = start2; index !== start; index--) {
                arr[index] = arr[index - 1];

                let indexStyle = visArr[index].style;
                let indexM1Style = visArr[index - 1].style;

                setTimeout(() => {
                    indexStyle.backgroundColor = movingColor;
                    indexM1Style.backgroundColor = movingColor;
                    let temp = indexStyle.height;
                    indexStyle.height = indexM1Style.height;
                    indexM1Style.height = temp;
                }, timeInc * animSpeed)
                timeInc++;

                setTimeout(() => {
                    indexM1Style.backgroundColor = normalColor;
                    indexStyle.backgroundColor = normalColor;
                }, timeInc * animSpeed);
                timeInc++;
            }
            arr[start] = tempVal;
            start++;
            mid++;
            start2++;
        }
    }
}
