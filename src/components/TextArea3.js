import React, { useState, useRef, useEffect, memo } from 'react';
import ContentEditable from 'react-contenteditable';

const TextArea = () => {
    // useEffect(() => {
    //     document.getElementById('editor').addEventListener(
    //         'input',
    //         function (e) {
    //             console.log('input event fired', e.data);
    //         },
    //         false
    //     );
    // }, []);
    const [html, setHtml] = useState('');
    const inputRef = useRef(null);

    const onChangeValue = (e) => {
        let key = e.nativeEvent.data;
        let value = e.target.value;
        // e.target.setAttribute('data-range', '1234');
        console.log('value', value);
        setHtml(value);
        // if (key !== '$') {
        //     setHtml(value);
        // if(value.trim().length === 1){

        // }else{
        //     setHtml(value);
        // }
        // } else {
        //     if (value.trim() === '$') {
        //         setHtml('<span/>$<span/>');
        //     } else {
        //         let count;
        //         // for(count = 0; count < value.length -1 ; count++){
        //         //     if(value[count] !== '')
        //         // }
        //         let newValue = value.split(' $').join('<span/>$<span/>');
        //         setHtml(newValue);
        //     }
        // }
    };

    return (
        <>
            <div>sef</div>
            <ContentEditable
                // innerRef={this.contentEditable}
                className="characters"
                html={html}
                disabled={false}
                onChange={onChangeValue}
            />
            <button
                onClick={(e) => {
                    var characters = document.querySelector('.characters'); // div with text
                    // var characters2 = document.querySelector('.characters2'); // div with text
                    console.log('characters', characters);
                    var charactersText = characters.textContent;
                    console.log('charactersText', charactersText);
                    var charAtIndex = 3;

                    characters.textContent = '';
                    for (var i = 0; i < charactersText.length; i++) {
                        var textNode = document.createTextNode(
                            charactersText[i]
                        );
                        console.log('textNode', textNode);
                        characters.appendChild(textNode);

                        if (charactersText[i] === '$') {
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
                            break;
                        }
                    }
                }}
            >
                태스트
            </button>
            <div
                style={{
                    position: 'absolute',
                    left: '137px',
                    top: '59px',
                    border: '1px solid #aaa',
                }}
            >
                리스트
            </div>
        </>
    );
};

export default TextArea;
