const form = document.querySelector("form")
const nlwSetup = new NLWSetup(form)
const button = document.querySelector("header button")

// Mova o listener de 'change' para fora da função 'add', para que seja adicionado apenas uma vez.
form.addEventListener("change", save)

button.addEventListener("click", add)

// Função para adicionar dados
function add() {
  const today = new Date().toLocaleDateString("pt-BR").slice(0, 5) // Ex: "21/07"

  // Obter o dia da semana e a data completa para a mensagem de alerta
  const currentDate = new Date()
  const optionsWeekday = { weekday: "long" } // 'long' para o nome completo do dia da semana
  const optionsDate = { day: "2-digit", month: "2-digit", year: "numeric" } // Para DD/MM/YYYY

  const weekday = currentDate.toLocaleDateString("pt-BR", optionsWeekday)
  const fullDate = currentDate.toLocaleDateString("pt-BR", optionsDate)

  const dayExists = nlwSetup.dayExists(today)
  if (dayExists) {
    alert("Dia já cadastrado!!")
    return // Parar a execução da função se o dia já existe
  }

  // Se o dia não existe, adiciona e salva
  nlwSetup.addDay(today)
  // Mensagem de alerta atualizada
  alert(`Dia ${weekday} (${fullDate}) adicionado com sucesso!`)

  save() // Chame 'save()' aqui para garantir que o dia recém-adicionado seja salvo imediatamente
}

// Função para salvar
function save() {
  localStorage.setItem("NLWSetup@habbits", JSON.stringify(nlwSetup.data))
}

// Carregar os dados salvos ao iniciar a aplicação
const data = JSON.parse(localStorage.getItem("NLWSetup@habbits")) || {}
nlwSetup.setData(data)
nlwSetup.load() // Renderiza os dias e hábitos na interface
