import { useEffect } from "react"

const photoNumbers = [
  1, 2, 3, 4, 5, 6, 7, 27, 10, 9, 13, 21, 23, 14, 15, 16, 17, 18, 19, 20,
  22, 24, 25, 26, 28, 29, 30, 8, 48, 31, 32, 33, 11, 12, 34, 37, 39, 40,
  41, 42, 43, 44, 46, 47, 49,
]

function PhotoGallery() {
  useEffect(() => {
    document.title = 'Photo Gallery'
  }, [])

  return (
    <>
        <div className="col-lg-12 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold">Photo Gallery</h5>
                </div>
                <div className="card-body">
                    {photoNumbers.map((number) => (
                        <img key={number} src={`/data/my_photography/${number}.jpg`} alt="Photo" className="my-photo" />
                    ))}

                    <div className="copyright text-left" style={{ marginTop: "20px", marginBottom: "8px", fontSize: "13px" }}>
                        <span>Copyright &copy; Tymoteusz Kołodziejczyk All Rights Reserved. No part of this work may be copied, reproduced, or published without permission.</span>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default PhotoGallery