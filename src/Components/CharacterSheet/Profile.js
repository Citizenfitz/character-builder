import React, {useState} from 'react'
import { ImageData } from "../../Data/dataProfilePics"
import Modal from "react-modal"

Modal.setAppElement("#root");
const customGalleryStyles = {
  content: {
    height: "80%",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    overflow: "hidden"
  },
};

const ProfilePic = (props) => {
  const {profilePic, onChangePic} = props
  const [isGalleryOpen, setGalleryOpen] = useState(false)
  const [images, setImages] = useState(ImageData)
  // const [selectedPic, setSelectedPic] = useState(props.profilePic)
  const openGallery = (e) => {
    setGalleryOpen(true)
  }
  const closeGallery = (e) => {
    setGalleryOpen(false)
  }
  const handleSelectImage = (e) => {
    const index = e.currentTarget.value
    setGalleryOpen(false)
    onChangePic(images[index])
  }
  return (
    <div className="profile">
      <button className="btn--openGallery noStyle" onClick={openGallery}>
        <img className="selected-profile-pic" src={`/assets/images/profiles/${profilePic}.svg`} />
      </button>
      <Modal
        id="gallery--modal"
        isOpen={isGalleryOpen}
        onRequestClose={closeGallery}
        style={customGalleryStyles}
        contentLabel="Add a note"
      >
        <h2>Select Your Avatar</h2>
        <button className="note--button-close" onClick={closeGallery}>
          x
        </button>
        <div className="gallery">
          {images.map((img,i) => (
            <button key={img} className={`noStyle gallery-item ${profilePic === img ? 'gallery-item--selected' : ''}`} value={i} onClick={handleSelectImage}>
              <img className="gallery-item--img" src={`/assets/images/profiles/${img}.svg`} />
              <div className="gallery-item--caption">{img.replace(/-/," ")}</div>
            </button>
          ))}
        </div>
      </Modal>
    </div>
  )
}

export default ProfilePic