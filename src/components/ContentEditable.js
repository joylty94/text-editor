import React from 'react';
import createReactClass from 'create-react-class';

const ContentEditable = createReactClass({
    render: function () {
        return (
            <div
                onInput={this.emitChange}
                onBlur={this.emitChange}
                contentEditable
                dangerouslySetInnerHTML={{ __html: this.props.html }}
            ></div>
        );
    },
    shouldComponentUpdate: function (nextProps) {
        return nextProps.html !== this.getDOMNode().innerHTML;
    },
    emitChange: function (e) {
        var html = this.getDOMNode().innerHTML;
        console.log('??>>>>>', e);
        if (this.props.onChange && html !== this.lastHtml) {
            this.props.onChange({
                target: {
                    value: html,
                },
            });
        }
        this.lastHtml = html;
    },
});
export default ContentEditable;
