function inserirMedida(text, casaDecimal, extMedida, fontColor) {

    var doc = app.activeDocument
    var sel = doc.selection

    try {
        for (var i = 0; i < sel.length; i++) {
            var item = sel[i]

            if (item.clipped) {
                for (var j = 0; j < item.pageItems.length; j++) {
                    if (item.pageItems[j].clipping) {
                        item = item.pageItems[j]
                        break
                    }
                }

            }
            var dimSelection = convertUnit(item.width, item.height, extMedida)

            var fillColor = cmyk(
                fontColor[0],
                fontColor[1],
                fontColor[2],
                fontColor[3]
            )

            var texto = doc.textFrames.add()
            texto.contents = text +
                dimSelection.width.toFixed(casaDecimal).replace('.', ',') +
                ' x ' + dimSelection.height.toFixed(casaDecimal).replace('.', ',') +
                ' ' +
                extMedida
            texto.position = [item.position[0], item.position[1] + 15]
            texto.textRange.characterAttributes.fillColor = fillColor
            texto.textRange.characterAttributes.textFont = app.textFonts.getByName("Gotham-Bold");


        }
        
    }
    catch (error) {
        alert('error script: ',error)
    }
}

function convertUnit(objW, objH, unit) {
    var width = new UnitValue(objW, "pt").as(unit)
    var height = new UnitValue(objH, "pt").as(unit)

    return { width: width, height: height }
}
function cmyk(c, m, y, k) {
    var cmyk = new CMYKColor()
    cmyk.cyan = c
    cmyk.magenta = m
    cmyk.yellow = y
    cmyk.black = k

    return cmyk
}
