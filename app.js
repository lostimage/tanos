import html2canvas from 'html2canvas';
import './style.scss';

document.addEventListener('DOMContentLoaded', function () {
    const canvasProto = document.getElementById('canvas');
    const wrapper = document.querySelector('.flex-wrapper');
    const create = (item, container) => (
        html2canvas(item).then(canvas => {

            const width = canvas.width;
            const height = canvas.height;
            const ctx = canvas.getContext('2d');

            let idata = ctx.getImageData(0, 0, width, height);

            let datum = [];

            for (let i = 0; i < 36; i++) {
                datum.push(ctx.createImageData(width, height))
            }

            for (let f = 0; f < width; f++) {
                for (let k = 0; k < height; k++) {


                    for (let j = 0; j < 2; j++) {
                        let pixel = 4 * (k * width + f);
                        let canvasNumber = Math.floor(36 * Math.random());
                        for (let p = 0; p < 4; p++) {
                            datum[canvasNumber].data[pixel + p] = idata.data[pixel + p]
                        }
                    }
                }
            }

            datum.forEach((imageData, i) => {
                let cloned = canvas.cloneNode();

                cloned.style.transition = 'all 1.6s ease-in-out';

                cloned.getContext('2d').putImageData(imageData, 0, 0);
                container.appendChild(cloned);
                item.setAttribute('style', 'opacity:0');
                setTimeout(() => {
                    const angle = (Math.random() - 0.5) * 2 * Math.PI;
                    cloned.style.transform = `rotate(${15 * Math.random()}deg) translate(${160 * Math.cos(angle)}px , ${160 * Math.sin(angle)}px)`;
                    cloned.style.opacity = '0';
                })
            })
        })
    )

    const items = document.querySelectorAll('.canvas-proto');
    items.forEach(item =>
        item.addEventListener('click', function () {
            const wrapper = this.parentElement;
            create(this, wrapper)
        })
    )
})



