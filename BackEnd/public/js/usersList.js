const btnModifyRol = document.getElementById("btnModifyRol");
btnModifyRol?.addEventListener("click", async (e) => {
    e.preventDefault();

    const inputModifyUserId = document.getElementById("inputModifyUserId");
    // @ts-ignore
    const valorInputModifyUser = inputModifyUserId?.value;

    try {
        const response = await fetch(`/api/users/`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: valorInputModifyUser })
        });

        if (!response.ok) {
            throw new Error('NOT-FOUND');
        }

        const ModifiedRoleAnswer = await response.json();

        if (response.ok) {
            if(response.status===203){
                alert(ModifiedRoleAnswer.message)
                location.reload()
            }else{
                location.reload()
            }
        }

    } catch (error) {
        if(error.message==="NOT-FOUND"){
            alert("El usuario ingresado no es valido")
        }
        location.reload()
    }
});
