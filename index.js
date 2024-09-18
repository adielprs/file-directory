const fs = require('fs');
const path = require('path');

// ! Fungsi untuk menampilkan file dan folder dalam directory
function listDirectoryContents(dirPath) {
    dirPath = dirPath || __dirname;

    fs.readdir(dirPath, (err, files) => {
        if (err) {
            return console.error('Error reading directory:', err);
        }

        console.log(`\nDaftar isi directory: ${dirPath}\n`);
        
        files.forEach(file => {
            const filePath = path.join(dirPath, file);

            fs.stat(filePath, (err, stats) => {
                if (err) {
                    return console.error('Error reading file stats:', err);
                }

                if (stats.isDirectory()) {
                    console.log(`[Folder] ${file}`);
                } else if (stats.isFile()) {
                    console.log(`[File] ${file}`);
                }
            });
        });
    });
}

//! Fungsi untuk membuat directory baru
function createNewDirectory(dirPath) {
    if (!dirPath) {
        console.error('Path directory baru tidak diberikan.');
        return;
    }

    fs.mkdir(dirPath, { recursive: true }, (err) => {
        if (err) {
            return console.error('Gagal membuat directory:', err.message, err.code);
        }

        console.log(`Directory baru berhasil dibuat: ${dirPath}`);
    });
}

// ! Cek apakah user ingin membuat directory baru
const command = process.argv[2];
const directoryPath = process.argv[3];

if (command === 'list') {
    // ! List isi directory
    listDirectoryContents(directoryPath || '.');
} else if (command === 'create') {
    // ! Membuat directory baru
    const newDirPath = directoryPath || './new-folder';
} else {
    console.log('Perintah tidak dikenali. Gunakan "list" untuk melihat isi directory atau "create" untuk membuat directory baru.');
}