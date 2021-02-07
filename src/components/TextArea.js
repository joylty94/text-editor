import React, { useState, useRef, useEffect, memo } from 'react';
import TextEditor from './TextEditer';
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
    const [value, setValue] = useState({ value: '' });
    const [html, setHtml] = useState('');
    const inputRef = useRef(null);

    const onChange = ({ value }) => {
        setValue({ value });
    };

    const onChangeValue = (e) => {
        let key = e.nativeEvent.data;
        let value = e.target.innerText;
        let html = e.target.innerHTML;

        // e.target.innerHTML = e.target.innerHTML + '1';
        console.log('11', key, value, html);

        // setValue(value);
        // e.target.focus();
    };

    const editableUpdate = (prevProps, nextProps) => {
        // console.log('nextProps', nextProps);
        // return nextProps.value !== this.ref.current.innerHTML;
    };

    const EditableDiv = ({ prantValue }) => {
        return (
            <div
                ref={inputRef}
                className="custom-input"
                contentEditable={true}
                suppressContentEditableWarning={true}
                onInput={onChangeValue}
                onBlur={(e) => console.log('blur', e)}
                dangerouslySetInnerHTML={{ __html: prantValue }}
            ></div>
        );
    };

    const MemoEditableDiv = memo(EditableDiv, (prevProps, nextProps) => {
        console.log('!!!!');
        return nextProps.prantValue !== inputRef.current.innerHTML;
    });

    return (
        <ul>
            {[1, 2, 3, 4, 5].map((item, i) => (
                <li key={i}>
                    <TextEditor
                        enabled={true}
                        onChange={onChange}
                        value={value.value}
                    />
                    <div>{item}</div>
                </li>
            ))}
            {/* <button
                onClick={(e) => {
                    console.log('??>>', inputRef.current.selectElement);
                }}
            >
                dd
            </button> */}
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
        </ul>
    );
};

export default TextArea;
