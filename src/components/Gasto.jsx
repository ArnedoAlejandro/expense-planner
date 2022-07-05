import React from 'react';

import  { 
  LeadingActions , 
  SwipeableList , 
  SwipeableListItem , 
  SwipeAction , 
  TrailingActions , 
}  from  'react-swipeable-list' ; 
import  'react-swipeable-list/dist/styles.css' ;
import { formatearFecha } from '../helpers';
import IconosAhorro from '../img/icono_ahorro.svg';
import IconosCasa from '../img/icono_casa.svg';
import IconosComida from '../img/icono_comida.svg';
import IconosGastos from '../img/icono_gastos.svg';
import IconosPasatiempo from '../img/icono_pasatiempo.svg';
import IconosSalud from '../img/icono_salud.svg';
import IconosSuscripciones from '../img/icono_suscripciones.svg';

const diccionarioIconos = {
  ahorro : IconosAhorro ,
  comida : IconosComida,
  hogar : IconosCasa,
  comida : IconosComida,
  gastos : IconosGastos, 
  pasatiempo : IconosPasatiempo,
  salud : IconosSalud,
  suscripciones : IconosSuscripciones
}  

export const Gasto = ({gasto , setGastoEditar, eliminarGasto }) => {
  const {categoria, nombre, cantidad, id, fecha} = gasto

//FUNCION PARA COLOCAR EL GASTO EN EL ESTADO CON EL SWIPE
  const leadingActions = () =>(
      <LeadingActions>
        <SwipeAction onClick={() => setGastoEditar(gasto)}>
          Editar
        </SwipeAction>
      </LeadingActions>
    )
  
//FUNCION PARA ELIMINAR GASTO
  const trailingActions = () => (
    <TrailingActions>
        <SwipeAction onClick={() => eliminarGasto(id)}
         destructive = {true}>
          Eliminar
        </SwipeAction>
    </TrailingActions>
  )

    return (
//ENVOLVEMOS NUESTRO COMPONENTE CON LOS COMPONENTES DE LA BIBLIOTECA SWIPEABLE
    <SwipeableList>
      <SwipeableListItem
        leadingActions= {leadingActions()}
        trailingActions = {trailingActions()}
      >
        
        <div className="gasto sombra">
            <div className="contenido-gasto">
              <img 
                src={diccionarioIconos[categoria]}
                alt="Icono Gasto"
              />
                <div className="descripcion-gasto">
                    <p className="categoria">{categoria}</p>
                    <p className="nombre-gasto">{nombre}</p>
                    <p className="fecha-gasto">
                      Agredo el: {""}
                      <span>{formatearFecha(fecha)}</span>
                    </p>
                </div>
            </div>
            <p className="cantidad-gasto">${cantidad}</p>
        </div>                            
      </SwipeableListItem>
    </SwipeableList>
  )
}

export default Gasto
