/**
 * Created by YuQian on 3/19/2019.
 */
import React from 'react';

import BLOCKS from '../constants/Blocks.jsx'
// import INLINES from '../constants/inlines'
import Heading from './blocks/Heading.jsx';
// import CodeBlock from './blocks/CodeBlock'
// import CheckListItem from './blocks/CheckListItem'
// import LinkNode from './blocks/LinkNode'
import Image from './blocks/Image.jsx';
// import Video from './blocks/Video'
import Paragraph from './blocks/Paragraph.jsx';

// Add a `renderNode` method to render a `CodeNode` for code blocks.
const renderNode = (props, editor, next) => {
    const {
        attributes, children, node, isSelected
    } = props;
    switch (props.node.type) {
        //     case BLOCKS.CODE_BLOCK:
        //         return <CodeBlock {...props} />;
        //     case BLOCKS.CODE_LINE:
        //         return <div {...attributes}>{children}</div>;
        //     case BLOCKS.HR:
        //         return <hr {...attributes} style={isSelected ? { outline: '1px solid #17a2b8' } : null} />;
        //     case BLOCKS.UL_LIST:
        //         return <ul {...attributes}>{children}</ul>;
        //     case BLOCKS.OL_LIST:
        //         return <ol {...attributes}>{children}</ol>;
        //     case BLOCKS.LIST_ITEM:
        //         return <li {...attributes}>{children}</li>;
        //     case BLOCKS.CHECK_LIST:
        //         return <ul {...attributes}>{children}</ul>;
        //     case BLOCKS.CHECK_LIST_ITEM:
        //         return <CheckListItem {...props} />;
        //     case BLOCKS.BLOCKQUOTE:
        //         return <blockquote {...attributes}>{children}</blockquote>;
        //     case BLOCKS.TABLE:
        //         return <table><tbody {...attributes}>{children}</tbody></table>;
        //     case BLOCKS.TABLE_ROW:
        //         return <tr {...attributes}>{children}</tr>;
        //     case BLOCKS.TABLE_CELL:
        //         return <td {...attributes}>{children}</td>;
        //     case BLOCKS.IMAGE:
        //         return <Image {...props} />;
        //     case INLINES.LINK:
        //         return <LinkNode {...props} />;
        //     case BLOCKS.VIDEO:
        //         return <Video {...props} />;
        //     default:
        //         break
        case BLOCKS.PARAGRAPH:
            return <Paragraph {...props} />;
        case BLOCKS.HEADING_1:
            return <Heading {...props} />;
        case BLOCKS.HEADING_2:
            return <Heading {...props} />;
        case BLOCKS.HEADING_3:
            return <Heading {...props} />;
        case BLOCKS.HEADING_4:
            return <Heading {...props} />;
        case BLOCKS.HEADING_5:
            return <Heading {...props} />;
        case BLOCKS.HEADING_6:
            return <Heading {...props} />;
        case BLOCKS.UL_LIST:
            return <ul {...attributes}>{children}</ul>;
        case BLOCKS.OL_LIST:
            return <ol {...attributes}>{children}</ol>;
        case BLOCKS.LIST_ITEM:
            return <li {...attributes}>{children}</li>;
        case BLOCKS.IMAGE:
            return <Image {...props} />;
        default:
            return next()
    }
};
export default renderNode