/**
 * Created by YuQian on 3/21/2019.
 */
import MARKS from '../constants/Marks.jsx'
import React from "react";

const MARK_TAGS = {
    strong: MARKS.BOLD,
    em: MARKS.ITALIC,
    u: MARKS.UNDERLINE,
    del: MARKS.STRIKETHROUGH,
    code: MARKS.CODE,
    mark: MARKS.HIGHLIGHT
};

// Add a new rule that handles marks...
const markRules = {
    deserialize(el, next) {
        const mark = MARK_TAGS[el.tagName.toLowerCase()];
        if (mark) {
            return {
                object: 'mark',
                type: mark,
                nodes: next(el.childNodes)
            }
        }
    },
    serialize(obj, children) {
        if (obj.object === 'mark') {
            switch (obj.type) {
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
            }
        }
    },
};
export default markRules