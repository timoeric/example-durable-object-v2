import { jsonResponse } from '../lib/responses'
import { jsonResponse400 } from '../lib/responses'

const create = async (request: any, env: { PERSON: { idFromName: (arg0: string) => any; get: (arg0: any) => any; }; }, context: any) => {
    // Every unique ID refers to an individual instance of the Person class that
    // has its own state. `idFromName()` always returns the same ID when given the
    // same string as input (and called on the same class), but never the same
    // ID for two different strings (or for different classes).
    let id = env.PERSON.idFromName(request.params.id)

    // Construct the stub for the Durable Object using the ID. A stub is a
    // client object used to send messages to the Durable Object.
    let obj = env.PERSON.get(id)

    // Send a request to the Durable Object, then await its response.
    let resp = await obj.fetch(request)
    let jsonStr = await resp.json()
    // console.log(jsonStr)

    // Return the person data as json.
    let json = {
        "status": "success",
        "data": jsonStr,
        "message": "person object has been created"
    }

    return jsonResponse(JSON.stringify(json, null, 2))
}

export default create