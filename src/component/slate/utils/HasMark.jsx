export function hasMark (editor, type) {
    return editor.value.activeMarks.some(mark => mark.type === type)
}