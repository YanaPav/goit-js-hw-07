import { galleryItems } from './gallery-items.js';
// Change code below this line

// console.log(galleryItems);

const gallery = document.querySelector('.gallery')

const gallerySet = makeGallerySet(galleryItems)
gallery.insertAdjacentHTML('beforeend', gallerySet)

gallery.addEventListener('click', onGalleryImgClick)


function makeGallerySet(galleryItems) {
    return galleryItems.map(({ preview, original, description }) => {
        return `<div class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
                />
            </a>
        </div>`
    }).join('')

}

function onGalleryImgClick(event) {
    event.preventDefault()
    const image = event.target

    if (!image.classList.contains('gallery__image')) {
        return
    }
    

    showImage(image.dataset.source)  

       
}

function showImage(url) {
    const instance = basicLightbox.create(`
        <img src="${url}" width="800" height="600"/>
    `, {
        onShow: () => {
            window.addEventListener('keydown', onEscDown)
        },
        onClose: () => {
            window.removeEventListener('keydown', onEscDown)
        }
    })

    instance.show()

    function onEscDown(event) {
        event.code === 'Escape' && instance.close()
    }   
}



