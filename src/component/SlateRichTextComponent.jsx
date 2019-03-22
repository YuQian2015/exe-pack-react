/**
 * Created by YuQian on 3/18/2019.
 */
import React from 'react';
import { Editor } from 'slate-react';
import { Block, Value } from 'slate';

import initialData from './slate/initialData.json';
import schema from './slate/schema/Index.jsx'

import renderMark from './slate/renderer/RenderMark.jsx';
import renderNode from './slate/renderer/RenderNode.jsx';


import Navbar from './slate/Navbar.jsx';

function MarkHotkey(options) {
    // Grab our options from the ones passed in.
    const { type, key } = options

    // Return our "plugin" object, containing the `onKeyDown` handler.
    return {
        onKeyDown(event, editor, next) {
            // If it doesn't match our `key`, let other plugins handle it.
            if (!event.ctrlKey || event.key != key) return next()

            // Prevent the default characters from being inserted.
            event.preventDefault()

            // Toggle the mark `type`.
            editor.toggleMark(type)
        },
    }
}

// Initialize our bold-mark-adding plugin.
const plugins = [
    MarkHotkey({ key: 'b', type: 'bold' }),
    MarkHotkey({ key: '`', type: 'code' }),
    MarkHotkey({ key: 'i', type: 'italic' }),
    MarkHotkey({ key: '~', type: 'strikethrough' }),
    MarkHotkey({ key: 'u', type: 'underline' }),
];

// Update the initial content to be pulled from Local Storage if it exists.
const existingValue = JSON.parse(localStorage.getItem('content'));
// 构建初始状态…
const initialValue = Value.fromJSON(existingValue || initialData);


export default class SlateRichTextComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: initialValue
        };
        this.onChange = this.onChange.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.renderEditor = this.renderEditor.bind(this);
    }

    // 发生变更时，使用新的编辑器状态更新应用的 React 状态。
    onChange({value}) {
        // Check to see if the document has changed before saving.
        if (value.document !== this.state.value.document) {
            const content = JSON.stringify(value.toJSON());
            localStorage.setItem('content', content)
        }

        this.setState({ value })
    }

    // Define a new handler which prints the key that was pressed.
    onKeyDown(event, editor, next){

        if (!event.ctrlKey) return next()

        // Decide what to do based on the key code...
        switch (event.key) {
            // When "B" is pressed, add a "bold" mark to the text.
            case 'b': {
                event.preventDefault()
                editor.addMark('bold')
                break
            }
            // When "`" is pressed, keep our existing code block logic.
            case '`': {
                const isCode = editor.value.blocks.some(block => block.type == 'code')
                event.preventDefault()
                editor.setBlocks(isCode ? 'paragraph' : 'code')
                break
            }
            // Otherwise, let other plugins handle it.
            default: {
                return next()
            }
        }
    }

    renderEditor(props, editor, next) {
        const children = next();
        return (
            <div>
                <div className="toolbar-container">
                    <Navbar editor={editor} onChange={value => this.onChange(value)} />
                </div>
                <div className="input-container">
                    <div className="input-area">
                        {children}
                    </div>
                </div>
            </div>
        )
    }
    render() {
        const { value } = this.state;
        return  <div className="SlateRichTextComponent">
            <Editor
                value={value}
                onChange={this.onChange}
                placeholder="请输入内容"
                plugins={plugins}
                schema={schema}
                renderNode={renderNode}
                renderMark={renderMark}
                renderEditor={this.renderEditor}
            />
        </div>
    }

}
