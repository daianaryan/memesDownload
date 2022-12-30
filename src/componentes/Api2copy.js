import React, { useEffect, useState } from "react";
import html2canvas from "html2canvas";

const Api2 = (props) => {
        
    const [imgmemes, setImgmemes] = useState(0);
    const [msj1, setMsj1] = useState("");    
    const [msj2, setMsj2] = useState("");    
    
    const seleccionarImg = (e) => {
        setImgmemes(e.target.id);
        console.log(imgmemes); 
        return e.target || e.srcElement;
    }
    
    
    useEffect(() => {       
        fetch("https://api.memegen.link/templates/")
        .then(res => res.json())
        .then(data => mostrarData(data))
        .then(response =>setImgmemes(response))
        .catch(error => console.log(error))          
    }, []);

    const mostrarData = (data) =>{
       /* console.log(data)*/       
        let lista = ''                
        for (let i = 0; i<data.length; i++){
            lista += `<li onClick=${seleccionarImg()}>
                        <img src=${data[i].blank} class="imgMeme me-2">${data[i].name}
                     </li>`                                 
            }
        
        document.getElementById('data').innerHTML = lista                
    }
    
    const descargar = (e) =>{
        alert ("¿Esta seguro que quiere descargar el Meme?")

        html2canvas(document.querySelector("#meme"), {
            allowTaint: true,
            useCORS: true,
          }).then(canvas => {            
            var img = canvas.toDataURL("image/png");
            var link = document.createElement('a');            
            link.download = "Meme.png";
            link.href = img;
            link.click();            
        });
         

    }

    return(
        <div className="text-center dropdown">   
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">
                        <img src={`./memes/logoMeme.png`} alt="Logo" width="50" class="d-inline-block align-text-top rounded"/>                        
                    </a>   
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#">Generador de Meme</a>
                            </li>                  
                        </ul>      
                    </div>                 
                </div>
            </nav>                                                                               
            <div className="contenedorMeme">                  
                <figure id="meme" className="position-relative col-md-4">                                                                    
                    <img id="micanvas" src={`./memes/logoMeme.png`} alt="meme" className="figure-img img-fluid mt-3 imagenDefault p-4"/>                        
                    <p className="p1 h1 " >{msj1}</p>
                    <p className="p2 h1">{msj2}</p>                        
                </figure>                    
                <form className="row col-md-4 g-3 w-50 d-flex flex-column justify-content-center align-items-center">                
                    <h1 className='text-center'>Crea tu propio Meme</h1>
                    <hr className="w-75"></hr>
                    <button className="w-50 btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Selecciona tu Meme
                    </button>
                    <ul id='data' className="dropdown-menu navbar-example3 lista"></ul> 
                    <div className="col-md-6 d-flex">
                        <span className="input-group-text" >Texto</span>                        
                        <input className="form-control" type="text" onChange={(e) =>{setMsj1(e.target.value)}} placeholder="Pone tu frase" minlength="4" maxlength="30"/>
                    </div>                 
                    <div className="col-md-6 d-flex">
                        <span className="input-group-text" >Texto</span>                        
                        <input className="form-control" type="text" onChange={(e) =>{setMsj2(e.target.value)}} placeholder="Pone tu frase" minlength="4" maxlength="30"/>                    
                    </div>                  
                    <div className="col-12">
                        <button type="button" className="w-50 btn btn-outline-secondary" onClick={descargar} download>Descargar Meme</button>                            
                    </div>                        
                </form>
            </div>            
        </div>      

        
    );
}

export default Api2;