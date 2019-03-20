/**
 * Created by YuQian on 3/19/2019.
 */
import React from 'react';
import MARKS from '../constants/Marks.jsx';
// Add a `renderMark` method to render marks.
const renderMark = (props, editor, next) => {
    const { children, mark } = props;
    switch (mark.type) {
        case MARKS.BOLD:
            return <strong>{children}</strong>;
        case MARKS.ITALIC:
            return <em>{children}</em>;
        case MARKS.STRIKETHROUGH:
            return <del>{children}</del>;
        case MARKS.UNDERLINE:
            return <u>{children}</u>;
        case MARKS.CODE:
            return <code>{children}</code>;
        case MARKS.HIGHLIGHT:
            return <mark>{children}</mark>;
        default:
            return next()
    }
};

export default renderMark