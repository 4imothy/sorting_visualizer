// take the arrayBlocks, and the normal array, compare with the normal and then change both
export function BubbleSort(valArr, visArr, animSpeed, setIsSorting) {

    const comparingColor = "#f0d98d";
    const sortedColor = '#529c61';
    const normalColor = "#916d84";

    let timeInc = 0;

    if (valArr.length <= 1)
        return;
    for (let i = 0; i < valArr.length - 1; i++) {
        for (let j = 0; j < valArr.length - i - 1; j++) {
            let firstStyle = visArr[j].style;
            let secondStyle = visArr[j + 1].style;

            setTimeout(() => {
                firstStyle.backgroundColor = comparingColor;
                secondStyle.backgroundColor = comparingColor;
            }, timeInc * animSpeed);
            timeInc++;

            setTimeout(() => {
                if (valArr[j] > valArr[j + 1]) {
                    let temp = valArr[j];
                    valArr[j] = valArr[j + 1];
                    valArr[j + 1] = temp;
                    temp = firstStyle.height;
                    firstStyle.height = secondStyle.height;
                    secondStyle.height = temp;
                }
            }, timeInc * animSpeed);
            timeInc++;
            setTimeout(() => {
                firstStyle.backgroundColor = normalColor;
                secondStyle.backgroundColor = normalColor;
            }, timeInc * animSpeed);

            timeInc++;
        }

        setTimeout(() => {
            visArr[visArr.length - i - 1].style.backgroundColor = sortedColor;
        }, timeInc * animSpeed);
        timeInc++;
    }

    setTimeout(() => { 
        setIsSorting(false);
    }, timeInc * animSpeed);
}