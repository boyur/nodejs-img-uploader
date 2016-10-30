window.remove = DragDrop('.upload', {
  onDrop: function (files, pos) {
    var names = files.map(function (file) { return file.name });
    window.alert('onDrop fired! ' + files.length + ' files: ' + names.join(', '));
    window.files = files;
    console.log('onDrop', files);
    console.log('Dropped at coordinates', pos.x, pos.y);
  },
  onDropText: function (text, pos) {
    window.alert('onDropText fired! ' + text);
    window.text = text;
    console.log('onDropText', text);
    console.log('Dropped at coordinates', pos.x, pos.y);
  }
});