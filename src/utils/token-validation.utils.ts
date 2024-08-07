const isTokenValid = (token: string): boolean => {
    if (!token) {
        return false
    }
    const payloadBase64 = token.split('.')[1]
    const decodedJson = atob(payloadBase64)
    const decoded = JSON.parse(decodedJson)
    const exp = decoded.exp
    const now = Date.now() / 1000
    return exp > now
}

export default isTokenValid