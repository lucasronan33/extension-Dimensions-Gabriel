document.addEventListener('DOMContentLoaded', () => {

    try {
        const cs = new CSInterface();
        const caminhoJSX = cs.getSystemPath(SystemPath.EXTENSION) + "/jsx/inserirMedida.jsx";

        // ✅ Carrega o arquivo JSX no ambiente do Illustrator assim que o painel abre
        cs.evalScript(`$.evalFile("${caminhoJSX}")`, (res) => {
        });
        const arrayButtons = [
            document.querySelector('#btn-cm-final'),
            document.querySelector('#btn-cm-print'),
            document.querySelector('.meters'),
            document.querySelector('.milimeters')
        ];
        const fontSize = document.querySelector('#fontSize')

        arrayButtons.forEach(element => {
            element.addEventListener('click', () => {

                const fontColor = element.dataset.fontcolor; // "0,100,0,0" (string)
                const text = element.dataset.text; // Ex: "Final: "
                const casas = element.dataset.casadecimal || 2;
                const unidade = element.innerText; // "cm" ou "mm"

                // Converte string em array JS de número
                const colorArray = fontColor.split(',').map(Number);

                // Monta comando seguro pro ExtendScript
                const comandoJSX = `inserirMedida("${text}", ${casas}, "${unidade}", [${colorArray.join(',')}], ${fontSize.value});`
                cs.evalScript(comandoJSX)
            });
        });
    }
    catch (error) {
        alert('error: ', error)
    }
})