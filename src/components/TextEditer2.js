import React from 'react';
export default class TextEditor extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        // console.log(window.getSelection());
        document.addEventListener('selectionchange', () => {
            console.log('?>??', document.getSelection().toString());
        });
    }

    onChange(e) {
        var html = this.ref.current.innerHTML;
        console.log('e', e.target.selection);
        if (this.props.onChange && html !== this.lastHtml) {
            if (e.nativeEvent.data !== '$') {
                this.props.onChange({ value: html });
            } else {
            }
        }
        this.lastHtml = html;
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.value !== this.ref.current.innerHTML;
    }

    componentDidUpdate() {
        if (this.props.value !== this.ref.current.innerHTML) {
            this.ref.current.innerHTML = this.props.value;
        }
    }

    render() {
        const { enabled, style, className, value } = this.props;
        return (
            <div>
                <div
                    contentEditable={enabled}
                    dangerouslySetInnerHTML={{ __html: value }}
                    ref={this.ref}
                    onInput={this.onChange}
                    onBlur={this.onChange}
                    // onChange={(e) => console.log('onChange')}
                    className="editable"
                    placeholder="Optional Notes..."
                >
                    <span></span>
                </div>
            </div>
        );
    }
}
