const comparingColor = "#f0d98d";
const sortedColor = '#529c61';
const normalColor = "#916d84";

export function QuickSort(valArr, visArr, animSpeed, setIsSorting) {
    let timeInc = 0;

    for (let i = 0; i < visArr.length; i++)
        visArr[i].style.backgroundColor = normalColor;
        
    const quickSort = (arr, low, high) => {
        if (low < high) {
            let p = partition(arr, low, high);

            let pStyle = visArr[p].style;

            setTimeout(() => {
                pStyle.backgroundColor = sortedColor;
            }, timeInc++ * animSpeed);

            quickSort(arr, low, p - 1);
            quickSort(arr, p + 1, high);
        }
    }

    const partition = (arr, low, high) => {
        //pick random as pivot
        let pivot = arr[high];

        let i = low - 1;

        let temp;
        for (let j = low; j <= high - 1; j++) {
            let jStyle = visArr[j].style;
            let pStyle = visArr[high].style;

            setTimeout(() => {
                jStyle.backgroundColor = comparingColor;
                pStyle.backgroundColor = comparingColor;
            }, timeInc++ * animSpeed);
            if (arr[j] < pivot) {
                i++;
                temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
                let curStyle = visArr[i].style;
                setTimeout(() => {
                    let tempH = curStyle.height;
                    curStyle.height = visArr[j].style.height;
                    visArr[j].style.height = tempH;
                }, timeInc++ * animSpeed);
            }
            setTimeout(() => {
                jStyle.backgroundColor = normalColor;
                pStyle.backgroundColor = normalColor;
            }, timeInc++ * animSpeed);
        }

        temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;

        let nextStyle = visArr[i + 1].style;
        setTimeout(() => {
            let tempH = nextStyle.height;
            nextStyle.height = visArr[high].style.height;
            visArr[high].style.height = tempH;
            visArr[low].style.backgroundColor = sortedColor;
        }, timeInc++ * animSpeed);

        return (i + 1);
    }

    quickSort(valArr, 0, valArr.length - 1);

    setTimeout(() => {
        setIsSorting(false);
    }, timeInc * animSpeed);
}