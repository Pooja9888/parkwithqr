var serviceWorker = {};
serviceWorker._requestPost = async (url, payload) => {
    return new Promise(async (resolve, reject) => {
        const res = await fetch(`${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });
        resolve(res.json());
    })
}

serviceWorker._requestPostToken = async (url, payload, token) => {    
    return new Promise(async (resolve, reject) => {
        const res = await fetch(`${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
           },
            body: JSON.stringify(payload)
        });
        console.log(res.status, 'Response Status'); // Log HTTP status

        const data = await res.json();                
        resolve(data);
    })
}
serviceWorker._requestPutToken = async (url, payload, token) => {
    return new Promise(async (resolve, reject) => {
        const res = await fetch(`${url}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(payload)
        });
        resolve(res.json());
    })
}
serviceWorker._requestDeleteToken = async (url, payload, token) => {
    return new Promise(async (resolve, reject) => {
        const res = await fetch(`${url}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
               'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(payload)
        });
        resolve(res.json());
    })
}

serviceWorker._requestGetToken = async (url, token) => {    
    return new Promise(async (resolve, reject) => {
        try {
            const res = await fetch(`${url}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await res.json();
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
}

export default serviceWorker;