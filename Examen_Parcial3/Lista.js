import Tarea from "./Tareas.js";
export default class Lista{
    constructor(Lista, Contar){
        this._tablaLista = Lista;
        this._tablaContar = Contar;
        this._tareas = [];
        this._numTareas = 0;
       //localStorage.removeItem("tarea");
        this._tablaInicio();
    }

    _tablaInicio() {
        let lsLista = JSON.parse(localStorage.getItem('tarea'));
        if (lsLista === null) {
            return;
        }
        lsLista.forEach((f) => {

            f.fLimite = new Date(f.fLimite);

            this._agTabla(new Tarea(f));
        });
    }
    //_cancelEdit
    _siempreNo(fila, tarea) {
        fila.cells[0].innerHTML = tarea.tNombre;
        fila.cells[1].innerHTML =tarea.obDiasD();
        fila.cells[2].innerHTML = tarea.obDia();
        fila.cells[3].innerHTML = "";
        fila.cells[4].innerHTML = "";
        this._agEdQuitar(fila, tarea);
      }
      //_saveEdit
      _salvar(fila, tarea, newRegistros){
        let pos = this._buscar(tarea.tNombre);
        this._tareas[pos] = newRegistros;
        localStorage.setItem('tarea', JSON.stringify(this._tareas));
        this._siempreNo(fila, new Lista(newRegistros));
      }
      //_editRow
      _editar(fila, tarea) {
        let iNom = document.createElement('input');
        iNom.type = 'text';
        iNom.value = tarea.tNombre;
    
        let iFLimite = document.createElement('input');
        iFLimite.type = 'date';
        iFLimite.value = tarea.obDiasD();
    
        let btnSalvar = document.createElement('input');
        btnSalvar.type = 'button';
        btnSalvar.value = 'Grabar';
        btnSalvar.className = "btn btn-success";
        btnSalvar.addEventListener('click', () => {
          let newRegistros = {
            tNombre: iNom.value,
            fLimite: iFLimite.value,
           
          };
    
          this._salvar(fila, tarea, newRegistros);
        });
    
        let btnCancel = document.createElement('input');
        btnCancel.type = 'button';
        btnCancel.value = 'Cancelar';
        btnCancel.className = "btn btn-danger";
        btnCancel.addEventListener('click', () => {
          this._siempreNo(fila, tarea);
        });
    
        fila.cells[0].innerHTML = '';
        fila.cells[0].appendChild(iNom);
        fila.cells[1].innerHTML = '';
        fila.cells[1].appendChild(iFLimite);
        fila.cells[3].innerHTML = '';
        fila.cells[3].appendChild(btnSalvar);
        fila.cells[4].innerHTML = '';
        fila.cells[4].appendChild(btnCancel);
      }
      _eliminar(fila, tarea){
          for(let i=0; i < this._tareas.length; i++){
              if(tarea.tNombre === this._tareas[i].tNombre){
                  this._tareas.splice(i,1);
                  break}
              }
              fila.innerHTML= '';
              localStorage.setItem("tarea", JSON.stringify(this._tareas));
              location.reload();
              return;
      }
    _agEdQuitar(fila, tarea) {
        let btnEdit = document.createElement("input");
        btnEdit.type = "button";
        btnEdit.value = 'Editar';
        btnEdit.className = 'btn btn-success';
        btnEdit.addEventListener('click', () => {
          this._editar(fila, tarea);
        });
  
        let btnQuitar = document.createElement('input');
          btnQuitar.type = "button";
          btnQuitar.value = "Eliminar";
          btnQuitar.className = "btn btn-danger"
        
        fila.cells[3].innerHTML = '';
        fila.cells[3].appendChild(btnEdit);
        fila.cells[4].innerHTML = "";
        fila.cells[4].appendChild(btnQuitar);
        btnQuitar.addEventListener('click', () => {
          this._eliminar(fila, tarea)
          });
    }
      

    _agTabla(tarea) {
        let fila = this._tablaLista.insertRow(-1);

        let celNombre = fila.insertCell(0);
        let celFLimite = fila.insertCell(1);
        let celDia = fila.insertCell(2)
        fila.insertCell(3);
        fila.insertCell(4);

        celNombre.innerHTML = tarea.tNombre;
        celFLimite.innerHTML = tarea.obFLimiteS();
        celDia.innerHTML = tarea.obDia();
        //this._addEditDeleteToRow(fila, tarea)
        //this._quitarFila(fila, tarea);
        this._agEdQuitar(fila, tarea);
        this._numTareas++;
        this._tablaContar.rows[0].cells[1].innerHTML = this._numTareas;

       let objTarea = {
          tNombre: tarea.tNombre,
          fLimite: tarea.fLimite
         // dia: tarea.obDia(),

        };

        this._tareas.push(objTarea);
}

_admin(Tipo) {
    var orden = this._tareas.slice(-this._numTareas);
    if (Tipo === 1) {
      orden.sort(function(a, b) {
        return a.tNombre.localeCompare(b.tNombre);
      });
    }else if (Tipo === 2) {
      orden.sort(function(a, b) {
        return a.fLimite - b.fLimite;
      });
    }
    this._limpiarTo();
    localStorage.setItem("tarea", JSON.stringify(orden));
    this._tablaInicio();
  }
  _limpiarTo() {
    var i;
    console.log(this._numTareas)
    for(i = this._numTareas; i >= 1; i--) {
      this._tablaLista.deleteRow(i);
    }
    this._numTareas = 0;
  }


_alfabeticamente(a, b) {
  if (a.tarea < b.tarea) {
      return -1;
  }
  if (a.tarea > b.tarea) {
      return 1;
  }
  return 0;
}
_alfa() {
  this._actividades.sort(this._alfabeticamente);
}
mostrarAlfabeticamente() {
  this._actividades.sort(this._alfabeticamente);
  localStorage.setItem("actividades", JSON.stringify(this._actividades));
  location.reload();
}
///////////////////////////////////////////////////////////////
_numericamente(a, b) {
  if (a.final < b.final) {
      return -1;
  }
  if (a.final > b.final) {
      return 1;
  }
  return 0;
}
_num() {
  this._actividades.sort(this._numericamente);
}
mostrarNumericamente() {
  this._actividades.sort(this._numericamente);
  localStorage.setItem("actividades", JSON.stringify(this._actividades));
  location.reload();
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