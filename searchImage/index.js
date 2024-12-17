const tf = require("@tensorflow/tfjs-node");
const fs = require("fs");
const path = require("path");

// Đọc hình ảnh và chuyển đổi thành tensor
async function readAndPreprocessImage(imagePath) {
  const imageBuffer = fs.readFileSync(imagePath);
  const tfimage = tf.node.decodeImage(imageBuffer);
  const tfresized = tf.image.resizeBilinear(tfimage, [224, 224]);
  const tfexpanded = tfresized.expandDims(0);
  return tfexpanded.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
}

// Tải mô hình đã được đào tạo
async function loadModel() {
  const model = await tf.loadGraphModel("file://path/to/model/model.json");
  return model;
}

// Tìm kiếm hình ảnh giống nhất
async function searchForSimilarImage(queryImagePath, databasePath) {
  const queryImage = await readAndPreprocessImage(queryImagePath);
  const model = await loadModel();

  const databaseFiles = fs.readdirSync(databasePath);
  let mostSimilarImage;
  let highestScore = -Infinity;

  for (const file of databaseFiles) {
    const imagePath = path.join(databasePath, file);
    const image = await readAndPreprocessImage(imagePath);

    // Dự đoán nhãn của hình ảnh
    const queryFeatures = model.predict(queryImage);
    const imageFeatures = model.predict(image);
    const score = queryFeatures.dot(imageFeatures.transpose()).dataSync();

    // Lưu trữ hình ảnh giống nhất
    if (score > highestScore) {
      highestScore = score;
      mostSimilarImage = file;
    }
  }

  return mostSimilarImage;
}

module.exports.searchForSimilarImage = searchForSimilarImage;
