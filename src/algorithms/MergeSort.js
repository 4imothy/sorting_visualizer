const comparingColor = "#f0d98d"; // yellow
const movingColor = "#edafcb";   // red
const sortedColor = '#6ce66c';  // green
const normalColor = "#34cceb"; // blue

let visArr;
let animSpeed;
let timeInc = 0;

// have to do the function in-place so we can grab the visual blocks 
export function MergeSort(valArr, visArrP, animSpeedP) {
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
    console.log("s: " + arr.slice());
    return arr;
}

function merge(arr, start, mid, end) {
    let start2 = mid + 1;
    // if it is already sorted, the individual arrays are sorted 
    // so this check works

    setTimeout(() => {
        visArr[start].style.backgroundColor = comparingColor;
        visArr[start2].style.backgroundColor = comparingColor;
    }, timeInc * animSpeed);
    timeInc++;
    

    if (arr[mid] <= arr[start2]) {
        return;
    }

    while (start <= mid && start2 <= end) {
        if (arr[start] <= arr[start2]) {
            start++
        } else {
            let tempVal = arr[start2];
            let tempStyle = visArr[start2];
            let index = start2;

            // shift the values from start2 over
            while (index !== start) {
                arr[index] = arr[index - 1];

                setTimeout(() => { 
                    visArr[index - 1].style.backgroundColor = movingColor;
                    visArr[index].style.height = visArr[index - 1].style.height;
                }, timeInc * animSpeed);
                timeInc++;
                setTimeout(() => { 
                    visArr[index - 1].style.backgroundColor = normalColor;
                }, timeInc * animSpeed);

                timeInc++;
                index--;
            }
            setTimeout(() => { 
                visArr[start].height = tempStyle.style.height;
            });
            timeInc++;
            arr[start] = tempVal;

            start++;
            mid++;
            start2++;
        }
    }
}
