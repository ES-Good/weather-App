export async function city() {
    const res = await fetch (`city.json`)
    const resData = await res.json()
    return resData
}
