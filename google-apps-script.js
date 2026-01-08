
/**
 * GOOGLE APPS SCRIPT BACKEND (UPDATED)
 * 
 * Instruksi Setup:
 * 1. Buka Google Sheets yang ingin digunakan.
 * 2. Klik Extensions > Apps Script.
 * 3. Hapus kode yang ada, ganti dengan kode di bawah ini.
 * 4. Klik "Deploy" > "New Deployment".
 * 5. Pilih Type: "Web App".
 * 6. Set "Execute as": "Me".
 * 7. Set "Who has access": "Anyone".
 * 8. Pastikan API Drive diaktifkan di Apps Script (Services > Drive API).
 */

function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Header (jika sheet masih kosong)
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp", 
        "Nama Bisnis", 
        "Kategori", 
        "Deskripsi", 
        "Berdiri Sejak", 
        "Alamat", 
        "Kota", 
        "Telepon", 
        "Instagram", 
        "Facebook", 
        "LinkedIn", 
        "Website", 
        "Jam Operasional", 
        "Wilayah", 
        "File ZIP Link"
      ]);
      sheet.getRange(1, 1, 1, 15).setFontWeight("bold").setBackground("#f3f3f3");
    }

    var fileUrl = "-";
    
    // Handle ZIP upload to Google Drive
    if (data.zipFile && data.zipFile.includes("base64")) {
      try {
        var folder = DriveApp.getFileById(ss.getId()).getParents().next();
        var base64Data = data.zipFile.split(',')[1];
        var fileBlob = Utilities.newBlob(Utilities.base64Decode(base64Data), 'application/zip', data.zipFileName || (data.businessName + "_photos.zip"));
        var file = folder.createFile(fileBlob);
        fileUrl = file.getUrl();
      } catch (fErr) {
        fileUrl = "Error upload: " + fErr.toString();
      }
    }

    // Tambah data baru
    sheet.appendRow([
      new Date(),
      data.businessName || "-",
      data.category || "-",
      data.description || "-",
      data.establishedDate || "-",
      data.address || "-",
      data.city || "-",
      data.phone || "-",
      data.instagram || "-",
      data.facebook || "-",
      data.linkedin || "-",
      data.website || "-",
      data.operatingHours || "-",
      data.serviceArea || "-",
      fileUrl
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ "success": true, "message": "Data saved successfully" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ "success": false, "error": err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doOptions(e) {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT);
}
