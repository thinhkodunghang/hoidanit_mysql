const path = require("path");
const fs = require('fs');

const generateUniqueFilename = (uploadPath, filename) => {
  let ext = path.extname(filename); // Lấy phần mở rộng của file
  let name = path.basename(filename, ext); // Lấy tên file không gồm phần mở rộng

  let counter = 0;
  let uniqueFilename = filename;
  const regex = /\((\d+)\)$/; // Regex để kiểm tra và bắt số cuối trong dấu ngoặc

  // Kiểm tra file đã tồn tại chưa, nếu tồn tại thì thêm (1), (2), ...
  while (fs.existsSync(path.join(uploadPath, uniqueFilename))) {
    let match = name.match(regex); // match Kiểm tra tên file có chứa số trong ngoặc không và trả ra mảng
    if (match) {
      // Nếu có số trong ngoặc, tăng số đó lên
      counter = parseInt(match[1]) + 1;
// parseInt change chuỗi thành int
      name = name.replace(regex, `(${counter})`);
// replace dùng để thay thế chuỗi mới replace(valueCanChange, newValue)
    } else {
      // Nếu không có số trong ngoặc, thêm (1)
      counter = 1;
      name = `${name}(${counter})`;
    }
    uniqueFilename = `${name}${ext}`;
  }

  return uniqueFilename;
};


const uploadFile = async (files) => {
  const fileUpload = [];
  // Use the mv() method to place the file somewhere on your server
  const uploadDir = path.join(__dirname, "../public/img");
  for (const sampleFile of files) {
    // .toISOString():
    // Phương thức này chuyển đổi đối tượng Date thành chuỗi theo định dạng ISO 8601
    // vd YYYY-MM-DDTHH:MM:SS.sssZ
    // split cắt chỗ T thành 1 array 2 phần
    const timestamp = new Date().toISOString().split("T")[0];
    let filename = `${timestamp}-${sampleFile.name}`;

    // Gọi hàm generateUniqueFilename để tạo tên file không bị trùng
    filename = generateUniqueFilename(uploadDir, filename);

    //   uploadPath = path.join(__dirname, "../public/img", sampleFile.name);
    uploadPath = path.join(uploadDir, filename);
    try {
      await sampleFile.mv(uploadPath);
      fileUpload.push({
        status: "success",
        patch: `/img/${filename}`,
        error: null,
      });
    } catch (error) {
      return {
        status: "fail",
        patch: null,
        error: JSON.stringify(error),
      };
    }
  }

  return fileUpload;
};

const uploadMultipleFile = async () => {};

module.exports = { uploadFile };
