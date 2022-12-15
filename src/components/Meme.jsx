import { createRef, forwardRef, useImperativeHandle } from 'react'
import { toPng } from 'html-to-image';

const Meme = (props, ref) => {

    const memeRef = createRef(null)

    useImperativeHandle(ref, () => ({

        takeScreenshot() {
            toPng(memeRef.current, { cacheBust: true, style: { margin: '0' } })
                .then((dataUrl) => {
                    const link = document.createElement('a')
                    link.download = 'meme-name.png'
                    link.href = dataUrl
                    link.click()
                })
                .catch((err) => {
                    console.log(err)
                })
        }

    }));

    return (
        <div ref={memeRef} className="meme">
            <img src={props.meme.url} className="img-fluid" alt="" />
            <h2 className="meme-heading top">{props.meme.topText}</h2>
            <h2 className="meme-heading bottom">{props.meme.bottomText}</h2>
        </div>
    );
}

export default forwardRef(Meme);
