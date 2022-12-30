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
            <ul className="dropdown-menu" id='list'></ul>                                     
        </div>
    );
}

export default Imgmeme;
