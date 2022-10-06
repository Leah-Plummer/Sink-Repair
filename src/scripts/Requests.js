import { getRequests, fetchRequests, deleteRequest, getPlumbers, saveCompletion } from "./dataAccess.js";


export const htmlRequestList = (request) => {
    const plumbers = getPlumbers()
    
    return `<li>
    Description: ${request.description}
    <select class="plumbers" id="plumbers">
        <option value="">Choose</option>
        ${
            plumbers.map(
                plumber => {
                    return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
                }
            ).join("")
        }
    </select>
        <button class="request__delete"
                id="request--${request.id}">
            Delete
        </button>
    </li>
`
    
}

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})

mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")
            
            /*
                This object should have 3 properties
                   1. requestId
                   2. plumberId
                   3. date_created
            */
            const completion = {
                request: requestId,
                plumber: plumberId,
                date_created: Date.now()
             }

            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */
            saveCompletion(completion)
        }
    }
)


export const Requests = () => {
    const requests = getRequests()
  
    let html = `<ul>`
    html += requests.map(htmlRequestList).join("")
    html += "</ul>"
    return html   
}
// export const htmlColors = () => {
//     return `<h2>Paint Colors</h2>
//         <select id="colors">
//             <option value="0">Select a Paint Color</option>
//             ${
//                 colors.map(
//                     (color) => {
//                         return `<option value="${color.id}">${color.color}</option>`
//                     }
//                 ).join("")
//             }
//         </select>
//     `
// }