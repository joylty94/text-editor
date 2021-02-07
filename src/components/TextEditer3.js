import React, { useRef, useEffect } from 'react';
import ContentEditable from 'react-contenteditable';

const TextEditor = () => {
    const wrap = useRef(null);
    const text = useRef('');

    useEffect(() => {
        document.addEventListener('selectionchange', (e) => {
            text.current = document.getSelection().toString();
            console.log('text.current', text.current);
            console.log('?>??', document.getSelection().toString());
            console.log('text.current', text.current);
        });
    });
    const handleChange = (evt) => {
        text.current = evt.target.value;
    };

    const handleBlur = () => {
        console.log(text.current);
    };

    return (
        <div ref={wrap}>
            <ContentEditable
                html={text.current}
                onBlur={handleBlur}
                onChange={handleChange}
            ></ContentEditable>
        </div>
    );
};
export default TextEditor;
