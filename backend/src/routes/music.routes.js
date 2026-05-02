const express = require("express")
const musicController = require("../controllers/music.controller")
const authMiddleware = require("../middlewares/auth.middlewares")
const router = express.Router();
const multer = require("multer")

const upload = multer({
    storage: multer.memoryStorage()
})

// ✅ Upload → only artist
router.post("/upload", authMiddleware.authArtist, upload.single("music"), musicController.createMusic)

// ✅ Album create → only artist
router.post("/album", authMiddleware.authArtist, musicController.createAlbum)

// ✅ View music → PUBLIC
router.get("/", musicController.getAllMusic)

// ✅ Album view → PUBLIC
router.get("/album", musicController.getAllAlbum)
router.get("/album/:albumId", musicController.getAlbumbyId)
router.delete("/:id", authMiddleware.authArtist, musicController.deleteMusic);

module.exports = router