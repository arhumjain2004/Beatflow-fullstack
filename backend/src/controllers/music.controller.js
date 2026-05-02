const musicModel = require("../models/music.model")
const albumModel = require("../models/album.model")
const jwt = require("jsonwebtoken")
const {uploadFile} = require("../services/storage.services")


async function createMusic(req,res){

    const {title } = req.body;
    const file = req.file;

    const result = await uploadFile(file.buffer.toString('base64'))

    const music = await musicModel.create({
        uri : result.url,
        title,
        artist : req.user.id
    })

    res.status(201).json({
        message : "music created successfully",
        music:{
            id : music._id,
            uri: music.uri,
            title: music.title,
            artist : music.artist,
        }
    })
}

async function createAlbum(req,res){

      const {title,musics} =req.body;

      const album = await albumModel.create({
        title,
        artist : req.user.id,
        musics : musics
      })

       res.status(201).json({
        message : "album created successfully",
        album:{
            id : album._id,
            title: album.title,
            artist : album.artist,
            musics : album.musics
        }
    })

      
}

async function getAllMusic(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5; // 👈 kitne songs per page

    const skip = (page - 1) * limit;

    const musics = await musicModel
      .find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("artist", "username _id")

    const total = await musicModel.countDocuments();

    res.status(200).json({
      message: "Music fetched successfully",
      musics,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching music" });
  }
}

async function getAllAlbum(req,res){
    const albums = await albumModel.find().select("title artist").populate("artist","username email")
    res.status(200).json({
        messsage : " album fetched successfully",
        albums : albums
    })
}

async function getAlbumbyId(req,res){
    const albumId = req.params.albumId;
    
    const album = await albumModel.findById(albumId).populate("artist" ,"username email").populate("musics")
     res.status(200).json({
        messsage : " album fetched successfully",
        album : album
    })
}
const deleteMusic = async (req, res) => {
  try {
    const musicId = req.params.id;

    const music = await musicModel.findById(musicId);

    if (!music) {
      return res.status(404).json({ message: "Music not found" });
    }

    // 🔥 IMPORTANT FIX
    if (music.artist.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await musicModel.findByIdAndDelete(musicId);

    res.json({ message: "Music deleted successfully" });

  } catch (err) {
    console.log(err); // 🔥 check console
    res.status(500).json({ message: "Error deleting music" });
  }
};
module.exports = {createMusic,createAlbum,getAllMusic,getAllAlbum,deleteMusic,getAlbumbyId}