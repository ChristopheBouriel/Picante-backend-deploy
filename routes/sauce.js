const express = require('express');
const router = express.Router();
const reqCheck = require('../middleware/rateLimit-config');
const cloudinary = require("../middleware/cloudinary");
const upload = require("../middleware/multer-config");
const Sauce = require('../models/sauce');
const xssFilters = require('xss-filters');
const auth = require('../middleware/auth');
const checkId = require('../middleware/verifyId');
const checkInput = require('../middleware/inputValidator')
const sauceCtrl = require('../controllers/sauce');

router.get('/',reqCheck.sauceViewLimiter, auth, sauceCtrl.getAllSauces);
router.post('/',reqCheck.sauceActionLimiter, auth, upload.single("image"), checkInput,  async (req, res) => {
    try {
        const sauceObject = JSON.parse(req.body.sauce);
        const result = await cloudinary.uploader.upload(req.file.path, {folder:"Sauces", width: 400, height: 612, crop: "lpad"});
        
        const sauce = new Sauce({
            userId: xssFilters.inHTMLData(sauceObject.userId),
            name: xssFilters.inHTMLData(sauceObject.name),
            manufacturer: xssFilters.inHTMLData(sauceObject.manufacturer),
            description: xssFilters.inHTMLData(sauceObject.description),
            mainPepper: xssFilters.inHTMLData(sauceObject.mainPepper),
            heat: xssFilters.inHTMLData(sauceObject.heat),
            likes: 0,
            dislikes: 0,
            usersLiked: [],
            usersDisliked: [],
            imageUrl: result.secure_url,
            idCloudinary: result.public_id
        });
      await sauce.save()
        .then(() => res.status(201).json({ message: 'Sauce recorded !'}))
        .catch((error) => {
            cloudinary.uploader.destroy(result.public_id);
          res.status(400).json({ error });          
        });
    } catch (error) {console.log(error);}
});

router.post('/:id/like',reqCheck.sauceLikeLimiter, auth, sauceCtrl.likeSauce); 
router.get('/:id',reqCheck.sauceViewLimiter, auth, sauceCtrl.getOneSauce);  
router.put('/:id',reqCheck.sauceActionLimiter, auth, checkId, upload.single("image"), checkInput, async (req, res) => {    
    try {
        let idCloud;
        let sauceValid;
    if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {folder:"Sauces", width: 400, height: 612, crop: "lpad"});
        await Sauce.findOne({_id: req.params.id})
        .then(sauce => {
        idCloud = sauce.idCloudinary;
        })
        .catch((error)=>{
            console.log(error);
        });
        sauceObject = { ...JSON.parse(req.body.sauce) };
        sauceValid = {
            userId: xssFilters.inHTMLData(sauceObject.userId),
            name: xssFilters.inHTMLData(sauceObject.name),
            manufacturer: xssFilters.inHTMLData(sauceObject.manufacturer),
            description: xssFilters.inHTMLData(sauceObject.description),
            mainPepper: xssFilters.inHTMLData(sauceObject.mainPepper),
            heat: xssFilters.inHTMLData(sauceObject.heat),
            imageUrl: result.secure_url,
            idCloudinary: result.public_id
            };
        await Sauce.updateOne({ _id: req.params.id }, { ...sauceValid })
        .then(() => {
            cloudinary.uploader.destroy(idCloud);
            res.status(200).json({ message: 'Image and/or sauce modified !'});
        })      
        .catch(error => res.status(400).json({ error })); 
    }
    else {
    let filename;
    await Sauce.findOne({_id: req.params.id})
      .then(sauce => { filename = sauce.imageUrl });
        sauceObject = {...req.body};
        sauceValid = {
            userId: xssFilters.inHTMLData(sauceObject.userId),
            name: xssFilters.inHTMLData(sauceObject.name),
            manufacturer: xssFilters.inHTMLData(sauceObject.manufacturer),
            description: xssFilters.inHTMLData(sauceObject.description),
            mainPepper: xssFilters.inHTMLData(sauceObject.mainPepper),
            heat: xssFilters.inHTMLData(sauceObject.heat),
            };    
        await Sauce.updateOne({ _id: req.params.id }, { ...sauceValid })
        .then(()=> Sauce.update({ _id: req.params.id }, { set:{imageUrl:`${filename}`} }))
        .then(() => {res.status(200).json({ message: 'Sauce modified !'})})
        .catch(error => res.status(400).json({ error }));           
  };
    } catch (error) {console.log(error);}
});

router.delete('/:id',reqCheck.sauceActionLimiter, auth, checkId, async (req, res) => {
    try {
        let idCloud;
        await Sauce.findOne({_id: req.params.id})
        .then(sauce => {
            idCloud = sauce.idCloudinary;
            })
        .catch(error => res.status(400).json({error}));
        await Sauce.deleteOne({ _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Sauce deleted !'}))
                .catch(error => res.status(400).json({ error }))

        await cloudinary.uploader.destroy(idCloud);
    } catch (error) { console.log(error);}
});
module.exports = router;