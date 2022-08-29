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

const TopBar = ({ arrSize, setArrSize, valArr, setValArr }) => {

    const [textInputEvent, setTextInputEvent] = useState();
    const [selectedAlg, setSelectedAlg] = useState("None");
    const [isSorting, setIsSorting] = useState(false);

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

    function sortWithSelected() {
        setIsSorting(true);
        switch (selectedAlg) {
            case "Bubble Sort":
                BubbleSort(valArr, document.getElementsByClassName(styles.arrBlock), TIME_CONST / arrSize);
                break;
            case "Heap Sort":
                HeapSort(valArr, document.getElementsByClassName(styles.arrBlock), TIME_CONST / arrSize);
                break;
            case "Merge Sort":
                MergeSort(valArr, document.getElementsByClassName(styles.arrBlock), TIME_CONST / arrSize);
                break;
            case "Quick Sort":
                QuickSort(valArr, document.getElementsByClassName(styles.arrBlock), TIME_CONST / arrSize);
                break;
            case "None":
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

    return (
        <div className={styles.barContainer}>
            <div className={styles.customizeSize}>
                <div className={styles.textContainer}>
                    <p className={styles.sizeText}>
                        Size:
                    </p>
                    <input className={styles.textInput} type="text" placeholder={arrSize} onChange={handleTextInput} size="3" />
                </div>
                <div className={styles.sizeSlider}>
                    <input defaultValue={16} type="range" step={.5} onChange={handleSlide} />
                </div>
            </div>
            <p style={{
                fontSize: '3vh',
                marginRight: '1vh'
            }}>Algorithm: </p>
            <AlgorithmSelecter selectedAlg={selectedAlg} setSelectedAlg={setSelectedAlg} />
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                alignText: 'center',
            }}>
                <button className={styles.barButton} onClick={sortWithSelected}>Sort</button>
                <button className={styles.barButton}>New Array</button>
            </div>
        </div>
    )
}

const AlgorithmSelecter = ({ selectedAlg, setSelectedAlg }) => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <ul onMouseLeave={() => {
            setIsOpen(false);
        }} onMouseOver={() => {
            setIsOpen(true);
        }}>
            <span className={styles.selectAlgOpener}>{selectedAlg}  ▼</span>
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
            <TopBar arrSize={arrSize} setArrSize={setArrSize} valArr={arr} setValArr={setArr}/>
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