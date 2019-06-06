import Tareas from "./Tareas.js";
import Lista from "./Lista.js";

class Main{
    constructor() {
        let Lista2 = new Lista(
            document.querySelector('#lista'),
            document.querySelector('#numTareas')
        );
        document.querySelector('#btnAgregar').addEventListener('click', () => {
            let form = document.querySelector('#form');

            if (form.checkValidity() === true) {
                let tNombre = document.querySelector('#tNombre').value;
                let fLimiteS = document.querySelector('#fLimite').value;
                fLimiteS = fLimiteS.split('-');

                let fLimite = new Date(fLimiteS[0], fLimiteS[1], fLimiteS[2]);

                let objTareas = {
                    nombre: tNombre,
                    fLimite: fLimite,
                };

                let tarea = new Tareas(objTareas);

                Lista2.agregarTar(tarea);
            }
            form.classList.add('was-validated');
        });

    }
}
new Main();