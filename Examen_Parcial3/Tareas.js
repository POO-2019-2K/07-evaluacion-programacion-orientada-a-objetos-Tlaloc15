import Lista from "./Lista.js";

export default class Tarea{
    constructor(tareas){
        this._tNombre = tareas.tNombre;
        this._fLimite = tareas.fLimite;

          this._fLimite = new Date(tareas.fLimite);
        this._meses = [
          "Ene",
          "Feb",
          "Mar",
          "Abr",
          "May",
          "Jun",
          "Jul",
          "Ago",
          "Sep",
          "Oct",
          "Nov",
          "Dic"
      ];

    }
    get tNombre() {
        return this._tNombre;
    }
    get fLimite() {
        return this._fLimite;
    }

    _obNum2D(numero) {
        if(numero < 0) {
            return "0"+ numero;
        }

        return numero;
    }
    //_cancelEdit
    _siempreNo(fila, tareas) {
      fila.cells[0].innerHTML = tareas.num;
      fila.cells[1].innerHTML = tareas.tarea;
      fila.cells[2].innerHTML =tareas.obFLimiteS();
      fila.cells[3].innerHTML = tareas.obDia();
      this._agEditar(fila, tareas);
    }
    //_saveEdit
    _salvar(fila, tareas, newRegistros){
      let pos = this._findId(tareas.num);
      this._tareasr[pos] = newRegistros;
      localStorage.setItem('taller', JSON.stringify(this._tareas));
      this._siempreNo(fila, new Lista(newRegistros));
    }
    //_editRow
    _editar(fila, tareas) {
      let iNom = document.createElement('input');
      iNom.type = 'text';
      iNom.value = tareas.tNombre;
  
      let iFLimite = document.createElement('input');
      iFLimite.type = 'text';
      iFLimite.value = tareas.obFLimiteS;
  
      let iDia = document.createElement('input');
      iDia.type = 'date';
      iDia.value = tareas.obFLimiteS();
  
      let btnSalvar = document.createElement('input');
      btnSalvar.type = 'button';
      btnSalvar.value = 'Grabar';
      btnSalvar.className = "btn btn-success";
      btnSalvar.addEventListener('click', () => {
        let newRegistros = {
          tNombre: iNom.value,
          fLimite: iFLimite.value,
          dias: iDate.value,
         
        };
  
        this._salvar(fila, tareas, newRegistros);
      });
  
      let btnCancel = document.createElement('input');
      btnCancel.type = 'button';
      btnCancel.value = 'Cancelar';
      btnCancel.className = "btn btn-danger";
      btnCancel.addEventListener('click', () => {
        this._siempreNo(fila, tareas);
      });
  
      fila.cells[0].innerHTML = '';
      fila.cells[0].appendChild(iNom);
      fila.cells[1].innerHTML = '';
      fila.cells[1].appendChild(iFLimite);
      fila.cells[2].innerHTML = '';
      fila.cells[2].appendChild(iDia);
      fila.cells[4].innerHTML = '';
      fila.cells[4].appendChild(btnSalvar);
      fila.cells[5].innerHTML = '';
      fila.cells[5].appendChild(btnCancel);
    }
  //_addEditDeleteToRow
  _agEdQuitar(fila, tareas) {
      let btnEdit = document.createElement("input");
      btnEdit.type = "button";
      btnEdit.value = 'Editar';
      btnEdit.className = 'btn btn-success';
      btnEdit.addEventListener('click', () => {
        this._editar(fila, tareas);
      });

      let btnQuitar = document.createElement('input');
        btnQuitar.type = "button";
        btnQuitar.value = "Eliminar";
        btnQuitar.className = "btn btn-danger"
      
      fila.cells[4].innerHTML = '';
      fila.cells[4].appendChild(btnEdit);
      fila.cells[3].innerHTML = "";
      fila.cells[3].appendChild(btnQuitar);
      btnQuitar.addEventListener('click', () => {
        this._tareas.splice(tarea, 1);
              fila.innerHTML = "";
              localStorage.setItem("tarea", JSON.stringify(this._tareas));
              return;
        });
  }

    obDiasD() {
        let { fLimite } = this;
    
        let dia = fLimite.getFullYear() +
         "-" + 
         this._obNum2D(fLimite.getMonth()) +
          "-" +
          this._obNum2D(fLimite.getDay());
    
        console.log(dia);
        return dia;
      }

      obFLimiteS() {
        let dia = 
        this._fLimite.getDate() + 
        '/' + 
        this._meses[this._fLimite.getMonth()] + 
        '/' + 
        this._fLimite.getFullYear();

        return dia;
      }

      obDia() {
        let unDia = 24 * 60 * 60 * 1000;
        let diferencia = this._fLimite - new Date();
        let Dias = Math.trunc(diferencia / unDia);
        return Dias;
    }

    }