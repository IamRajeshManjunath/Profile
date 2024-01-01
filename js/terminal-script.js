document.addEventListener('DOMContentLoaded', function () {
    const terminalBody = document.getElementById('terminalBody');
    const commandInput = document.getElementById('commandInput');
    const loginTime = new Date();
    typeText(`Login Time: ${loginTime.toLocaleTimeString()} - ${loginTime.toLocaleDateString()}`);

    // Customizable content to be automatically inputted
    const autoInputContent = [
        'rajesh@manjunath:$',
        'rajesh@manjunath:$ Pwd',
        "/users/Rajesh/",
        'rajesh@manjunath:$ tiv Rajesh.jpg',
        'rajesh@manjunath:$ cd Rajesh/about',
        'rajesh@manjunath:$~/Rajesh/about: cat rajesh.txt',
        'Software and DevOps engineer from bangalore, india',
        'rajesh@manjunath:$~/Rajesh/about: cd mytechstack.txt',
        'rajesh@manjunath:$~/Rajesh/about/mytechstack: ls techskills.sh',
        'My technical expertise involves ',
        '  Java Rest Javascript MicroServices docker',
        ' kubernetes AWS jira jenkins SQL ',
        ' ansible Git'
    ];

    const sentenceDelay = 1000; // Adjust the delay between sentences (in milliseconds)

    // Display initial commands with typing effect
    autoInputContent.reduce((prevPromise, line) => {
        return prevPromise.then(() => {
            return new Promise((resolve) => {
                typeText(line, resolve);
            });
        }).then(() => {
            return new Promise((resolve) => {
                setTimeout(resolve, sentenceDelay);
            });
        });
    }, Promise.resolve());

    // Handle user input
    commandInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            const command = commandInput.value;
            typeText(`> ${command}`);
            processCommand(command);
            commandInput.value = ''; // Clear input
        }
    });

    // Simulate processing of commands
function processCommand(command) {
    const output = document.createElement('div');
    output.textContent = '';

    switch (command.toLowerCase()) {
        case 'pwd':
            output.textContent = "/users/Rajesh/";
            break;
        case 'tiv rajesh.jpg':
            output.textContent = 'Processing image... Image viewer opened.';
            break;
        case 'ls techskills.sh':
            output.textContent = 'techskills.sh';
            break;
        default:
            output.textContent = `Command not recognized: ${command}`;
    }

    // Display the simulated output with typing effect
    typeText(output.textContent);
}


    // Type text with a typing effect
    function typeText(text, callback) {
        const commandLine = document.createElement('div');
        commandLine.textContent = '';
        terminalBody.appendChild(commandLine);

        const cursor = document.querySelector('.cursor');

        const textArray = text.split('');
        textArray.reduce((prevPromise, char) => {
            return prevPromise.then(() => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        commandLine.textContent += char;
                        terminalBody.scrollTop = terminalBody.scrollHeight; // Auto-scroll
                        cursor.classList.toggle('visible');
                        resolve();
                    }, 20); // Adjust the delay for typing speed
                });
            });
        }, Promise.resolve()).then(() => {
            cursor.classList.remove('visible');
            const newCursor = document.createElement('div');
            newCursor.classList.add('cursor');
            newCursor.style.opacity = '1';
            terminalBody.appendChild(newCursor);
            callback();
        });
    }
});
