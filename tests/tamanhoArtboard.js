function teste() {
    try {
        var doc = app.activeDocument;
        var abIndex = doc.artboards.getActiveArtboardIndex();
        var ab = doc.artboards[abIndex];


        var width = ab.artboardRect[2] - ab.artboardRect[0]
        // ab.artboardRect = [left, top, left + largura, top - altura];
        alert(width)

        // alert("Limite é maior que 20000 pt (modo Large Canvas)");
    } catch (e) {
        // alert("Limite é menor que 20000 pt (modo normal)");
        alert(e)
    }

}

function convertUnit(objW, objH, unit) {
    var width = new UnitValue(objW, "pt").as(unit)
    var height = new UnitValue(objH, "pt").as(unit)

    return { width: width, height: height }
}
teste()