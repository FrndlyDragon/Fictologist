async function send() {
    const input = document.getElementById("user-input")
    const chat = document.getElementById("chat")

    const question = input.value
    if (!question) return

    chat.innerHTML += `<div><b>You:</b> ${question}</div>`

    const res = await window.api.ask(question)

    console.log("Writing Response")
    chat.innerHTML += `
        <div>
            <b>Historian:</b> ${res.answer}<br/>
        </div>
    `

        input.value = ''
        chat.scrollTop = chat.scrollHeight
}

async function addEntry() {
    
}