import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MemeGenerator = () => {
      const [inputText, setInputText] = useState({
    textOne: "",
    textTwo: ""
  });
  const [randomImage, setRandomImage] = useState(
    ""
  );
  const [allMemes, setAllMemes] = useState([]);

  const fetchMeme = async() =>{   
        try{
            const { data } = await axios.get(
          "https://api.imgflip.com/get_memes"
         );
        setAllMemes(data.data.memes); 
        setRandomImage(data.data.memes[0].url)       
        console.log(data);
        } catch (error) {
        setError(error, "error");
        }
    }

  const handleChange = (e) => {
    e.preventDefault();
    setInputText({
      ...inputText,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    console.log(allMemes); //works! data displayed
    let randomNumber = Math.floor(Math.random() * allMemes.length);
    console.log(allMemes[randomNumber]); //not working! undefined
    let randomUrl = allMemes[randomNumber].url;
    setRandomImage(randomUrl);
  };

useEffect (() => {
        fetchMeme();        
    }, []);

  return (
    <div >
      
        <input
          type="text"
          name="textOne"
          placeholder="Enter Text"
          value={inputText.textOne}
          onChange={handleChange}
        />
        <input
          type="text"
          name="textTwo"
          placeholder="Enter Text"
          value={inputText.textTwo}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Random Generator</button>
      <div >
        <img src={randomImage} alt="a random meme" />
        <h2 className="top">{inputText.textOne}</h2>
        <h2 className="bottom">{inputText.textTwo}</h2>
      </div>
    </div>
  );
};

export default MemeGenerator