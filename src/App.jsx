import { useState, useEffect } from 'react'
import Header from './components/Header'
import Filtros from './components/Filtros'
import { ListadoGastos } from './components/ListadoGastos'
import Modal from './components/Modal'
import { generarId } from './helpers'
import IconoNuevoGasto from './img/nuevo-gasto.svg'


function App() {
  const [ gastos, setGastos ] = useState(
    localStorage.getItem("gastos") ? JSON.parse(localStorage.getItem("gastos")) : []
  )
 

  //INICIALIZAMOS LA CONSTANTE CON EL VALOR DE LOCAL STORAGE 
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem("presupuesto")) ?? 0
  )// useState(Number(localStorage.getItem("presupuesto")) ?? 0 );
  
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);

  const [modal, setModal] = useState(false);
  
  const [animarModal, setAnimarModal] = useState(false);
  
  const [ gastoEditar, setGastoEditar ] = useState({});

  const [ filtro , setFiltro ] = useState("")

  const [ gastosFiltro , setGastosFiltrados ] = useState([])

//ESTADO PARA EDITAR LOS DATOS DEL 
  useEffect(() =>{

    if( Object.keys(gastoEditar).length > 0 ){
      setModal(true)
    
      setTimeout( () => {
        setAnimarModal( true )
      }, 600);
    }
  }, [gastoEditar] )

//GUARDAR GASTOS EN LOCALSTORAGE

useEffect(()=>{
  localStorage.setItem("presupuesto" , presupuesto ?? 0)
}, [presupuesto])

useEffect(()=>{
  localStorage.setItem("gastos" , JSON.stringify(gastos) ?? [])
},[gastos])

useEffect(()=>{
  const presupuestoLs = Number(localStorage.getItem("presupuesto")) ?? 0 ;
  if(presupuesto > 0) {
    setIsValidPresupuesto(true)
  }
  console.log(presupuestoLs)
},[])

//FUNCION PARA LOS FILTROS

useEffect(()=>{
  if(filtro) {
    //FILTRAR GASTOS POR CATEGORIA
    const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro )
    setGastosFiltrados(gastosFiltrados)
  }
},[filtro]);

//--------------------------------------------------------------------------
//FUNCION QUE GENERA UN NUEVO GASTO
  const handleNuevoGasto = () => {
    setModal(true)
    setGastoEditar({})
    
    setTimeout( () => {
      setAnimarModal( true )
    }, 600)
  } 
  
//-----------------------------------------------------------------------------
//FUNCION QUE GUARDA LOS GASTOS
  const guardarGasto = gasto => {
    if(gasto.id){
      const gastosActualizado = gastos.map( gastoState =>gastoState.id === 
        gasto.id ? gasto : gastoState )
      setGastos( gastosActualizado );
      setGastoEditar({})
    }else{
    //NUEVO GASTO
      gasto.id = generarId();
      gasto.fecha = Date.now()
      setGastos([...gastos, gasto ])
    }
      setAnimarModal(false);
      setTimeout( () =>{
        setModal(false)
      }, 500) 
  }

  //ELIMINAR GASTOS
  const eliminarGasto = id => {
    const gastosActualizado = gastos.filter(gasto => gasto.id !== id);
    setGastos(gastosActualizado)  
  }

  return (
    <div className={modal ? "fijar" : "" }>
      <Header 
        gastos= {gastos}
        setGastos= {setGastos}
        presupuesto = {presupuesto}
        setPresupuesto = {setPresupuesto}
        isValidPresupuesto = {isValidPresupuesto}
        setIsValidPresupuesto = {setIsValidPresupuesto}
      />

      
        {isValidPresupuesto && ( 
          <>
            <main>
              <Filtros 
                filtro = {filtro}
                setFiltro = {setFiltro}/>
              
              <ListadoGastos 
                gastos={ gastos }
                setGastoEditar={ setGastoEditar }  
                eliminarGasto = { eliminarGasto }
                filtro = { filtro }
                gastosFiltro = {gastosFiltro}
              />
                
            </main>
            <div className="nuevo-gasto">
              <img 
                src={IconoNuevoGasto}
                alt="Icono nuevo gasto"
                onClick={handleNuevoGasto}
              />
            </div>
          </>
        )}

        {modal && 
          <Modal  
            setModal={setModal} 
            animarModal={animarModal}
            setAnimarModal = {setAnimarModal}  
            guardarGasto = {guardarGasto}
            gastoEditar = {gastoEditar}
            setGastoEditar = {setGastoEditar}
          />}

    </div>
  )
}

export default App
