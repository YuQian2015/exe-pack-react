/**
 * Created by YuQian on 3/21/2019.
 */
import BLOCKS from '../constants/Blocks.jsx'
import React from "react";

const imageRules =
    {
        deserialize(el, next) {
            if (el.tagName.toLowerCase() !== 'img') return;

            const src = el.getAttribute('src');
            return {
                object: 'block',
                type: BLOCKS.IMAGE,
                isVoid: true,
                nodes: next(el.childNodes),
                data: {src}
            }
        },
        serialize(obj, children) {
            if (obj.object === 'block') {
                switch (obj.type) {
                    case 'image':
                        return <img src={obj.data.get('src')} alt="图片"/>;
                }
            }
        }
    };

export default imageRules