const formTickets = document.getElementById("formTickets")
formTickets?.addEventListener("submit",e=>{
    e.preventDefault()
})

const btnClearAllTickets = document.getElementById("btnClearAllTickets")
btnClearAllTickets?.addEventListener("click",async()=>{

    const response = await fetch('/api/tickets/', {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('NOT-FOUND');
      }
      
      const ticketsVacios = await response.json();
              
    if (response.ok) {
      location.reload()
    }

        
})

const btnDeleteTickets = document.getElementById("btnDeleteTickets")
btnDeleteTickets?.addEventListener("click",async(e)=>{
    e.preventDefault()
 // @ts-ignore
 const inputIDTicket = document.getElementById("inputIDTickets").value

 const response = await fetch('/api/tickets/' + inputIDTicket, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
  
  if (!response.ok) {
    throw new Error('NOT-FOUND');
  }
  
  const ticketsVacios = await response.json();
          
if (response.ok) {
  location.reload()
}
})


