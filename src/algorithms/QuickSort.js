const comparingColor = "#f0d98d";
const sortedColor = '#6ce66c';
const normalColor = "#34cceb";

export function QuickSort(valArr, visArr, animSpeed) {
    let timeInc = 0;

    const quickSort = (arr, low, high) => {
        if (low < high) {
            let p = partition(arr, low, high);

            quickSort(arr, low, p - 1);
            quickSort(arr, p + 1, high);
        }
    }

    const partition = (arr, low, high) => {
        //pick random as pivot
        let pivot = arr[high];

        let i = low - 1;

        for (let j = low; j <= high - 1; j++) {

            setTimeout(() => {
                visArr[j].style.backgroundColor = comparingColor;
                visArr[high].style.backgroundColor = comparingColor;
            }, timeInc * animSpeed);
            timeInc++;

            if (arr[j] < pivot) {
                i++;
                let temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;

                setTimeout(() => {
                    let temp = visArr[i].style.height;
                    visArr[i].style.height = visArr[j].style.height;
                    visArr[j].style.height = temp;
                }, timeInc * animSpeed);
                timeInc++;
            }

            setTimeout(() => {
                visArr[j].style.backgroundColor = normalColor;
                visArr[high].style.backgroundColor = normalColor;
            },timeInc * animSpeed);
            timeInc++;
        }
        let temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;

        setTimeout(() => {
            let temp = visArr[i + 1].style.height;
            visArr[i + 1].style.height = visArr[high].style.height;
            visArr[high].style.height = temp;
        }, timeInc * animSpeed);
        timeInc++;

        return (i + 1);
    }

    quickSort(valArr, 0, valArr.length - 1);
}