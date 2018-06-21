const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Story = require('../models/story_info');
const base64Img = require('base64-img');


//add story
router.post('/dashboard', (req, res, next) => {
	let imagePath = 'assets/img/' + req.body.storyName + '.jpg'
	let newStory = new Story({
		storyName: req.body.storyName,
		author: req.body.author,
		image: imagePath,
		numberOfChapters: req.body.numberOfChapters,
		kindStory: req.body.kindStory,
		introduction: req.body.introduction

	});
	//save image
	var filepath = base64Img.imgSync(req.body.image, 'src/assets/img', req.body.storyName);


	//save story
	Story.getStoryByStoryName(req.body.storyName, (err, story)=>{
		if(err) throw err;
		if(story){
            res.json({success: false, msg:'Truyện đã tồn tại'});
            console.log(story);
		} else {
			Story.addStory(newStory, (err, story) => {
		        if(err){
			        res.json({success: false, msg:'Thêm truyện không thành công'});
		        } else{
			        res.json({success: true, msg:'Thêm truyện thành công'});
		        }
	        });
		}
	});
    
});

//add chapter
router.post('/addChapter', (req, res, next) => {

	var chapter = {
		number: req.body.number,
		name: req.body.name,
		content: req.body.content,
		storyName: req.body.storyName
	};
	
	Story.addChapter(chapter, (err, chapter)=>{
    	if(err){
    		res.json({success: false, msg:'Thêm chương không thành công'});
    	} else {
    		res.json({success: true, msg: 'Thêm chương thành công'});
    	}
    });
});

//remove Story
router.post('/removeStory', (req, res, next) =>{
	var story = { 
		storyName: req.body.storyName
	};
	Story.removeStory(req.body.storyName, (err, story) => {
		if(err) throw err;
		if(!story){
			res.json({success: false, msg:'Truyện không tồn tại'});
		} else {
			res.json({success: true, msg:'Xóa truyện thành công'});
		}
	})

});

//remove chapter
router.post('/removeChapter', (req, res, next) =>{
	var chapter = {
		storyName: req.body.storyName,
		number: req.body.number
	};
	console.log(chapter);
	Story.removeChapter(chapter, (err, story) => {
		if(err){
			res.json({success: false, msg:'Xóa chương không thành công'});
		} else {
			res.json({success: true, msg:'Xóa chương thành công'});
		}
	})
})
router.get('/liststory', (req, res, next) => {
		

	Story.getListStory((err, list)=>{
		if(err) throw err;
		if(list){
            res.json({success: true, data: list});
		} else {
            res.json({success: false, msg:'Load dữ liệu lỗi'});

		}
	});
    
});
router.post('/listchapter', (req, res, next) => {
	var story = {
		storyName: req.body.storyName
	};

	Story.getListChapter(story, (err, list)=>{
		if(err) throw err;
		if(list){
            res.json({success: true, data: list});
		} else {
            res.json({success: false, msg:'Load dữ liệu lỗi'});

		}
	});
    
});

router.post('/story', (req, res, next) =>{
	var story = {
		storyName: req.body.storyName
	};

	Story.getStoryByStoryName(req.body.storyName, (err, story) =>{
        if(err) throw err;
		if(story){
            res.json({success: true, data: story});
		} else {
            res.json({success: false, msg:'Load dữ liệu lỗi'});

		}
	});

});
router.get('/storybyid', (req, res, next) =>{
	var storyid = {
		_id: req.query._id
	};
	

	Story.getStoryById(storyid, (err, story) =>{
        if(err) throw err;
		if(story){
            res.json({success: true, data: story});
		} else {
            res.json({success: false, msg:'Load dữ liệu lỗi'});

		}
	});

});

router.get('/chapterbynumber', (req, res, next) =>{
	var chapter = {
		number: req.query.number,
		id: req.query.id
	}
	Story.getChapterByNumber(chapter, (err, chapter) =>{
        if(err) throw err;
		if(chapter){
            res.json({success: true, data: chapter});
		} else {
            res.json({success: false, msg:'Load dữ liệu lỗi'});

		}
	});
})
module.exports = router;