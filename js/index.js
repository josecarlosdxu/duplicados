document.addEventListener('DOMContentLoaded', function() {
    const URL = `http://localhost:3000/codigos/`;
    const resultsContainer = document.querySelector('#results');

    const form = document.querySelector('#form');
    const barcode = document.querySelector('#barcode');

    const equivs = {
        'account_create_date': 'Creado',
        'bar_code': 'Barcode',
        'country': 'País',
        'dhl_documentation_reference': 'Ref. DHL',
        'email': 'Email',
        'first_name': 'Nombre',
        'id_kit': 'Kit Id',
        'last_name': 'Apellidos',
        'number': 'Número',
        'phone_number': 'Teléfono',
        'postal_code': 'CP',
        'received_date': 'Recibido',
        'has_results': 'Resultados',
        'street': 'Calle'
    }

    const createItems = (itemData, index) => {
        const newItemTag = document.createElement('dl');
        resultsContainer.appendChild(newItemTag);
        Object.entries(itemData).map((data) => {
            const key = data[0];
            if (!equivs[key] || !String(data[1]).length) return;
            const itemRow = document.createElement('div');
            itemRow.innerHTML = `<dt>${equivs[key]}</dt> <dd>${data[1]}<dd>`;
            newItemTag.appendChild(itemRow);
        })
    }

    const setCaption = (len) => {
        const caption = document.createElement('h3');
        caption.classList.add('caption');
        resultsContainer.appendChild(caption);
        const text = len === 1 ? 'resultado' : 'resultados';
        caption.innerHTML = `${len} ${text}`;
    }

    async function postData(url = '') {
        // Default options with  *
        const response = await fetch(url, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }

    const setQuery = (evt) => {
        const queryURL = `${URL}?bar_code=${barcode.value}`;
        resultsContainer.classList.add('is-loading');
        evt.preventDefault();
        postData(queryURL)
            .then(data => {
                resultsContainer.classList.remove('is-loading');
                resultsContainer.innerHTML = '';
                setCaption(data.length);
                if (!data.length) return;
                data.map(createItems);
            });
    }

    barcode.addEventListener('input', setQuery) ;
    barcode.addEventListener('blur', setQuery) ;
});