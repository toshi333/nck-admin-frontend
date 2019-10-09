export default {
  settings() {
    return {
      licenseKey: 'non-commercial-and-evaluation',
      autoColumnSize: true,
      enterBeginsEditing: false,
      rowHeights: 30,
      minRows: 3,
      stretchH: 'last',
      manualColumnResize: true,
      rowHeaders: true,
      manualRowMove: true,
      undo: true,
      redo: true,
      contextMenu: {
        items: {
          row_above: { name: '上に１行挿入' },
          row_below: { name: '下に１行挿入' },
          hsep1: '---------',
          remove_row: { name: '行を削除' },
          hsep3: '---------',
          undo: { name: '戻る' },
          redo: { name: 'やり直す' },
        },
      },
    }
  },
}
