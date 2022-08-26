export function NoteVideo(props) {
    const { url } = props.note.info
    const src = url
    const currUrlId= splitUrl(url)
    
    return <iframe className="video-note" width="240" height="150"
    src={`https://www.youtube.com/embed/${currUrlId}`}>
    </iframe>


}

function splitUrl(url){
  const newUrl=  url.split('')
  const chartFirstIdx= newUrl.findIndex( chart=>chart ==='?')
  const chartSeconedIdx= newUrl.findIndex( chart=>chart ==='&')
  const urlId= newUrl.slice(chartFirstIdx+3,chartSeconedIdx).join('')
  return urlId
}