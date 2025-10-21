function renameArtboard() {

    var doc = app.activeDocument
    var ab = doc.artboards

    for (var i = 0; i < ab.length; i++) {
        ab[i].name = i + 1
    }

}
renameArtboard()