export default class Tareas{
    constructor(tareas){
        this._tNombre = tareas.tNombre;
        this._fLimite = tareas.fLimite;

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

    obDias() {
        let { cumple } = this;
    
        let dia = cumple.getFullYear() +
         "-" + 
         this._obNum2D(cumple.getMonth()) +
          "-" +
          this._obNum2D(cumple.getDay());
    
        console.log(dia);
        return dia;
      }

      obTaLimite() {
        let dia = 
        this._fLimite.getDate() + 
        '/' + 
        this._fLimite.getMonth() + 
        '/' + 
        this._fLimite.getFullYear();

        return dia;
      }

    }