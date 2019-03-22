/**
 * Created by YuQian on 3/21/2019.
 */
import { Block } from 'slate'
import BLOCKS from '../constants/Blocks.jsx'

// const schema = {
//     document: {
//         last: { types: ['paragraph'] },
//         normalize: (change, reason, { node }) => {
//             switch (reason) {
//                 case LAST_CHILD_TYPE_INVALID: {
//                     const paragraph = Block.create(BLOCKS.PARAGRAPH)
//                     return change.insertNodeByKey(node.key, node.nodes.size, paragraph)
//                 }
//                 default:
//                     break
//             }
//         }
//     }
// }

const schema = {
    document: {
        last: { type: 'paragraph' },
        normalize: (editor, { code, node, child }) => {
            switch (code) {
                case 'last_child_type_invalid': {
                    const paragraph = Block.create(BLOCKS.PARAGRAPH);
                    return editor.insertNodeByKey(node.key, node.nodes.size, paragraph)
                }
            }
        },
    },
    blocks: {
        image: {
            isVoid: true,
        },
    },
};


export default schema