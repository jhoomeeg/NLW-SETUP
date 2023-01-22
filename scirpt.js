const form = document.querySelector("form")
const nlwSetup = new NLWSetup(form)
const button = document.querySelector("header button")

button.addEventListener("click", add)

//função para adicionar dados
function add() {
  const today = new Date().toLocaleDateString(0, -5)
  form.addEventListener("change", save)

  const dayExists = nlwSetup.dayExists(today)
  if (dayExists) {
    alert("Dia já cadastrado!!")
    return // parar o código
  }
  alert("Dia adicionado com sucesso!")
  nlwSetup.addDay(today)
}

//função para salvar
function save() {
  localStorage.setItem("NLWSetup@habbits", JSON.stringify(nlwSetup.data) || {})
}

const data = JSON.parse(localStorage.getItem("NLWSetup@habbits"))
nlwSetup.setData(data)
nlwSetup.load()
