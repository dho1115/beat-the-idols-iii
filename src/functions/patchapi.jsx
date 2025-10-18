export const PatchDataAPI = (url, newData) => fetch(url, {
   method: 'PATCH',
   headers: { 'Content-Type': 'application/json' },
   body: JSON.stringify(newData)
})