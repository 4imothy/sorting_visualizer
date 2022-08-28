import { useEffect, useState } from 'react';
import { BubbleSort } from '../algorithms/BubbleSort.js';
//import { InPlaceMergeSort } from '../algorithms/InPlaceMergeSort.js';
import { HeapSort } from '../algorithms/HeapSort.js';
import { MergeSort } from '../algorithms/MergeSort.js';
import { QuickSort } from '../algorithms/QuickSort.js';
import styles from './Visual.module.css';

const MAX_VALUE = 900;
const MIN_VALUE = 1;
const TIME_CONST = 200;

const TopBar = ({ arrSize, setArrSize, valArr }) => {

    const [textInputEvent, setTextInputEvent] = useState();

    function handleSlide(e) {
        setArrSize(e.target.value * 10);
        if (textInputEvent != null)
            textInputEvent.target.value = "";
    }

    function handleTextInput(e) {
        setTextInputEvent(e);
        if (e.target.value <= 1000 && e.target.value >= 0) {
            setArrSize(e.target.value);
        }
        if (e.target.value > 1000) {
            e.target.value = 1000;
            setArrSize(e.target.value);
        }
        if (e.target.value <= 0) {
            e.target.value = 1;
        }
    }


    /*
    function callMergeSortInPlace() {
        InPlaceMergeSort(valArr, document.getElementsByClassName(styles.arrBlock), TIME_CONST / arrSize);
    }
    */

    function callBubbleSort() {
        BubbleSort(valArr, document.getElementsByClassName(styles.arrBlock), TIME_CONST / arrSize);
    }
    

    function callMergeSort() {
        MergeSort(valArr, document.getElementsByClassName(styles.arrBlock), TIME_CONST / arrSize);
    }

    function callHeapSort(){
        HeapSort(valArr, document.getElementsByClassName(styles.arrBlock), TIME_CONST / arrSize);
    }

    function callQuickSort(){
        QuickSort(valArr, document.getElementsByClassName(styles.arrBlock), TIME_CONST / arrSize);
    }
    return (
        <div className={styles.barContainer}>
            <div className={styles.customizeSize}>
                <div className={styles.textContainer}>
                    <p className={styles.sizeText}>
                        size:
                    </p>
                    <input className={styles.textInput} type="text" placeholder={arrSize} onChange={handleTextInput} />
                </div>
                <div className={styles.sizeSlider}>
                    <input defaultValue={16} type="range" step={.5} onChange={handleSlide} />
                </div>
            </div>
            <button onClick={callBubbleSort}>Bubble Sort</button>
            <button onClick={callHeapSort}>Heap Sort</button>
            <button onClick={callMergeSort}>Merge Sort</button>
            <button onClick={callQuickSort}>Quick Sort</button>
        </div>
    )
}

const ArrayShower = ({ arrSize, arr, setArr }) => {

    useEffect(() => {
        setArr(newArray(arrSize));
    }, [arrSize, setArr]);

    return (
        <div className={styles.arrContainer}>
            {
                arr.map((value, i) => {
                    return (
                        <div className={styles.arrBlock} key={i} style={{
                            height: `${value / 10}%`,
                        }}>
                        </div>
                    )
                })
            }
        </div>
    )
}
const Visual = () => {
    const [arrSize, setArrSize] = useState(100);
    const [arr, setArr] = useState([]);

    return (
        <div className={styles.visualContainer}>
            <TopBar arrSize={arrSize} setArrSize={setArrSize} valArr={arr} />
            <ArrayShower arr={arr} setArr={setArr} arrSize={arrSize} />
        </div>
    )
}

function newArray(count) {
    const newArr = [];
    for (let i = 0; i < count; i++) {
        newArr.push(Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE) + MIN_VALUE));
    }
    return newArr;
}


export default Visual