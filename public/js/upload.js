window.remove = DragDrop('.upload', {
  onDrop: function (files, pos) {
    var names = files.map(function (file) { return file.name });
    window.files = files;
    console.log('onDrop', files);

    $('.upload').append('<img id="theImg" src="' + files[0].fullPath +'" />');
  }
});