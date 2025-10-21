function inserirMedida(text, casaDecimal, extMedida, fontColor, fontSize) {

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

            // se for uma artboard grande, captura a escala do arquivo e altera as medidas para x10
            if (doc.scaleFactor === 10) {
                dimSelection.width *= 10
                dimSelection.height *= 10
            }
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
            var textSize = texto.textRange.characterAttributes.size
            texto.textRange.paragraphAttributes.justification = Justification.CENTER
            texto.textRange.characterAttributes.fillColor = fillColor
            texto.textRange.characterAttributes.textFont = app.textFonts.getByName("Gotham-Bold");
            texto.position = [item.position[0] - (texto.width - item.width), item.position[1] + textSize] // alinhamento a direita do objeto
            if (fontSize) {
                texto.textRange.characterAttributes.size = fontSize
            }

            // alert(texto.width)

        }

    } catch (error) {
        alert('error script: ', error)
    }
}

function convertUnit(objW, objH, unit) {
    var width = new UnitValue(objW, "pt").as(unit)
    var height = new UnitValue(objH, "pt").as(unit)

    return {
        width: width,
        height: height
    }
}

function cmyk(c, m, y, k) {
    var cmyk = new CMYKColor()
    cmyk.cyan = c
    cmyk.magenta = m
    cmyk.yellow = y
    cmyk.black = k

    return cmyk
}
// inserirMedida('teste: ', 3, 'pt', [100, 100, 0, 0])