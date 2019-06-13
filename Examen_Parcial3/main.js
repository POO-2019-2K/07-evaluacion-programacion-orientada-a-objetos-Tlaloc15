import Tarea from "./Tareas.js";
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
                let f = document.querySelector('#fLimite').value;
                f = f.split('-');

                let fLimite = new Date(f[0], f[1]-1, f[2]);

                let objTarea = {
                    tNombre: tNombre,
                    fLimite: fLimite,
                };

                let tarea = new Tarea(objTarea);

                Lista2.agTarea(tarea);
            }
            form.classList.add('was-validated');
        });

        var select = document.getElementById("Tipo");
           select.addEventListener("change", () => {
               var Tipo = select.value;
               if (Tipo === "Nombre") {
                   Tipo = 1;
               }else if (Tipo === "Días restantes") {
                   Tipo = 2;
               }
               console.log( Tipo)
               Lista2._admin(Tipo);
           });

    }
}
new Main();