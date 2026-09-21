type MediaLink = { name: string, url: string, openEmailModal: () => void }

function MediaButton(item: MediaLink) {
  return (
    <div className="col-xs-6 col-sm-4 col-lg-6 col-xl-4 mb-4" key={item.name}>
        <a href={item.url} target={item.url == "" ? undefined : "_blank"} rel="noreferrer" className="link" onClick={item.url == "" ? (e) => { e.preventDefault(); item.openEmailModal() } : undefined}>
            <div className="card text-white shadow align-items-center socialmedia">
                <div className="card-body">
                    <img src={`/icons/media/${item.name}-icon.png`} alt="Icon" className="social" style={{ padding: "0px", width: "50px", height: "50px", marginTop: "0px" }} />
                </div>
            </div>
        </a>
    </div>
  )
}

export default MediaButton