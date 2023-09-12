import { useState, useEffect } from "react";

const Loading  = () =>  {
    useEffect(() => {
        console.log('useEffect')
        return () => {
            console.log('Desmontado el loading')
        }
    })
    
    return <h2>Cargando ...</h2>
}
  
export  function LoadingComponent() {
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {

        setTimeout(() => {
            setLoading(false);
        }, 3000)        
    }, []);
    
    return <>
        { loading ? <Loading /> : <h3>Productos cargardos!</h3>}
    </>;
  }

export  function TextComponent({ user = true, children  }) {    
    
    if ( !user ) {        
        return <>{alert("No puede continuar sin loguarse")}</> 
    }

  
    return (
        <>
       { alert("Esta logueado puede continuar")}
              {children}   
            </>
    )
  }

