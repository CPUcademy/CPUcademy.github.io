import { useEffect } from 'react'
import sources from '../../content/websiteData/sources.json'

type Source = { prefix?: string, label: string, url: string }
const sourcesTyped = sources as Source[]

function LicenseAndSources() {
  useEffect(() => {
    document.title = 'License & Sources'
  }, [])

  return (
    <>
      <div className="col-lg-6 mb-4">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h5 className="m-0 font-weight-bold">Terms & Conditions</h5>
          </div>
          <div className="card-body">
            <p>By using this website, you agree not to reproduce, duplicate, copy, sell, resell, or exploit any portion of the website's educational content. It shall be used only for educational purposes. Copying for profitable or commercial use is strictly forbidden. The website code itself is on the Apache License 2.0.</p>
          </div>
        </div>
      </div>
      <div className="col-lg-6 mb-4">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h5 className="m-0 font-weight-bold">Sources</h5>
          </div>
          <div className="card-body">
            <p className="noBottomMargin">Some quotes, images, and icons come from different websites:</p>
            {sourcesTyped.map((source) => (
              <p className="noBottomMargin" key={source.url + source.label + (source.prefix ?? '')}>
                {source.prefix && `${source.prefix} `}
                <a href={source.url} target="_blank" rel="noreferrer" className="link">{source.label}</a>
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default LicenseAndSources