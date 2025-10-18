function teste() {
    var doc = app.activeDocument;
    try {
        var artboards = doc.artboards

        var left = 0
        var top = 100
        var right = 100
        var bottom = 0
        artboards.add([left, top, right, bottom])

        var canvas =



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