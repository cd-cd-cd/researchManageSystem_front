export default function useFile () {
  const decode = (url: string, aliUrl: string) => {
    const temp = url.split(aliUrl)[1].split('-')
    return decodeURI(temp.splice(1).join(''))
  }
  return {
    decode
  }
}
