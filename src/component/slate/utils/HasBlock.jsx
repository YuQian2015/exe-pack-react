export function hasBlock (editor, type) {
    return editor.value.blocks.some(block => block.type === type)
}