var video = document.getElementById("Myvid");
var video2 = document.getElementById("2ndvid");

video.playbackRate = 5;
video2.playbackRate = 5;


var video = document.getElementById("Myvid");
var startTime = 1; // Set this to your desired start time in seconds
var startTime2 = 0
var endTime = 1*60+7.5;  // Set this to your desired end time in seconds

video.addEventListener('timeupdate', () => {
    if (video.currentTime >= endTime) {
        video.style =  "z-index: -1;";
        video2.play()
    }
});


const container = document.getElementById('container');

function generateDivsFromDirectory(directoryName) {
    // Clear existing divs
    container.innerHTML = '';

    // Define known files for each directory
    const knownFiles = {
        'Projects': ['project1.md', 'project2.md'],
        'Github': ['github1.md', 'github2.md'],
        'About Me': ['about1.md'],
        'Admin': ['admin1.md']
    };

    const files = knownFiles[directoryName] || [];

    if (files.length === 0) {
        container.innerHTML = '<p>No files found in this directory.</p>';
        return;
    }

    files.forEach(file => {
        const filePath = `./Assets/Markdown/${directoryName}/${file}`;
        
        fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(contents => {
                const div = document.createElement('div');
                div.className = 'generated-div';
                
                // Parse the Markdown content
                const htmlContent = marked.parse(contents || "oops, le serveur s'est trompé");
                
                // Set the innerHTML to the parsed HTML
                div.innerHTML = htmlContent;
                
                container.appendChild(div);
            })
            .catch(error => {
                console.error('Error fetching file:', error);
                const errorDiv = document.createElement('div');
                errorDiv.className = 'error-div';
                errorDiv.textContent = `Error loading ${file}: ${error.message}`;
                container.appendChild(errorDiv);
            });
    });
}

video.currentTime = startTime;
video.play();

var tab = ""

document.getElementById('Githubbutton').addEventListener('click', function() {
    generateDivsFromDirectory('Github');
});

document.getElementById('Projectsbutton').addEventListener('click', function() {
    generateDivsFromDirectory('Projects');
});

document.getElementById('Aboutmebutton').addEventListener('click', function() {
    generateDivsFromDirectory('About Me');
});

document.getElementById('Adminbutton').addEventListener('click', function() {
    generateDivsFromDirectory('Admin');
});
