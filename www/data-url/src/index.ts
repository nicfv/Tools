const fileInput = document.getElementById('file_input') as HTMLInputElement;
const outputText = document.getElementById('output') as HTMLTextAreaElement;

fileInput.addEventListener('change', e => {
    const file: File | undefined = fileInput.files?.[0];
    const reader: FileReader = new FileReader();
    if (file) {
        reader.readAsDataURL(file);
    } else {
        alert('File not found.');
    }
    reader.addEventListener('load', () => {
        outputText.textContent = (reader.result as string);
    });
});