export default function Meme(props) {
    return (
        <div className="container mt-5 all-memes">

            <h3 className="fw-light text-center text-lg-start mt-4 mb-0">Popular Memes</h3>
            <hr className="mt-2 mb-5" />

            <div className="row text-center text-lg-start">
                {props.memes.map((item, index) => {
                    return (
                        <div className="col-md-1 col-6" key={index}>
                            {console.log(item.fields)}
                            <a href="#" className="d-block mb-4 h-100" onClick={() => props.selectMeme(item.fields?.meme.fields.file.url)}>
                                {item.fields.meme && <img className="img-fluid img-thumbnail" src={item.fields.meme.fields.file.url} alt="" />}
                            </a>
                        </div>
                    );
                })}
            </div>

        </div>
    );
}
