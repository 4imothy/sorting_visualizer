import { useEffect, useState } from 'react';
import { BubbleSort } from '../algorithms/BubbleSort.js';
//import { InPlaceMergeSort } from '../algorithms/InPlaceMergeSort.js';
import { HeapSort, pauseHeapSort } from '../algorithms/HeapSort.js';
import { MergeSort, pauseMergeSort } from '../algorithms/MergeSort.js';
import { QuickSort } from '../algorithms/QuickSort.js';
import { CSSTransition } from 'react-transition-group';
import styles from './Visual.module.css';
import './transition.css'

const MAX_VALUE = 900;
const MIN_VALUE = 1;
const TIME_CONST = 200;
const DEFAULT_COLOR = "#b8ccc5";
const WHILE_SORTING = "#b30404";
const DEFAULT_BAR_BG_COLOR = "#5d9c9c";
const WHILE_SORTING_BAR_BG_COLOR = "#3a6161";

const TopBar = ({ arrSize, setArrSize, valArr, setValArr }) => {

    const [textInputEvent, setTextInputEvent] = useState();
    const [selectedAlg, setSelectedAlg] = useState("None");
    const [isSorting, setIsSorting] = useState(false);
    const [bgColor, setBGColor] = useState(DEFAULT_COLOR);
    const [barColor, setBarColor] = useState(DEFAULT_BAR_BG_COLOR);

    useEffect(() => {
        if (isSorting) {
            setBGColor(WHILE_SORTING);
            setBarColor(WHILE_SORTING_BAR_BG_COLOR);
        }
        else {
            setBGColor(DEFAULT_COLOR);
            setBarColor(DEFAULT_BAR_BG_COLOR)
        }
    }, [isSorting]);

    function handleSlide(e) {
        if (isSorting) {
            e.target.value = arrSize / 10;
            return;
        }
        resetBlockColors();
        setArrSize(e.target.value * 10);
        if (textInputEvent != null)
            textInputEvent.target.value = "";
    }

    function handleTextInput(e) {
        if (isSorting) {
            e.target.value = arrSize;
            return;
        }

        resetBlockColors();
        setTextInputEvent(e);
        if (e.target.value <= 1000 && e.target.value >= 0) {
            setArrSize(e.target.value);
        }
        if (e.target.value > 1000) {
            e.target.value = 1000;
            setArrSize(e.target.value);
        }
        if (e.target.value < 0) {
            e.target.value = 0;
        }
    }

    function sortWithSelected() {
	    if(isSorting){
		    return;
	    }
        setIsSorting(true);
        switch (selectedAlg) {
            case "Bubble Sort":
                BubbleSort(valArr, document.getElementsByClassName(styles.arrBlock), TIME_CONST / arrSize, setIsSorting);
                break;
            case "Heap Sort":
                HeapSort(valArr, document.getElementsByClassName(styles.arrBlock), TIME_CONST / arrSize, setIsSorting);
                break;
            case "Merge Sort":
                MergeSort(valArr, document.getElementsByClassName(styles.arrBlock), TIME_CONST / arrSize, setIsSorting);
                break;
            case "Quick Sort":
                QuickSort(valArr, document.getElementsByClassName(styles.arrBlock), TIME_CONST / arrSize, setIsSorting);
                break;
            case "None":
                setIsSorting(false);
                return;
        }
    }

    function pauseSort() {
        if (isSorting) {
            switch (selectedAlg) {
                case "Bubble Sort":
                    break;
                case "Heap Sort":
                    pauseHeapSort(valArr, setValArr, document.getElementsByClassName(styles.arrBlock));
                    break;
                case "Merge Sort":
                    pauseMergeSort(setValArr);
                    break;
                case "Quick Sort":
                    break;
                case "None":
                    return;
            }
        }
    }

    function resetBlockColors() {
        let arr = document.getElementsByClassName(styles.arrBlock);

        for (let i = 0; i < arr.length; i++)
            arr[i].style.backgroundColor = "#916d84";
    }

    function getNewArray() {
        if(isSorting)
            return;
            
        resetBlockColors();
        setValArr(newArray(arrSize));
    }

    return (
        <div className={styles.barContainer} style={{
            backgroundColor: `${barColor}`,
        }}>
            <div className={styles.customizeSize}>
                <div className={styles.textContainer}>
                    <p className={styles.sizeText}>
                        Size:
                    </p>
                    <input className={styles.textInput} type="text" placeholder={arrSize} onChange={handleTextInput} size="3" style={{
                        backgroundColor: `${bgColor}`,
                    }} />
                </div>
                <input defaultValue={16} type="range" step={.5} onChange={handleSlide} />
            </div>
            <p style={{
                fontSize: '3vh',
                marginRight: '1vh'
            }}>Algorithm: </p>
            <AlgorithmSelecter isSorting={isSorting} bgColor={bgColor} selectedAlg={selectedAlg} setSelectedAlg={setSelectedAlg} />
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                alignText: 'center',
            }}>
                <button className={styles.barButton} onClick={sortWithSelected} style={{
                    backgroundColor: `${bgColor}`,
                }} >Sort</button>
                <button className={styles.barButton} onClick={getNewArray} style={{
                    backgroundColor: `${bgColor}`,
                }}>New Array</button>
            </div>
        </div>
    )
}

const AlgorithmSelecter = ({ selectedAlg, setSelectedAlg, bgColor, isSorting }) => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <ul onClick={() => {
            if (!isSorting)
                setIsOpen(true);
        }} onMouseOver={() => {
            if (!isSorting)
                setIsOpen(true);
        }} onMouseLeave={() => {
            setIsOpen(false);
        }} >
            <span className={styles.selectAlgOpener} style={{
                backgroundColor: `${bgColor}`,
            }}>{selectedAlg}  ▼</span>
            <CSSTransition in={isOpen} timeout={500} classNames="selectAlg" unmountOnExit>
                <div>
                    <li>
                        <button className={styles.dropdownItem} onClick={() => {
                            setSelectedAlg("Bubble Sort");
                        }}>Bubble Sort</button>
                    </li>
                    <li>
                        <button className={styles.dropdownItem} onClick={() => {
                            setSelectedAlg("Heap Sort");
                        }}>Heap Sort</button>
                    </li>
                    <li>
                        <button className={styles.dropdownItem} onClick={() => {
                            setSelectedAlg("Merge Sort");
                        }}>Merge Sort</button>
                    </li>
                    <li>
                        <button className={styles.dropdownItem} onClick={() => {
                            setSelectedAlg("Quick Sort");
                        }}>Quick Sort</button>
                    </li>
                </div>
            </CSSTransition>
        </ul>
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
            <TopBar arrSize={arrSize} setArrSize={setArrSize} valArr={arr} setValArr={setArr} />
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
