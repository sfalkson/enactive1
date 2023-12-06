// These are references Ids in the index.html
const dalleEndpoint = 'https://api.openai.com/v1/images/generations';
const reqButton = document.getElementById('button-request');
const imgContainer = document.getElementById('image-container');
const reqStatus = document.getElementById('request-status');

reqButton.onclick = function() {
    
    reqStatus.innerHTML = "Drafting, preparing, and publishing your social story..."; // Loading state 
    const key = document.getElementById('api-key').value;
    const prompt = document.getElementById('text-prompt').value;
    const count = Number(document.getElementById('image-count').value);
    const radios = document.getElementsByName('image-size');
    
    //For loop for what radio have checks 
    let size;
    for (let i = 0; i <radios.length; i++)
    {
        if (radios[i].checked)
        {
            size = Number(radios[i].value);
            break;
        }
    }
    // Prompt properties per dall-e docuemntation 
    const reqBody = {
        prompt: prompt,
        n: count,
        size: size + "x" + size, 
        response_format: "url"
    }

   // console.log(reqBody);

   // Request parameters 
   const reqParams = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${key}`, 
    },
    body: JSON.stringify(reqBody) 
}

// Assuming 'dalleEndpoint' is defined elsewhere in your code
fetch(dalleEndpoint, reqParams)
    .then(res => res.json()) 
   // .then(json => console.log(json))
   .then(addImages)
    // Catch error, and print to status bar 
    .catch(error => reqStatus.innerHTML = error);
 
}


function addImages(jsonData)
{
    if (jsonData.error)
    {
        reqStatus.innerHTML = ' Oh no! ERROR: ' + jsonData.error.message;
        return;
    }
    reqStatus.innerHTML = " Successly generated " + jsonData.data.length + " story blocks!";

    // for loop to display all images in UI 
    for (let i = 0; i <jsonData.data.length; i++)
    {
        const imgURL = jsonData.data[i].url
        const imgNode = document.createElement('img')
        imgNode.src = imgURL;

        // images will show up on top (prepend vs. append)
        imgContainer.prepend(imgNode);

    }
}

