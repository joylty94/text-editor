import React, { useState, useRef, useEffect, useCallback } from 'react';

const TextArea = () => {
    // useEffect(() => {
    //     window.addEventListener('keydown', (e) => {
    //         // e.preventDefault();

    //         if (e.key === '$') {
    //             setPress(true);
    //         } else {
    //             setPress(false);
    //         }
    //     });

    //     return () => {
    //         window.addEventListener('keydown', (e) => {
    //             if (e.key === '$') {
    //                 setPress(true);
    //             } else {
    //                 setPress(false);
    //             }
    //         });
    //     };
    // }, []);
    const [value, setValue] = useState('');
    const [press, setPress] = useState(false);
    const [position, setPosition] = useState({
        top: 0,
        left: 0,
        index: null,
    });

    const onChangeValue = (e) => {
        // console.log(e.target);
        // console.log(e.target.value.includes('\n'), '??');
        // console.log(e.target.selectionStart, 'range');
        //e.target.offsetHeight
        let value = e.target.value;

        if (press) {
            // e.target.setSelectionRange(
            //     e.target.selectionStart - 1,
            //     e.target.selectionStart
            // );
            // let sel = window.getSelection();
            // let range = sel.getRangeAt(0);
            // console.log('range', range);
            // let oRect = range.getBoundingClientRect();
            // console.log('oRect', oRect);
            // // console.log(e.target.getSelection);
            // console.log(window.getSelection());
            var characters = document.querySelector('.characters'); // div with text
            var characters2 = document.querySelector('.characters2'); // div with text
            // console.log('characters', characters);
            var charactersText = characters.textContent;
            // console.log('charactersText', charactersText);

            characters2.textContent = '';

            for (var i = 0; i < value.length; i++) {
                var textNode = document.createTextNode(charactersText[i]);
                console.log('textNode', textNode);
                characters2.appendChild(textNode);

                if (value[i] !== charactersText[i] && value[i] === '$') {
                    console.log('실행');
                    var range = document.createRange();
                    console.log('range', range);
                    range.selectNodeContents(textNode);
                    var rects = range.getClientRects();
                    console.log('rects', rects[0]);
                    setPosition({
                        top: rects[0].top + 15,
                        left: rects[0].left,
                        index: i,
                    });
                    characters2.textContent = '';
                    break;
                }
            }
        }

        setValue(value);
    };

    const onKeyDown = useCallback(
        (e) => {
            // $
            // popup enter(13), 키 top bottom left right
            // e.preventDefault();
            console.log('onKeyDown', e.key);
            if (press) {
            }
            if (e.key === '$') {
                setPress(true);
            } else {
                setPress(false);
            }
        },
        [press]
    );

    return (
        <>
            <ul className="ul" style={{ height: '80px', overflowY: 'auto' }}>
                <li>
                    <button className="button1">1</button>
                </li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
                <li>
                    <button className="button6">6</button>
                </li>
                <li>7</li>
                <li>
                    <button className="button8">8</button>
                </li>
            </ul>
            <div style={{ width: '120px', position: 'relative' }}>
                <textarea
                    className="characters"
                    style={{
                        width: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                    }}
                    value={value}
                    onChange={onChangeValue}
                    onKeyDown={onKeyDown}
                    // onBlur={(e) => {
                    //     setPosition({
                    //         top: 0,
                    //         left: 0,
                    //         index: null,
                    //     });
                    // }}
                />
                <pre
                    // style={{ display: 'none' }}
                    style={{
                        width: '100%',
                        margin: 0,
                        textAlign: 'left',
                        whiteSpace: 'pre-wrap',
                        display: 'hidden',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                    }}
                    className="characters2"
                ></pre>
            </div>
            {/* <button
                onClick={(e) => {
                    var range = document.createRange();
                    var referenceNode = document.querySelector('.characters');
                    console.log('referenceNode', referenceNode);
                    range.selectNodeContents(referenceNode);
                    console.log('range', range);
                    var rects = range.getClientRects();
                    console.log('rects', rects);
                }}
            >
                태스트
            </button> */}
            {/* <button
                onClick={(e) => {
                    var characters = document.querySelector('.characters'); // div with text
                    var characters2 = document.querySelector('.characters2'); // div with text
                    console.log('characters', characters);
                    var charactersText = characters.textContent;
                    console.log('charactersText', charactersText);
                    var charAtIndex = 3;
                    var offsetPosition;

                    // characters.textContent = '';
                    for (var i = 0; i < charactersText.length; i++) {
                        var textNode = document.createTextNode(
                            charactersText[i]
                        );
                        console.log('textNode', textNode);
                        characters2.appendChild(textNode);

                        if (i === charAtIndex) {
                            console.log('실행');
                            var range = document.createRange();
                            console.log('range', range);
                            range.selectNodeContents(textNode);
                            var rects = range.getClientRects();
                            console.log('rects', rects[0]);
                            // console.log('??',rects[0]);
                            // offsetPosition = {
                            //     left: rects[0].left,
                            //     top: rects[0].top,
                            // };
                        }
                    }
                }}
            >
                태스트
            </button> */}
            {/* <button
                onClick={() => {
                    let sel = window.getSelection();

                    if (sel.rangeCount >= 1) {
                        let range = sel.getRangeAt(0);
                        console.log('range', range);
                        let oRect = range.getBoundingClientRect();
                        console.log('oRect', oRect);
                    }
                }}
            >
                범위
            </button>
            <button
                onClick={() => {
                    let currentNode = inputRef.current;
                    console.log(currentNode.createTextRange);
                }}
            >
                selection
            </button> */}

            <button
                onClick={(e) => {
                    var characters = document.querySelector('.button6');
                    characters.focus();
                }}
            >
                포커스
            </button>

            <button
                style={{
                    display:
                        position.index || position.index === 0
                            ? 'block'
                            : 'none',
                    position: 'absolute',
                    left: position.left,
                    top: position.top,
                    border: '1px solid #aaa',
                }}
                onClick={(e) => {
                    setValue((prev) => {
                        return (
                            prev.substring(0, position.index + 1) +
                            '이태용' +
                            prev.substring(position.index + 1)
                        );
                    });
                    setPosition({
                        top: 0,
                        left: 0,
                        index: null,
                    });
                }}
            >
                리스트
            </button>
        </>
    );
};
export default TextArea;
