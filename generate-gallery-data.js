const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const GALLERY_FOLDER = path.join(__dirname, "content/gallery");
const OUTPUT_FILE = path.join(__dirname, "gallery-data.json");

// 读取全部md文件
const files = fs.readdirSync(GALLERY_FOLDER)
  .filter(file => file.endsWith(".md"));

const allPhotos = [];
for (const filename of files) {
  const fullPath = path.join(GALLERY_FOLDER, filename);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(raw);
  allPhotos.push({
    album: data.album_category,    // 相册分类：刘咪 / Daily Life / 这是人
    desc: data.desc ?? "",
    image: data.image,
    filename: filename
  });
}

// 按照上传顺序倒序（最新的排前面）
allPhotos.reverse();

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allPhotos,null,2),"utf8");
console.log("✅ gallery-data.json 生成完成！");