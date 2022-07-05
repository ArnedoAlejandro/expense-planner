import { useState ,useEffect } from 'react'
//IMPORTACION DE LA GRAFICA DEL PORCENTAJE Y ESTILOS DE LA GRAFICA
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"


const ControlPresupuesto = ({
        presupuesto, 
        gastos, 
        setGastos , 
        setPresupuesto, 
        setIsValidPresupuesto}) => {
    const [ porcentaje, setPorcentaje ] = useState(0)
    const [ disonible, setDisponible ] = useState(0)
    const [ gastado, setGastado ] = useState(0)


//FUNCION QUE NOS MODIFICA EL VALOR DE LOS GASTOS

    useEffect(() =>{
    //GASTOS
        const totalGastado = gastos.reduce( (total, gasto) => gasto.cantidad + total, 0);
    //DISPONIBLE
        const totalDisponible = presupuesto - totalGastado;
    //CALCULAR GRAFICA DEL PORCENTAJE
        const nuevoPorcentaje = ( ((presupuesto - totalDisponible) / presupuesto ) * 100).toFixed(2);
    //toFixed especificamos cuantos digitos queremos en el resultado
        setDisponible(totalDisponible)
        setGastado(totalGastado)

        setTimeout(()=>{
            setPorcentaje(nuevoPorcentaje)
        },1000)
    },[gastos] )

//FUNCION PARA CONVERTIR EL VALOR DE PRESUPUESTO A VALOR DE MONEDA USD
    const formatearCantidad = (cantidad) =>{
        return  cantidad.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    }

    const handleResetApp = ()=>{
        const resultado = confirm("¿Deseas Reiniciar la aplicación?")
        if(resultado){
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)
        }else{

        }
    }

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
        <div>
            <CircularProgressbar 
                styles={buildStyles({
                    pathColor : porcentaje > 100 ? "#DC2626" :  "#3B82F6",
                    trailColor : "#F5F5F5",
                    textColor : porcentaje > 100 ? "#DC2626" :  "#3B82F6"
                })}
                value={ porcentaje }
                text={`${ porcentaje } % Gastado`}
            />  
        </div>

        <div className="contenido-presupuesto">
            <button className="reset-app" type="button" onClick={handleResetApp}>
                Resetear App</button>
            <p>
                <span>Presupuesto :</span> {formatearCantidad(presupuesto)}
            </p>
            <p className={`${disonible < 0 ? 'negativo' : ""}`}>
                <span>Disponible : </span> {formatearCantidad(disonible)}
            </p>
            <p>
                <span>Gastos :</span> {formatearCantidad(gastado)}
            </p>
        </div>
      
    
    </div>
  )
}

export default ControlPresupuesto 