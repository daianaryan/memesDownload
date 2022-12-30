import React, { useEffect, useState } from "react";
import html2canvas from "html2canvas";

const Api2 = (props) => {
        
    const [imgmemes, setImgmemes] = useState(0);
    const [msj1, setMsj1] = useState("");    
    const [msj2, setMsj2] = useState("");      
    
    const seleccionarImg = (e) => {
        setImgmemes(e.target.value);
        console.log(imgmemes); 
        return e.target || e.srcElement;
    }        
    
    useEffect(() => {       
       /*
        fetch("https://api.memegen.link/templates/")
        .then(res => res.json())
        .then(data => mostrarData(data))
        .then(response =>setImgmemes(response))
        .catch(error => console.log(error)) 
       */  

        let option = document.getElementById('list');
        option.onclick = function (event) {
            let target = seleccionarImg(event);
            setImgmemes(parseInt(target.id));
        }
        
    });    

    const lista = () => {
        fetch('https://api.memegen.link/templates/')
            .then(response => response.json())
            .then((json) => {
                json.forEach(data => {
                    let id = JSON.stringify(data.id);
                    let url = JSON.stringify(data.blank);
                    let lines = JSON.stringify(data.lines);
                    let item = document.createElement('li');
                    item.setAttribute('id', `${lines}`);
                    item.setAttribute('onclick', `seleccionar(${url}, ${id})`);
                    item.innerHTML = `<img src=${data.blank} id=${data.id} style="width:30px;height:30px" class="me-2"></img>${data.name}`
                    document.querySelector('.dropdown-menu').appendChild(item);
                });
            })
            .catch(error => console.log(error))
    }

    lista();
    
    /* ------ DESCARGAR IMAGEN ------ */
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
     
    /* ------ SELECCION DE FUENTE ------ */
    /* ------ Parrafo 1 ------ */
    function setFuente(e){        
    
        var parrafo = document.getElementById('parrafo');                               

        switch (e) {        
            case "poppins":      return parrafo.style.fontFamily = "Poppins";
            case "roboto":       return parrafo.style.fontFamily = "Roboto";
            case "inspiration":  return parrafo.style.fontFamily = "Inspiration";
            case "oswald":       return parrafo.style.fontFamily = "Oswald";
            case "smokum":       return parrafo.style.fontFamily = "Smokum";
            default:             return parrafo.style.fontFamily = "impact";
        }
    }

     /* ------ SELECCION DE FUENTE ------ */
    /* ------ Parrafo 2 ------ */
    function setFuente2(e){        
    
        var parrafo2 = document.getElementById('parrafo2');                               

        switch (e) {        
            case "poppins":      return parrafo2.style.fontFamily = "Poppins";
            case "roboto":       return parrafo2.style.fontFamily = "Roboto";
            case "inspiration":  return parrafo2.style.fontFamily = "Inspiration";
            case "oswald":       return parrafo2.style.fontFamily = "Oswald";
            case "smokum":       return parrafo2.style.fontFamily = "Smokum";
            default:             return parrafo2.style.fontFamily = "impact";
        }
    }

    /* ------ SELECCION DE COLORES ------ */
    /* ------ Parrafo 1 ------ */
    function setColores(e){
        console.log(e)

        var parrafo = document.getElementById("parrafo");

        switch (e) {        
            case "red":   return parrafo.style.color = "#FF0000";
            case "green": return parrafo.style.color = "#00FF00";
            case "blue":  return parrafo.style.color = "#0000FF";
            default:      return parrafo.style.color = "#ffff";
        }
    } 
    
    /* ------ SELECCION DE COLORES ------ */
    /* ------ Parrafo 2 ------ */
    function setColores2(e){
        console.log(e)

        var parrafo2 = document.getElementById("parrafo2");

        switch (e) {        
            case "red":   return parrafo2.style.color = "#FF0000";
            case "green": return parrafo2.style.color = "#00FF00";
            case "blue":  return parrafo2.style.color = "#0000FF";
            default:      return parrafo2.style.color = "#ffff";
        }
    }  


    return(
        <div id="div" className="text-center dropdown w-100">   
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img src={`./memes/logoMeme.png`} alt="Logo" width="50" className="d-inline-block align-text-top rounded"/>                        
                    </a>   
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Generador de Meme</a>
                            </li>                  
                        </ul>      
                    </div>                 
                </div>
            </nav>                                                                               
            <div className="contenedorMeme">                  
                <figure  className="w-25 position-relative col-md-4 d-block">                                                                                        
                    <div id="meme">
                        <img id="micanvas" src={`./memes/logoMeme.png`} alt="meme" className="figure-img img-fluid mt-3 imagenDefault p-4"/>
                        <p id="parrafo" className="p1 h1 parrafo">{msj1}</p>
                        <p id="parrafo2" className="p2 h1 parrafo2 mb-5">{msj2}</p>                                                            
                    </div>                    
                    <div className="col-12">
                        <button type="button" className="w-75 btn btn-secondary mt-4 mb-4" onClick={descargar} download>Descarga tu Meme</button>
                    </div>  
                </figure>                                      
                <form className="row col-md-4 g-3 w-50 d-flex flex-column justify-content-center align-items-center">                
                    <h1 className='text-center'>Crea tu propio Meme</h1>
                    <hr className="w-75"></hr>
                    <button className="w-75 btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Selecciona tu Meme
                    </button>
                    <ul id='list' className="dropdown-menu navbar-example3 lista"></ul> 
                    <div className="w-75 border">
                        <div className="col-md-12 d-flex mb-4 mt-4">
                            <span className="input-group-text">Texto</span>                        
                            <input className="form-control" type="text" onChange={(e) =>{setMsj1(e.target.value)}} placeholder="Pone tu frase"/>
                        </div>                          
                        <div className="d-flex justify-content-center mb-4">   
                            <select id='dropdown' className="p-2 me-2 btn btn-outline-secondary" onChange={e => setFuente(e.target.value)}>
                                <option value='default'>Fuente</option>
                                <option value="poppins">Poppins Sans-Serif</option>
                                <option value="roboto">Roboto</option>
                                <option value="inspiration">Inspiration</option>
                                <option value="oswald">Oswald</option>
                                <option value="smokum">Smokum</option>                            
                            </select>                                                           
                            <div class="form-check">                                    
                                <div className="d-flex">
                                    <div className="d-block me-3 p-2">
                                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="red" onChange={e => setColores(e.target.value)}/>
                                        <label class="form-check-label" for="flexRadioDefault2">Rojo</label>
                                    </div>
                                    <div className="d-block me-3 p-2">
                                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="blue" onChange={e => setColores(e.target.value)}/>
                                        <label class="form-check-label" for="flexRadioDefault2">Azul</label>
                                    </div>
                                    <div className="d-block me-3 p-2">
                                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="green" onChange={e => setColores(e.target.value)}/>
                                        <label class="form-check-label" for="flexRadioDefault2">Verde</label>
                                    </div>
                                </div>
                            </div>                                                                          
                        </div>                                                                       
                    </div>          

                    <div className="w-75 border">
                        <div className="col-md-12 d-flex mb-4 mt-4">
                            <span className="input-group-text">Texto</span>                        
                            <input className="form-control" type="text" onChange={(e) =>{setMsj2(e.target.value)}} placeholder="Pone tu frase"/>              
                        </div> 
                        <div className="d-flex justify-content-center mb-4">   
                            <select id='dropdown' className="p-2 me-2 btn btn-outline-secondary dropdown-toggle" onChange={e => setFuente2(e.target.value)}>
                                <option value='default'>Fuente</option>
                                <option value="poppins">Poppins Sans-Serif</option>
                                <option value="roboto">Roboto</option>
                                <option value="inspiration">Inspiration</option>
                                <option value="oswald">Oswald</option>
                                <option value="smokum">Smokum</option>                            
                            </select>                                
                            <div class="form-check">                                    
                                <div className="d-flex">
                                    <div className="d-block me-3 p-2">
                                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="red" onChange={e => setColores2(e.target.value)}/>
                                        <label class="form-check-label" for="flexRadioDefault2">Rojo</label>
                                    </div>
                                    <div className="d-block me-3 p-2">
                                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="blue" onChange={e => setColores2(e.target.value)}/>
                                        <label class="form-check-label" for="flexRadioDefault2">Azul</label>
                                    </div>
                                    <div className="d-block me-3 p-2">
                                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="green" onChange={e => setColores2(e.target.value)}/>
                                        <label class="form-check-label" for="flexRadioDefault2">Verde</label>
                                    </div>
                                </div>
                            </div>                                                                          
                        </div>
                    </div>       
                                                                                                                                  
                </form>
            </div>               
        </div>      
        
    );
}

export default Api2;