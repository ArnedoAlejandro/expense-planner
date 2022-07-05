import { useState, useEffect } from 'react'
import Mensaje from './Mensaje'
import CerrarBtn from '../img/cerrar.svg'

const Modal= ({
    setModal,
    animarModal,
    setAnimarModal,
    guardarGasto,
    gastoEditar,
    setGastoEditar,
}) => {

    const [ mensaje, setMensaje ] = useState("") 
    const [ nombre, setNombre ] = useState("")
    const [ cantidad, setCantidad ] = useState("")
    const [ categoria, setCategoria ] = useState("")
    const [fecha,  setFecha ] = useState("")
    const [ id, setId ] = useState("")

//FUNCION QUE NOS IMPRIME LOS VALORES EN EL FORMULARIO PARA EDITARLOS
    useEffect( () => {
        if( Object.keys(gastoEditar).length > 0 ){
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setId(gastoEditar.id)
            setFecha(gastoEditar.fecha)
          }
    },[]);

//FUNCION QUE GENERA EL EVENTO SUBMIT
    const handleSubmit = (e) =>{
        e.preventDefault()
       if([ nombre, cantidad, categoria ].includes("")){
        setMensaje("Todos los campos son obligatorios")
        setTimeout(() => {
            setMensaje("")
        }, 3000 )
        return
        
        }
        guardarGasto({nombre, cantidad, categoria, id, fecha})
    }

//FUNCION QUE OCULTA LA VENTANA MODAL 
    const ocultarModal = () => {   
        setAnimarModal(false);
        setGastoEditar({})
        setTimeout( () =>{
            setModal(false)
        }, 500)    
        
    }

  return (
    <div className='modal'>
        <div className="cerrar-modal">
            <img src={CerrarBtn} alt="Cerrar Modal" onClick={ocultarModal} />
            
        </div>
        <form 
            onSubmit={handleSubmit}
            className={`formulario ${animarModal ? "animar" : "cerrar"}`}  >
            <legend className='formulario'>
                { gastoEditar.nombre ? "Editar gasto" : "Nuevo Gasto"}
            </legend>
            {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

            <div className="campo">
                <label htmlFor="nombre">Nombre</label>
                <input 
                    id="nombre"
                    type="text"
                    placeholder='Introduce tu Nombre'
                    value={nombre}
                    onChange={ e => setNombre(e.target.value ) }

                />
            </div>
            
            <div className="campo">
                <label htmlFor="cantidad">Cantidad</label>
                <input 
                    id="nombre"
                    type="number"
                    placeholder='Añade el gasto'
                    value={cantidad}
                    onChange={ e => setCantidad( Number( e.target.value ))}

                />
            </div>

            <div className="campo">
                <label htmlFor="categoria">Categoria</label>
                
                <select id="categoria"
                        value= {categoria}
                        onChange ={ e => setCategoria(e.target.value)}
                >
                    <option value="">-- Selecione --</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="hogar">Hogar</option>
                    <option value="comida">Comida</option>
                    <option value="gastos">Gastos extraordinarios</option>
                    <option value="pasatiempo">Pasatiempo</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">Suscripciones</option>
                </select>
                <input 
                    type="submit" 
                    value={ gastoEditar.nombre ? "Guardar cambios" : "Añadir Gasto"}
                />
            </div>
          </form>
 
    </div>
  )
}
 
export default Modal