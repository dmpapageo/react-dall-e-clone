import React, {useRef, useState} from 'react'
import './ImageGenerator.css'
import default_image from '../Assets/default_image.jpg'

const ImageGenerator = () => {

    const [image_url, setImageUrl] = useState("/");
    let inputRef = useRef(null);
    const [loading, setLoading] = useState(false);

    const imageGenerator = async () => {
        if (inputRef.current.value === "") {
          return 0;
        }
        setLoading(true);
        const response = await fetch(
          `https://api.openai.com/v1/images/generations`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.REACT_APP_IMAGE_GENERATOR_OPENAI_API_KEY}`,
              "User-Agent": "Chrome",
            },
            body: JSON.stringify({
              prompt: `${inputRef.current.value}`,
              n:1,
              size: "512x512"
            }),
          }
        );  

        let data = await response.json();
        console.log(data);
        let data_array = data.data;
        setImageUrl(data_array[0].url);
        setLoading(false);
    }

    return (
      <div className="ai-image-generator">
        <div className="header">AI Image <span>Generator</span></div>
        <div className="img-loading">
          <div className="image"><img src={image_url==="/"?default_image:image_url} alt="" /></div>
        <div className={loading?"loading-bar-full":"loading-bar"}></div>
        <div className={loading?"loading-text":"display-none"}>Loading...</div>
        </div>

      <div className="search-box">
      <input type="text" ref={inputRef} className='search-input' placeholder='Describe what you would like to generate'/>
        <div className="generate-btn" onClick={()=>{imageGenerator()}}>Generate</div>
        </div>
     </div>
    );
  }
  
  export default ImageGenerator;

