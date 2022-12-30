import React, { useEffect, useState } from "react";

const Imgmeme = (props) => {

    const initialUrl = 'https://api.memegen.link/templates/';

    const [imgmemes, setImgmemes] = useState(0);

    const seleccionarImg = (e) => {
        setImgmemes(e.target.value);
        console.log(imgmemes);
        return e.target || e.srcElement;
    }

    useEffect(() => {

        let option = document.getElementById('list');
        option.onclick = function (event) {
            let target = seleccionarImg(event);
            setImgmemes(parseInt(target.id));
        }
    });

    const lista = () => {
        fetch(initialUrl)
            .then(response => response.json())
            .then((json) => {
                json.forEach(element => {
                    let id = JSON.stringify(element.id);
                    let url = JSON.stringify(element.blank);
                    let lines = JSON.stringify(element.lines);
                    let item = document.createElement('li');
                    item.setAttribute('id', `${lines}`);
                    item.setAttribute('onclick', `seleccionar(${url}, ${id})`);
                    item.innerHTML = `<img src=${element.blank} id=${element.id} style="width:30px;height:30px" class="me-2"></img>${element.name}`
                    document.querySelector('.dropdown-menu').appendChild(item);
                });
            })
            .catch(error => console.log(error))
    }

    lista();

    return (
        <div className="text-center">
            <h1 className='mt-3 text-center'>Editá tu Meme</h1>            
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"> Seleccione Meme</button>
            <ul className="dropdown-menu" id='list'></ul>                         
            <figure>
                <p className="w-100 px-30 position-absolute top-50 start-30 h1 text-center"></p>
                <img src={`./memes/1.png`} alt="meme" className="figure-img img-fluid mt-3 imagenDefault" id="imagen"/>
            </figure>
        </div>
    );
}

export default Imgmeme;

/*
<select onChange={seleccionarImg} className="form-select form-select-lg mb-3 w-25 m-auto">
                <option value={1}>Futurama</option>
                <option value={2}>Bob Sponja</option>
                <option value={3}>Señora</option>
                <option value={4}>Calamardo</option>
            </select>

            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"> Seleccione Meme</button>
            <ul className="dropdown-menu" id='list'></ul>

             <select className="form-select form-select-lg mb-3 w-25 m-auto dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <option className="dropdown-menu" id='list' value={1}></option>                
            </select>
*/