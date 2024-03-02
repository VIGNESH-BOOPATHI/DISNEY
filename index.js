document.addEventListener('DOMContentLoaded', async () => {
    const charactersContainer = document.getElementById('characters');

    try {
        // Fetch data from the Disney API
        const response = await fetch('https://api.disneyapi.dev/character');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        } else {
            // If the response is successful, parse the JSON data
            const data = await response.json();
            // Display characters on the webpage
            displayCharacters(data);
        }
    } catch (error) {
        // Handle errors if fetching data fails
        console.error('There was a problem fetching the data:', error);
    }

    // Function to display character cards on the webpage
    function displayCharacters(data) {
        // Check if the received data is valid
        if (typeof data === 'object' && data !== null) {
            // Loop through each key in the data object
            for (let key in data) {
                // Check if the value corresponding to the key is an array of characters
                if (Array.isArray(data[key])) {
                    // Iterate over each character in the array
                    data[key].forEach(character => {
                        // Create a character card element
                        const characterCard = createCharacterCard(character);
                        // Append the character card to the characters container
                        charactersContainer.appendChild(characterCard);
                    });
                }
            }
        } else {
            // Log an error if the data format is invalid
            console.error('Invalid data format:', data);
        }
    }

    // Function to create a character card element
    function createCharacterCard(character) {
        // Create a container for the character card
        const cardContainer = document.createElement('div');
        cardContainer.classList.add('character-card-container', 'col-md-4', 'mb-4');
    
        // Create the card element
        const card = document.createElement('div');
        card.classList.add('card', 'h-100');
    
        // Create an image element for the character's image
        const cardImage = document.createElement('img');
        cardImage.classList.add('card-img-top');
        // Set the image source and alt text
        if (character.imageUrl) {
            cardImage.src = character.imageUrl;
            cardImage.alt = character.name;
        } else {
            // Use a placeholder image or provide empty alt text for characters with no image
            cardImage.src = 'placeholder.jpg';
            cardImage.alt = 'No Image';
        }
    
        // Create a card body element to contain character information
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body', 'd-flex', 'flex-column');
    
        // Create a heading for the character's name
        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = `Name: ${character.name}`;
    
        // Create a paragraph element for the character's movies
        const movieText = document.createElement('p');
        movieText.classList.add('card-text', 'flex-grow-1');
        // Display the character's movies or a message if no movies are available
        movieText.textContent = `Movie: ${character.films.length > 0 ? character.films.join(', ') : 'No movies'}`;
    
        // Create a paragraph element for the character's TV shows
        const tvShowText = document.createElement('p');
        tvShowText.classList.add('card-text', 'flex-grow-1');
        // Display the character's TV shows or a message if no TV shows are available
        tvShowText.textContent = `TV show: ${character.tvShows.length > 0 ? character.tvShows.join(', ') : 'No TV shows'}`;
    
        // Append elements to the card body
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(movieText);
        cardBody.appendChild(tvShowText);
    
        // Append elements to the card
        card.appendChild(cardImage);
        card.appendChild(cardBody);
    
        // Append the card to the card container
        cardContainer.appendChild(card);
    
        // Return the character card container
        return cardContainer;
    }
});
