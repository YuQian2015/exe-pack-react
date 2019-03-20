/**
 * Created by YuQian on 3/19/2019.
 */
import React from 'react';

import Bold from './icons/Bold.jsx'
import Italic from "./icons/Italic.jsx";
import Underline from "./icons/Underline.jsx";
import Strikethrough from "./icons/Strikethrough.jsx";
import Highlight from "./icons/Highlight.jsx";
import Code from "./icons/Code.jsx";
import Heading from "./icons/Heading.jsx";
import Image from "./icons/Image.jsx";



export default class Navbar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {editor, onChange} = this.props;
        return <div>
            <Bold onChange={onChange} editor={editor} />
            <Italic onChange={onChange} editor={editor} />
            <Highlight onChange={onChange} editor={editor} />
            <Strikethrough onChange={onChange} editor={editor} />
            <Underline onChange={onChange} editor={editor} />
            <Code onChange={onChange} editor={editor} />

            <Heading level={1} onChange={onChange} editor={editor} />
            <Heading level={2} onChange={onChange} editor={editor} />
            <Heading level={3} onChange={onChange} editor={editor} />
            <Heading level={4} onChange={onChange} editor={editor} />
            <Heading level={5} onChange={onChange} editor={editor} />
            <Heading level={6} onChange={onChange} editor={editor} />

            <Image onChange={onChange} editor={editor} />
        </div>
    }
};

