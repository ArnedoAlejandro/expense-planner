import React from 'react'
import Gasto from './Gasto'

export const ListadoGastos = ({ gastos, setGastoEditar, eliminarGasto, filtro ,  gastosFiltro }) => {
  return (
    <div className="listado-gastos contenedor">

        { filtro ? (
            <>
            <h2>{gastosFiltro.length ? "Gastos" : "No hay gastos en esta categoria"}</h2>
                
                {gastosFiltro.map( gasto => ( 
                    <Gasto 
                        key={gasto.id}
                        gasto={gasto}  
                        setGastoEditar={setGastoEditar}      
                        eliminarGasto = {eliminarGasto}
                    />     
            ))}
            </>
            ) : (
            <>
            <h2>{gastos.length ? "Gastos" : "No hay gastos aún"}</h2>
                {gastos.map( gasto => ( 
                    <Gasto 
                        key={gasto.id}
                        gasto={gasto}  
                        setGastoEditar={setGastoEditar}      
                        eliminarGasto = {eliminarGasto}
                    />
                ))}
                </>
            )
            
        
        }      
        
    </div>
 )
}
