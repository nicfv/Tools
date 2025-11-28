const fileInput = document.getElementById('file_input') as HTMLInputElement;
const convBtn = document.getElementById('convert') as HTMLButtonElement;
const outputText = document.getElementById('output') as HTMLTextAreaElement;

fileInput.addEventListener('change', e => {
    const file: File | undefined = fileInput.files?.[0];
    const reader: FileReader = new FileReader();
    if (file) {
        reader.readAsDataURL(file);
    } else {
        alert('File not found.');
    }
    reader.addEventListener('load', e => {
        console.log(reader.result);
    });
});