document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link'); // Simpler selector
    const sections = document.querySelectorAll('.section');

    // Function to show the correct section with an eerie transition
    function showSection(hash) {
        sections.forEach(section => {
            section.classList.remove('active');
            if (`#${section.id}` === hash) {
                section.classList.add('active');
                playSoundEffect();
                addBloodSplatter();
            }
        });
    }

    // Initial section display on page load
    showSection(window.location.hash || '#home');

    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.target.getAttribute('href');
            window.location.hash = target;
            showSection(target);
        });
    });

    // Handle back/forward browser navigation
    window.addEventListener('hashchange', () => {
        showSection(window.location.hash);
    });

    // Play eerie sound effect
    function playSoundEffect() {
        const sound = new Audio('../assets/zombie-growl.mp3'); 
        sound.volume = 0.5;
        sound.play();
    }

    // Add blood splatter effect
    function addBloodSplatter() {
        const blood = document.createElement('img');
        blood.src = '../assets/blood-splatter.png'; 
        blood.className = 'blood-effect';
        document.body.appendChild(blood);

        setTimeout(() => {
            blood.remove();
        }, 2000);
    }
    document.addEventListener("DOMContentLoaded", function () {
        const toggleBtn = document.createElement("button");
        toggleBtn.textContent = "Toggle Dark Mode";
        toggleBtn.style.margin = "10px";
        toggleBtn.style.padding = "5px";
        toggleBtn.style.cursor = "pointer";
    
        document.body.prepend(toggleBtn);
    
        toggleBtn.addEventListener("click", function () {
            document.body.classList.toggle("dark-mode");
        });
    });
    
    // Define the dark mode styles in CSS
    
});
