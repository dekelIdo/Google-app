export function NoteVideo(props) {
    const { url } = props.note.info
    const src = url
    const currUrlId= splitUrl(url)
    console.log('currUrlId',currUrlId)
    
    return <iframe width="200" height="200"
    src={`https://www.youtube.com/embed/${currUrlId}`}>
    </iframe>


}

function splitUrl(url){
  const newUrl=  url.split('')
  const chartFirstIdx= newUrl.findIndex( chart=>chart ==='?')
  const chartSeconedIdx= newUrl.findIndex( chart=>chart ==='&')
  console.log('newUrl',chartFirstIdx,chartSeconedIdx);
  const urlId= newUrl.slice(chartFirstIdx+3,chartSeconedIdx).join('')
  return urlId
}