import React, { useRef, useEffect, useState, Fragment } from 'react';
import styled from 'styled-components';
import './editer.css';

const MarkerSpan = () => {
    return <span id="marker1"></span>;
};
const SelectionSpan = ({ children }) => {
    // useEffect(() => {});
    const [mouseHandle, setMouseHandle] = useState(false);
    if (!mouseHandle) {
        return (
            <span
                className="selection"
                onMouseOver={(e) => setMouseHandle(true)}
            >
                {children}
            </span>
        );
    } else {
        return (
            <span
                className="selection"
                onMouseOut={(e) => setMouseHandle(false)}
                // onMouseUp={(e) => {
                //     console.log('??', e.target.parentNode);
                //     e.target.parentNode.blur();
                // }}
                // onMouseDown={(e) => {
                //     console.log('??', e.target.parentNode);
                //     e.target.parentNode.blur();
                // }}
                // onSelect={(e) => {
                //     console.log('??', e.target.parentNode);
                //     e.target.parentNode.blur();
                // }}
            >
                {/* <MarkerSpan /> */}
                {children}
                {/* <MarkerSpan /> */}
            </span>
        );
    }
};

const TextEditor = () => {
    // const wrap = useRef(null);
    const editer = useRef(null);
    // const [active, setActive] = useState(false);
    const [select, setSelect] = useState(false);
    // const [text, setText] = useState(
    //     `v<span id="marker"></span>a<span class="selection">lu</span>e`
    // );
    // const [text, setText] = useState(
    //     `v<span class="selection">a</span><span class="selection">lu</span>e  <span class="selection">???</span>`
    // );
    // const [text, setText] = useState(
    //     <>
    //         v<span className="selection">a</span>
    //         <span className="selection">lu</span>e{' '}
    //         <span className="selection">???</span>
    //     </>
    // );
    // const [text, setText] = useState(
    //     <>
    //         v<SelectionSpan text="e" />
    //         <SelectionSpan text="lu" />e{'   '}
    //         <SelectionSpan text="???" />
    //     </>
    // );

    const [text, setText] = useState([
        { type: Fragment, value: 'v' },
        { type: SelectionSpan, value: 'a' },
        { type: SelectionSpan, value: 'lu' },
        { type: Fragment, value: 'e   ' },
        { type: SelectionSpan, value: '???' },
    ]);
    // const [text, setText] = useState([{ type: Fragment, value: 'value' }]);

    // useEffect(() => {
    //     let selection = document.getElementsByClassName('selection');
    //     for (let i = 0; i < selection.length; i++) {
    //         selection[i].addEventListener('mouseover', function () {
    //             selection[i].classList.add('resizing');
    //             selection[i].innerHTML =
    //                 '<span id="marker1"></span>' +
    //                 selection[i].innerText +
    //                 '<span id="marker2"></span>';
    //         });
    //     }
    //     for (let i = 0; i < selection.length; i++) {
    //         selection[i].addEventListener('mouseout', function () {
    //             const marker1 = document.getElementById('marker1');
    //             const marker2 = document.getElementById('marker2');
    //             selection[i].classList.remove('resizing');
    //             marker1.remove();
    //             marker2.remove();
    //             // selection[i].innerHTML = selection[i].innerText;
    //         });
    //     }
    // }, []);

    // useEffect(() => {
    //     const marker1 = document.getElementById('marker1');
    //     const marker2 = document.getElementById('marker2');

    //     if (marker1 && marker2) {
    //         marker1.addEventListener('click', () => {
    //             console.log('marker click');
    //             editer.current.blur();
    //         });
    //         marker2.addEventListener('click', () => {
    //             console.log('marker click');
    //             editer.current.blur();
    //         });
    //     }
    // }, []);

    // useEffect(() => {
    //     document.addEventListener('selectionchange', (e) => {
    //         // console.log('?>??', document.getSelection().toString());
    //         console.log('?>??', document.getSelection());
    //         let selection = document.getSelection();
    //         if (active && mouseUp) {
    //             console.log(
    //                 '??>>',
    //                 editer.current.innerText.substr(0, selection.anchorOffset) +
    //                     `<span>${document.getSelection().toString()}</span>` +
    //                     editer.current.innerText.substr(selection.extentOffset)
    //             );
    // editer.current.innerHTML =
    //     editer.current.innerText.substr(0, selection.anchorOffset) +
    //     `<span>${document.getSelection().toString()}</span>` +
    //     editer.current.innerText.substr(selection.extentOffset);

    //             // editer.current.innerHTML = document.getSelection().toString();
    //         }
    //     });
    // }, [active, mouseUp]);

    console.log('text', text);
    const onSelectEvent = (e) => {
        let selection = document.getSelection();
        const range = selection.getRangeAt(0);
        console.log('selection', selection);
        console.log('e', e);
        // Todo - span에 마지막 텍스트일 경우 뽑기

        // blur test
        // if (selection.isCollapsed) {
        //     // editer.current.blur();
        // }

        if (!selection.isCollapsed) {
            // selection이 생겼을 경우
            console.log('selection', selection.anchorNode);
            console.log(
                'childNodes',
                selection.anchorNode.parentNode.childNodes
            );
            // console.log('range>?>', range);
            // Todo - editor에 span이 없을 경우. // span으로 갈린 text
            let elArray = [];
            let handle = 'start';
            let spanText = null;

            if (selection.anchorNode.parentNode.nodeName !== 'SPAN') {
                // 시작 selection이 span이 아닌 경우.
                Array.from(selection.anchorNode.parentNode.childNodes).map(
                    (el, i) => {
                        if (handle === 'start') {
                            if (
                                el.textContent !==
                                selection.anchorNode.textContent
                            ) {
                                // selection 안된 text
                                elArray.push({
                                    type:
                                        el.nodeName !== 'SPAN'
                                            ? Fragment
                                            : SelectionSpan,
                                    value: el.textContent,
                                });
                            } else {
                                // 선택 요소가 맞을 경우.
                                if (
                                    el.textContent ===
                                    selection.extentNode.textContent
                                ) {
                                    // 시작, 끝이 같을 경우.
                                    if (
                                        selection.anchorOffset === 0 &&
                                        selection.extentOffset ===
                                            el.textContent.length
                                    ) {
                                        elArray.push({
                                            type: SelectionSpan,
                                            value: el.textContent,
                                        });
                                    } else {
                                        let text = '';
                                        if (selection.anchorOffset !== 0) {
                                            elArray.push({
                                                type: Fragment,
                                                value: el.textContent.substr(
                                                    0,
                                                    selection.anchorOffset
                                                ),
                                            });
                                            text = el.textContent.substr(
                                                selection.anchorOffset
                                            );
                                        }
                                    }
                                    handle = 'end';
                                } else {
                                    // 시작만 같은 경우
                                    if (selection.anchorOffset === 0) {
                                    } else {
                                        elArray.push({
                                            type: Fragment,
                                            value: el.textContent.substr(
                                                0,
                                                selection.anchorOffset
                                            ),
                                        });
                                    }
                                    spanText = el.textContent.substr(
                                        selection.anchorOffset
                                    );
                                    handle = 'middle';
                                }
                            }
                        } else if (handle === 'middle') {
                            if (
                                el.textContent ===
                                selection.extentNode.textContent
                            ) {
                                // 끝 글자
                                handle += el.textContent.substr(
                                    0,
                                    selection.extentOffset
                                );
                                elArray.push({
                                    type: Fragment,
                                    value: el.textContent.substr(
                                        selection.extentOffset
                                    ),
                                });
                                handle = 'end';
                            } else {
                                // 중간 글자
                                handle += el.textContent;
                            }
                        } else if (handle === 'end') {
                            // selection 안된 text
                            elArray.push({
                                type:
                                    el.nodeName !== 'SPAN'
                                        ? Fragment
                                        : SelectionSpan,
                                value: el.textContent,
                            });
                        }
                    }
                );
            } else {
                // 시작 selection이 span이 경우.
                Array.from(
                    selection.anchorNode.parentNode.parentNode.childNodes
                ).map((el, i) => {
                    if (handle === 'start') {
                        if (
                            el.textContent !== selection.anchorNode.textContent
                        ) {
                            // selection 안된 text
                            elArray.push({
                                type:
                                    el.nodeName !== 'SPAN'
                                        ? Fragment
                                        : SelectionSpan,
                                value: el.textContent,
                            });
                        } else {
                            // 선택 요소가 맞을 경우.
                            if (
                                el.textContent ===
                                selection.extentNode.textContent
                            ) {
                                // 시작, 끝이 같을 경우.
                                elArray.push({
                                    type: SelectionSpan,
                                    value: el.textContent,
                                });
                                handle = 'end';
                            } else {
                                // 시작만 같은 경우
                                if (selection.anchorOffset === 0) {
                                } else {
                                    elArray.push({
                                        type: Fragment,
                                        value: el.textContent.substr(
                                            0,
                                            selection.anchorOffset
                                        ),
                                    });
                                }
                                spanText = el.textContent.substr(
                                    selection.anchorOffset
                                );
                                handle = 'middle';
                            }
                        }
                    } else if (handle === 'middle') {
                        if (
                            el.textContent === selection.extentNode.textContent
                        ) {
                            // 끝 글자
                            handle += el.textContent.substr(
                                0,
                                selection.extentOffset
                            );
                            elArray.push({
                                type: Fragment,
                                value: el.textContent.substr(
                                    selection.extentOffset
                                ),
                            });
                            handle = 'end';
                        } else {
                            // 중간 글자
                            handle += el.textContent;
                        }
                    } else if (handle === 'end') {
                        // selection 안된 text
                        elArray.push({
                            type:
                                el.nodeName !== 'SPAN'
                                    ? Fragment
                                    : SelectionSpan,
                            value: el.textContent,
                        });
                    }
                });
            }

            console.log('elArray', elArray);
            setText(elArray);
        }

        // let startIndex =
        //     selection.anchorOffset < selection.extentOffset
        //         ? selection.anchorOffset
        //         : selection.extentOffset;
        // let endIndex =
        //     selection.anchorOffset < selection.extentOffset
        //         ? selection.extentOffset
        //         : selection.anchorOffset;

        // editer.current.innerHTML =
        //     editer.current.innerText.substr(0, startIndex) +
        //     `<span>${selection.toString()}</span>` +
        //     editer.current.innerText.substr(
        //         startIndex + selection.toString().length
        //     );
    };

    const handleChange = (evt) => {
        // var html = this.ref.current.innerHTML;
        editer.current = evt.target.value;
    };

    const handleBlur = () => {
        console.log(editer.current);
    };

    const innerHTML = () => {
        // const onClickSpan = () => {
        //     editer.current.blur();
        // };
        return {
            __html: text,
        };
    };

    const onInput = (e) => {
        const selection = document.getSelection();
        console.log('e>>>>', e);
        console.log('data', e.nativeEvent.data);
        console.log('innerText', e.target.innerText);
        // let cc = document.createElement('span');
        // cc.id = 'caretID';
        // document.getSelection().getRangeAt(0).insertNode(cc);
        // setText([{ type: Fragment, value: e.target.innerText }]);
        // editer.current.blur();
        // console.log('ㅊㅊㅊㅊ', document.getSelection().getRangeAt(0));

        // editer.current.focus();
        // var range = document.createRange();
        // let vv = document.getElementById('caretID');
        // range.selectNode(vv);

        // let vvSelection = document.getSelection();
        // vvSelection.removeAllRanges();
        // vvSelection.addRange(range);
        // range.deleteContents();

        // editer.current.setSelectionRange(2, 5);
    };
    console.log('text11111', text);
    //  const [text, setText] = useState([{ type: Fragment, value: 'value' }]);
    const enterToBr = (e) => {
        var evt = e || window.event;
        var keyCode = evt.charCode || evt.keyCode;
        console.log('keyCode>>', keyCode);
        if (keyCode == 13) {
            // document.execCommand('insertHTML', false, '<br>');
            evt.preventDefault();
        }
    };
    return (
        <EditerWrap>
            {/* <button onClick={(e) => setActive(true)}>dmdmdmd?</button> */}
            {/* <button onClick={(e) => setText('value<span>???</span>')}>
                text change
            </button> */}
            <div
                className="editor"
                onSelect={onSelectEvent}
                // onSelect={(e) => console.log(e.selectionStart)}
                // onMouseDown={(e) => setSelect(false)}
                // onBlur={(e) => setSelect(false)}
                onBlur={(e) => console.log('eee blur', e)}
                // onFocus={(e) => setActive(true)}
                ref={editer}
                onKeyDown={enterToBr}
                // onChange={(e) => console.log('onChange', e)}
                onInput={onInput}
                contentEditable={true}
                suppressContentEditableWarning={true}
                // dangerouslySetInnerHTML={innerHTML()}
            >
                {/* {text} */}
                {text.map((el, i) => (
                    <Fragment key={i}>
                        {React.createElement(el.type, null, <>{el.value}</>)}
                    </Fragment>
                ))}
            </div>
        </EditerWrap>
    );
};
export default TextEditor;

