/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

 export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	PERSON: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
}

import home from './pages/index'
import notFound from './pages/404'
import person from './pages/person'
import create from './pages/create'
import update from './pages/update';
import del from './pages/delete';

import { Router } from 'itty-router'
const router = Router()

// In order for the workers runtime to find the class that implements
// our Durable Object namespace, we must export it from the root module.
export { Person } from './lib/person'

// Routes
router.get('/', (request, env, context) => home())

// Get a person
router.get('/person/:id', async (request, env, context) => person(request, env, context))

// Create a person
router.post('/person/:id', async (request, env, context) => create(request, env, context))

// Update a person
router.put('/person/:id', async (request, env, context) => update(request, env, context))

// Delete a person
router.delete('/person/:id', async (request, env, context) => del(request, env, context))

router.get('*', () => notFound())

export default {
	fetch: router.handle
}