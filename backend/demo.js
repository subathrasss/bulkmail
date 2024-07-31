const fileInput = document.getElementById("fileInput");

fileInput.addEventListener("change", function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(ev) {
        const buffer = ev.target.result;
        var binaryString = String.fromCharCode.apply(null, new Uint8Array(buffer));   
        const workbook = XLSX.read(binaryString, { type: "binary" });
        
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
       
        const emailList = XLSX.utils.sheet_to_json(worksheet,{header:'A'})
        console.log(emailList)

    };

    reader.readAsArrayBuffer(file); // Using readAsArrayBuffer instead of readAsBinaryString
});


// fileInput.addEventListener("change", function(event) {
//     const file = event.target.files[0];
//     const reader = new FileReader();

//     reader.onload = function(ev) {
//         const buffer = ev.target.result;
//         var binaryString = String.fromCharCode.apply(null, new Uint8Array(buffer));
//         const workbook = XLSX.read(binaryString, { type: "binary" });

//         const sheetName = workbook.SheetNames[0];
//         const worksheet = workbook.Sheets[sheetName];

//         const emailList = XLSX.utils.sheet_to_json(worksheet, { header: 'A' });
//         console.log(emailList);
//     };

//     reader.onerror = function(error) {
//         console.error("File reading error:", error);
//     };

//     reader.readAsArrayBuffer(file);
// });
