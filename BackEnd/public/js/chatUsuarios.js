  // @ts-ignore
const serverSocket = io()

// @ts-ignore
Swal.fire({
    title: "Bienvenido al chat."   
})

const formChat = document.querySelector('#formChat')

const btnSend = document.querySelector('#btnSend')

if (btnSend) {
    btnSend.addEventListener('click', evento => {
      evento.preventDefault()
        const inputAutor = document.querySelector('#inputAutor')
        const inputMensaje = document.querySelector('#inputMensaje')

        if (!(inputAutor instanceof HTMLInputElement) || !(inputMensaje instanceof HTMLInputElement)) return

        const autor = inputAutor.value
        const mensaje = inputMensaje.value

        if (!autor || !mensaje) return

        serverSocket.emit('nuevoMensaje', { timestamp: Date.now(), autor, mensaje })
        inputMensaje.value=""
    })
}

const plantillaMensajes = `
{{#if hayMensajes }}
<ul>
    {{#each mensajes}}
    <li>({{this.fecha}}) {{this.autor}}: {{this.mensaje}}</li>
    {{/each}}
</ul>
{{else}}
<p>no hay mensajes...</p>
{{/if}}
`
const armarHtmlMensajes = Handlebars.compile(plantillaMensajes)

serverSocket.on('actualizarMensajes', mensajes => {
    const divMensajes = document.querySelector('#mensajes')
    if (divMensajes) {
        divMensajes.innerHTML = armarHtmlMensajes({ mensajes, hayMensajes: mensajes.length > 0 })
    }
})

serverSocket.on('nuevoUsuario', nombreUsuario => {
    // @ts-ignore
    Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        title: `"${nombreUsuario}" se ha unido al chat`,
        icon: "success"
    })
})
