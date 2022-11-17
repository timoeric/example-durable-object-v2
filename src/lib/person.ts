// Durable Object
export class Person {
    state: any
    id: number
    fname: string
    lname: string
    age: number
    constructor(state: any, env: any) {
        this.state = state
        this.id = 0
        this.fname = ''
        this.lname = ''
        this.age = 0
    }

    // Get all person attributes
    getAll() {
        return {
            "id": this.id,
            "fname": this.fname,
            "lname": this.lname,
            "age": this.age
        }
    }

    // POST method logic - Set all person attributes
    setAll(data: any) {
        this.setId(data)
        this.setFname(data)
        this.setLname(data)
        this.setAge(data)
    }

    // PUT method logic - Update some person attributes
    update(data: any) {
        if (data.id) {
            this.setId(data)
        }
        if (data.fname) {
            this.setFname(data)
        }
        if (data.lname) {
            this.setLname(data)
        }
        if (data.age) {
            this.setAge(data)
        }
    }

    // DELETE method logic - Set the person attributes back to constructor values
    resetAll() {
        this.id = 0
        this.fname = ''
        this.lname = ''
        this.age = 0
    }

    // Set the person id
    setId(data: any) {
        this.id = Number(data.id)
    }

    // Set the person first name
    setFname(data: any) {
        this.fname = data.fname
    }

    // Set the person last name
    setLname(data: any) {
        this.lname = data.lname
    }

    // Set the person age
    setAge(data: any) {
        this.age = Number(data.age)
    }

    // Handle HTTP requests from clients.
    async fetch(request: Request) {
        // Durable Object storage is automatically cached in-memory, so reading the
        // same key every request is fast. (That said, you could also store the
        // value in a class member if you prefer.)
        let value = await this.state.storage.get("value") || 0
        let data: object

        switch (request.method) {
            case "GET":
                value = this.getAll()
                
                break;
            case "POST":
                // Get the body data from the request
                data = await request.json?.()
                this.setAll(data)
                value = this.getAll()

                // We don't have to worry about a concurrent request having modified the
                // value in storage because "input gates" will automatically protect against
                // unwanted concurrency. So, read-modify-write is safe. For more details,
                // see: https://blog.cloudflare.com/durable-objects-easy-fast-correct-choose-three/
                await this.state.storage.put("value", value)
                
                break;
            case "PUT":
                // Get the body data from the request
                data = await request.json?.()
                this.update(data)
                value = this.getAll()

                await this.state.storage.put("value", value)
                
                break;
            case "DELETE":
                // https://developers.cloudflare.com/workers/runtime-apis/durable-objects/#transactional-storage-api
                this.resetAll()
                await this.state.storage.deleteAll()
                
                break;
            default:
                return new Response("Not found", { status: 404 });
        }
        return new Response(JSON.stringify(value))
    }
}
