let participants = [
  {
    nome: "Marcos",
    email: "marcos@email.com",
    dataInscricao: new Date(2024, 01, 01, 21, 34),
    dataCheckIn: new Date(2024, 02, 01, 21, 34)
  },
  {
    nome: "Hiury",
    email: "hiury@email.com",
    dataInscricao: new Date(2024, 01, 28, 16, 00),
    dataCheckIn: new Date(2024, 03, 29, 21, 34)
  },
  {
    nome: "Felipe",
    email: "felipe@email.com",
    dataInscricao: new Date(2024, 03, 30, 10, 15),
    dataCheckIn: new Date(2024, 02, 30, 10, 15)
  },
  {
    nome: "João",
    email: "joao@email.com",
    dataInscricao: new Date(2024, 01, 29, 14, 20),
    dataCheckIn: new Date(2024, 02, 30, 16, 45)
  },
  {
    nome: "Maria",
    email: "maria@email.com",
    dataInscricao: new Date(2024, 03, 28, 18, 30),
    dataCheckIn: new Date(2024, 01, 29, 20, 00)
  },
  {
    nome: "Pedro",
    email: "pedro@email.com",
    dataInscricao: new Date(2024, 01, 29, 22, 05),
    dataCheckIn: new Date(2024, 02, 30, 12, 10)
  },
  {
    nome: "Sofia",
    email: "sofia@email.com",
    dataInscricao: new Date(2024, 04, 30, 08, 45),
    dataCheckIn: new Date(2024, 01, 30, 08, 45)
  },
  {
    nome: "Lucas",
    email: "lucas@email.com",
    dataInscricao: new Date(2024, 02, 31, 09, 20),
    dataCheckIn: new Date(2024, 03, 31, 09, 20)
  },
  {
    nome: "Carla",
    email: "carla@email.com",
    dataInscricao: new Date(2024, 01, 29, 17, 55),
    dataCheckIn: new Date(2024, 05, 30, 19, 30)
  },
  {
    nome: "Rafael",
    email: "rafael@email.com",
    dataInscricao: new Date(2024, 02, 30, 14, 10),
    dataCheckIn: new Date(2024, 01, 31, 18, 55)
  },
  {
    nome: "Mariana",
    email: "mariana@email.com",
    dataInscricao: new Date(2024, 02, 31, 11, 40),
    dataCheckIn: new Date(2024, 05, 31, 11, 40)
  }
];

const createParticipant = (participant) => {
  const dataInscricao = dayjs(Date.now()).to(participant.dataInscricao);
  let dataCheckIn = dayjs(Date.now()).to(participant.dataCheckIn);
  
  if (participant.dataCheckIn==null) {
    dataCheckIn = `
    <button 
      data-email="${participant.email}"
      onclick="doCheckIn(event)"
      class="check-in"
    >
      Confirmar Check-In
    </button>
    `
  }
  
  
  return `
  <tr>
    <td>
      <strong>${participant.nome}</strong>
      <br>
      <small>${participant.email}</small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>
  </tr>
  `
}

const updateParticipants = (participants) => {
  let out = ""

  for(let person of participants) {
    out += createParticipant(person)
  }

  document.querySelector("tbody").
    innerHTML = out
}
updateParticipants(participants)

const addParticipant = (event) => {
  event.preventDefault()
  
  const formData = new FormData(event.target)
  const participant = {
    nome: formData.get("name"),
    email: formData.get("email"),
    dataInscricao: new Date(),
    dataCheckIn: null
  }
  
  // Existencia de participante
  const participantExist = participants.find(
    (p) => p.email == formData.get("email")
  )

  if (participantExist) {
    alert("Email já Existe!")
    return
  }

  participants = [participant, ...participants]
  updateParticipants(participants)

  // Limpeza
  event.target.querySelector('[name="name"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const doCheckIn = (event) => {
  if (!confirm("Tem certeza que quer fazer o check-in?")){
    return
  }
  const participant = participants.find((p) => { 
    return p.email == event.target.dataset.email
  })

  participant.dataCheckIn = new Date()
  
  updateParticipants(participants)
}


updateParticipants(participants)