const EditerWrap = styled.div`
    position: relative;
    .editor {
        /* display: inline-block; */
        /* height: 44px; */
        padding: 10px 45px 10px 16px;
        outline: none;
        line-height: 23px;
        white-space: pre-wrap;
        word-break: break-all;
        /* border-bottom: 1px solid #e0e0e0; */
    }

    .phrases-detail {
        & > li {
            display: flex;
            align-items: center;
            height: 44px;
            border-bottom: 1px solid #e0e0e0;
            padding: 0 15px;
            background-color: #f5f5f5;
            &:first-child {
                border-top: 1px solid #e0e0e0;
            }
            &:last-child {
                border-bottom: none;
            }
            & > div:nth-child(1) {
                width: 30%;
            }
            & > div:nth-child(2) {
                width: 30%;
            }
            & > div:nth-child(3) {
                flex: 1;
            }
            & > div {
                white-space: nowrap;
                & > span {
                    font-size: 12px;
                    color: #757575;
                    margin-right: 8px;
                    font-weight: 400;
                }
                & > input {
                    background-color: unset;
                    font-size: 14px;
                    vertical-align: middle;
                }
                & > em,
                & > div > span {
                    font-weight: 500;
                }
                span,
                em {
                    vertical-align: middle;
                }
            }
            & > button {
                & > img {
                    width: 12px;
                    height: 12px;
                    vertical-align: middle;
                }
            }
            input {
                width: 80%;
            }
        }
    }

    .select-entity-list {
        width: 180px;
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.16);
        border-radius: 5px;
        position: absolute;
        ${({ position }) =>
            position && `top : ${position.top}px; left: ${position.left}px;`}
        background-color: #fff;
        z-index: 100;
        overflow: hidden;
        & > input {
            width: 100%;
            padding: 9px 12px;
            &::placeholder {
                color: #bdbdbd;
            }
        }
        .button-wrap {
            padding: 9px 0 8px;
            border-top: 1px solid #e0e0e0;
            & > button {
                display: block;
                width: 156px;
                margin: 0 auto;
                padding: 4px 0;
                font-size: 12px;
                color: #333;
                text-align: center;
                border: 1px solid #e0e0e0;
                box-sizing: border-box;
                border-radius: 5px;
            }
        }

        & > ul {
            max-height: 165px;
            overflow-y: scroll;
            overflow-x: hidden;
            border-top: 1px solid #e0e0e0;
            box-sizing: content-box;
            & > li {
                padding: 8px 12px;
                line-height: 1.25;
                cursor: pointer;
                &:hover,
                &.active {
                    background-color: #f5f5f5;
                }
                .custom-entity {
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                }
                p {
                    flex: 1;
                    max-width: 100%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                p:nth-child(2) {
                    color: #0488da;
                }
            }
        }
        & > .no-matching {
            border-top: 1px solid #e0e0e0;
            padding: 8px 12px;
            line-height: 1.25;
        }
    }
    &:hover > button {
        display: block;
    }
    & > button {
        display: none;
        position: absolute;
        top: 14px;
        right: 12px;
        z-index: 110;
    }
`;
