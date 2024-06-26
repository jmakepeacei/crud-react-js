import baseUrl from './UrlService';

const list = async () => {
    try {
        const response = await fetch(`${baseUrl}/pagina`);
        if (!response.ok) {
            throw new Error("Error in get response");
        }
        return await response.json();
    }
    catch (error) {
        console.log("Error in get the Data", error);
    }
};

const create = async (page) => {
    try {
        const response = await fetch(`${baseUrl}/pagina`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(page),
        });

        if (!response.ok) {
            throw new Error("Error in create response");
        }

        return await response.json();


    }
    catch (error) {
        console.log("Error in get the Data", error);
    }
};

const update = async (page) => {
    try {
        const response = await fetch(`${baseUrl}/pagina/${page.id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(page),
            }
        );

        if (!response.ok) {
            throw new Error("Error in update response");
        }

        return await response.json();
    }
    catch {
        console.log("Error in get the Data", error);
    }
};

const remove = async (id) => {
    try {
        const response = await fetch(`${baseUrl}/pagina/${id}`,
            {
                method: 'DELETE',
            }
        );

        return await response.json();
    }
    catch (error) {
        console.log("Error in get the Data", error);
    }
}

export default { list, create, update, remove };