document.addEventListener('DOMContentLoaded', function() {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const form = document.querySelector('form');
    const spinner = document.getElementById('spinner');
    const buttonText = document.getElementById('buttonText');
    const submitBtn = document.getElementById('submitBtn');

    // Hide button initially
    submitBtn.classList.add('hidden');

    // Handle drag and drop
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, unhighlight, false);
    });

    function highlight() {
        dropZone.classList.add('pulse');
    }

    function unhighlight() {
        dropZone.classList.remove('pulse');
    }

    dropZone.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        fileInput.files = files;
        showButton();
    }

    // Show submit button when image selected
    function showButton() {
        submitBtn.classList.remove('hidden');
    }

    // Handle form submission
    form.addEventListener('submit', function() {
        spinner.classList.remove('hidden');
        spinner.classList.add('animate-spin');
        buttonText.textContent = 'Processing...';
    });

    // Show file name when selected & reveal button
    fileInput.addEventListener('change', function() {
        if (this.files.length > 0) {
            const fileName = this.files[0].name;
            const label = dropZone.querySelector('p:first-of-type');
            label.textContent = fileName;
            dropZone.querySelector('p:last-of-type').textContent = 'Click to change';
            showButton();
        }
    });
});
