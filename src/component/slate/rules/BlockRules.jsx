/**
 * Created by YuQian on 3/21/2019.
 */
import React from "react";
import BLOCKS from '../constants/Blocks.jsx'

const BLOCK_TAGS = {
    p: BLOCKS.PARAGRAPH,
    ol: BLOCKS.OL_LIST,
    ul: BLOCKS.UL_LIST,
    li: BLOCKS.LIST_ITEM,
    table: BLOCKS.TABLE,
    th: BLOCKS.TABLE_CELL,
    tr: BLOCKS.TABLE_ROW,
    td: BLOCKS.TABLE_CELL,
    hr: BLOCKS.HR,
    blockquote: BLOCKS.BLOCKQUOTE,
    h1: BLOCKS.HEADING_1,
    h2: BLOCKS.HEADING_2,
    h3: BLOCKS.HEADING_3,
    h4: BLOCKS.HEADING_4,
    h5: BLOCKS.HEADING_5,
    h6: BLOCKS.HEADING_6
};

const blockRules = {
    deserialize(el, next) {
        const block = BLOCK_TAGS[el.tagName.toLowerCase()];
        if (block) {
            return {
                object: 'block',
                type: block,
                data: {
                    className: el.getAttribute('class'),
                },
                nodes: next(el.childNodes)
            }
        }
    },
    serialize(obj, children) {
        if (obj.object === 'block') {
            switch (obj.type) {
                case BLOCK_TAGS.p:
                    return <p className={obj.data.get('className')}>{children}</p>;
                case BLOCK_TAGS.h1:
                    return <h1>{children}</h1>;
                case BLOCK_TAGS.h2:
                    return <h2>{children}</h2>;
                case BLOCK_TAGS.h3:
                    return <h3>{children}</h3>;
                case BLOCK_TAGS.h4:
                    return <h4>{children}</h4>;
                case BLOCK_TAGS.h5:
                    return <h5>{children}</h5>;
                case BLOCK_TAGS.h6:
                    return <h6>{children}</h6>;
                case BLOCKS.UL_LIST:
                    return <ul>{children}</ul>;
                case BLOCKS.OL_LIST:
                    return <ol>{children}</ol>;
                case BLOCKS.LIST_ITEM:
                    return <li>{children}</li>;
            }
        }
    }
};

export default blockRules;