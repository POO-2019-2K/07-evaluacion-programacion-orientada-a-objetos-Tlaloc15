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
        this._meses[this._fLimite.getMonth()-1] + 
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