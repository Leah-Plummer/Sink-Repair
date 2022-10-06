import { fetchPlumbers, fetchRequests, fetchCompletions } from "./dataAccess.js"
import { SinkRepair } from "./SinkRepair.js"


const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("stateChanged", CustomEvent => {
    render() 
}
)

const render = () => {
    fetchRequests()
        .then(() => fetchPlumbers()) 
        .then(() => fetchCompletions())
        .then( () => {
            mainContainer.innerHTML = SinkRepair()
        }
    )
}
render()

