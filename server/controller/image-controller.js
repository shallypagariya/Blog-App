// import grid from 'gridfs-stream';

// import mongoose from 'mongoose';

// const url='http://localhost:8080'
// let gfs,gridfsBucket;
// const conn=mongoose.connection;
// conn.once('open',()=>{
//     gridfsBucket=new mongoose.mongo.GridFSBucket(conn.db,{
//         bucketName :'fs'
//     });
//     gfs=grid(conn.db,mongoose.mongo);
//     gfs.collection('fs');
// })

// export const uploadImage=(request,response)=>{
//     if(!request.file){
//         return response.status(404).json({msg :"File Not found "});
//     }
//     const imageUrl=`${url}/file/${request.file.filename}`;
//     return response.status(200).json(imageUrl);
// }

// export const getImage=async(response,request)=>{

//     try{
//         const file=await gfs.files.findOne({filename :request.params.filename});
//         const readStream=gridfsBucket.openDownloadStream(file._id);
//         readStream.pipe(response);
//     }catch(error){
//         return response.status(500).json({msg :error.message});
//     }



// }

import grid from 'gridfs-stream';
import mongoose from 'mongoose';

const url = 'http://localhost:8080';
let gfs, gridfsBucket;

// Assuming mongoose is properly configured and connected
const conn = mongoose.connection;

conn.once('open', () => {
  // Initialize GridFSBucket and gridfs-stream
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'fs'
  });
  gfs = grid(conn.db, mongoose.mongo);
  gfs.collection('fs'); // Specify the collection name (optional)
});

export const uploadImage = (req, res) => {
  if (!req.file) {
    console.log("hii")
    return res.status(404).json({ msg: 'File not found' });
  }
  const imageUrl = `${url}/file/${req.file.filename}`;
  return res.status(200).json(imageUrl);
};

export const getImage = async (req, res) => {
    console.log("getImage request!!")
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });
    if (!file) {
      return res.status(404).json({ msg: 'File not found' });
    }
    const readStream = gridfsBucket.openDownloadStream(file._id);
    readStream.pipe(res);
  } catch (error) {

    return res.status(500).json({ msg: error.message });
  }
};
