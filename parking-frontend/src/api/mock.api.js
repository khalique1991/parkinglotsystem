// Simple mock that mimics the real api responses


export const login = async ({ email, password }) => {
await new Promise((r) => setTimeout(r, 400))
if (email === 'test@example.com' && password === 'password') {
return { data: { user: { id: 1, name: 'Test User', role: 'USER' }, token: 'mock-token' } }
}
const err = new Error('Invalid credentials')
err.response = { status: 401 }
throw err
}


export const me = async () => {
await new Promise((r) => setTimeout(r, 200))
return { data: { id: 1, name: 'Test User', role: 'USER' } }
}


export const getParkingLots = async () => {
await new Promise((r) => setTimeout(r, 300))
return {
data: [
{ id: 1, name: 'Lot A', spotsAvailable: 5 },
{ id: 2, name: 'Lot B', spotsAvailable: 3 },
],
}
}


export const bookSpot = async ({ spotId, userId }) => {
await new Promise((r) => setTimeout(r, 300))
return { data: { success: true } }
}