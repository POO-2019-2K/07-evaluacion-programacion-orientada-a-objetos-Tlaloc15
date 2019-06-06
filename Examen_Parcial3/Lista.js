import Tareas from "./Tareas.js";
export default class Lista{
    constructor(Lista, Contar){
        this._tablaLista = Lista;
        this._tablaContar = Contar;
        this._tareas = [];
        this._numTareas = 0;

        this._tabaInicio();
    }

    _tabaInicio() {
        let lsLista = JSON.parse(localStorage.getItem('lista'));
        if (lsLista === null) {
            return;
        }
        lsLista.array.forEach((f) => {

            f.fLimite = new Date(f.fLimite);

            this._agregarTa(new Tareas(f));
        });
    }

    _agTabla(tarea) {
        let fila = this._tablaLista.insertRow(-1);

        let celNombre = fila.insertCell(0);
        let celFLimite = fila.insertCell(1);

        celNombre.innerHTML = tarea.tNombre;
        celFLimite.innerHTML = tarea.obTaLimite();
        

        this._numTareas++;
        this._tablaContar.rows[0].cells[1].innerHTML = this._numTareas;

       let objTareas = {
          nombre: tarea.tNombre,
          fLimite: tarea.obTaLimite(),
          dias: tarea.dias,
        };

        this._tareas.push(objTareas);
}

_buscar(nombreTa) {
    let lugar = -1;

    this._tareas.forEach((c, index) => {
      if(c.nombreTa === nombreTa) {
        lugar = index;
        return;
      }

    });

    return lugar;
  }

  agTarea(tarea) {
    let buscar = this._buscar(tarea.nombreTa);

    if(buscar >= 0) {
      Swal.fire({
        type: "error",
        title: "Error",
        text: "La tarea ya existe"
      });
      return;
    }

    this._agTabla(tarea);
    localStorage.setItem("tarea", JSON.stringify(this._tareas));
  }
}