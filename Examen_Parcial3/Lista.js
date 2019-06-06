import Tarea from "./Tareas.js";
export default class Lista{
    constructor(Lista, Contar){
        this._tablaLista = Lista;
        this._tablaContar = Contar;
        this._tareas = [];
        this._numTareas = 0;
        //localStorage.removeItem("tarea");
        this._tabaInicio();
    }

    _tabaInicio() {
        let lsLista = JSON.parse(localStorage.getItem('tarea'));
        if (lsLista === null) {
            return;
        }
        lsLista.forEach((f) => {

            f.fLimite = new Date(f.fLimite);

            this._agTabla(new Tarea(f));
        });
    }

    _agTabla(tarea) {
        let fila = this._tablaLista.insertRow(-1);

        let celNombre = fila.insertCell(0);
        let celFLimite = fila.insertCell(1);
        let celDia = fila.insertCell(2)

        celNombre.innerHTML = tarea.tNombre;
        celFLimite.innerHTML = tarea.obFLimiteS();
        celDia.innerHTML = tarea.obDia();
        

        this._numTareas++;
        this._tablaContar.rows[0].cells[1].innerHTML = this._numTareas;

       let objTarea = {
          tNombre: tarea.tNombre,
          fLimite: tarea.fLimite,
          dia: tarea.obDia(),
        };

        this._tareas.push(objTarea);
}

_buscar(tNombre) {
    let lugar = -1;

    this._tareas.forEach((t, index) => {
      if(t.tNombre === tNombre) {
        lugar = index;
        return;
      }

    });

    return lugar;
  }

  agTarea(tarea) {
    let buscar = this._buscar(tarea.tNombre);

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